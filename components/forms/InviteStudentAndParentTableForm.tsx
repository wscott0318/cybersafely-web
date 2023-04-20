import ArrowIcon from '@mui/icons-material/ArrowBackOutlined'
import CheckIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  selectClasses,
  tableCellClasses,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useCallbackRef } from '../../helpers/hooks'
import {
  PreviewImportMutation,
  PreviewImportTypeEnum,
  namedOperations,
  useImportStudentsAndParentsMutation,
  usePreviewImportMutation,
} from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useUpload } from '../../utils/upload'

export const IMPORT_TYPES = {
  'text/csv': 'CSV',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'EXCEL',
} satisfies Record<string, PreviewImportTypeEnum>

export const IMPORT_ACCEPT = Object.keys(IMPORT_TYPES).join(',')

const schema = z.object({
  studentEmail: z.string().min(1),
  parentEmail: z.string().min(1),
})

type InviteStudentAndParentTableFormProps = {
  schoolId: string
  file: File
  onSubmit: () => void
  onClearFile?: () => void
}

export function InviteStudentAndParentTableForm({
  schoolId,
  file,
  onSubmit,
  onClearFile,
}: InviteStudentAndParentTableFormProps) {
  const onSubmitRef = useCallbackRef(onSubmit)

  const { upload } = useUpload()
  const { pushError } = useAlert()

  const [headerMap, setHeaderMap] = useState<Record<string, string>>({})
  const [data, setData] = useState<{
    preview: PreviewImportMutation['previewImport']
    type: PreviewImportTypeEnum
    uploadId: string
  }>()

  const reverseHeaderMap = useMemo(() => {
    const entries = Object.entries(headerMap).map(([key, value]) => [value, key] as const)
    return Object.fromEntries(entries)
  }, [headerMap])

  const [previewImport] = usePreviewImportMutation()

  useEffect(() => {
    async function execute() {
      const uploadId = await upload(file)

      if (uploadId) {
        const type = IMPORT_TYPES[file.type as keyof typeof IMPORT_TYPES]
        const { data } = await previewImport({ variables: { input: { uploadId, type } } })

        setData({
          preview: data!.previewImport,
          uploadId,
          type,
        })

        setHeaderMap({
          studentEmail: data!.previewImport.headers[0],
          parentEmail: data!.previewImport.headers[1],
        })
      }
    }

    execute().catch((error) => {
      pushError(error)
      onSubmitRef.current()
    })
  }, [file])

  const [importStudentsAndParents, { loading }] = useImportStudentsAndParentsMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  if (!data) {
    return (
      <Stack alignItems="center" spacing={1}>
        <CircularProgress size={32} />
        <Typography color="text.secondary">Generating Preview...</Typography>
      </Stack>
    )
  }

  return (
    <Stack>
      <TableContainer>
        <Table
          sx={{
            ['.' + tableCellClasses.root]: {
              paddingInline: 0,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {data.preview.headers.map((header, index) => (
                <TableCell key={'header' + index}>
                  <Select
                    disableUnderline
                    value={reverseHeaderMap[header] ?? '-'}
                    sx={{
                      ['.' + selectClasses.standard]: {
                        padding: 0,
                      },
                    }}
                    onChange={(e) => {
                      if (e.target.value === '-') {
                        setHeaderMap(
                          (headerMap) =>
                            Object.fromEntries(
                              Object.entries(headerMap).filter(([key, value]) => value !== header)
                            ) as Record<string, string>
                        )
                      } else {
                        setHeaderMap((headerMap) => ({ ...headerMap, [e.target.value]: header }))
                      }
                    }}
                  >
                    <MenuItem value="-">Do not use {header} column</MenuItem>
                    <MenuItem value="studentEmail">Use {header} column as Student E-mail</MenuItem>
                    <MenuItem value="parentEmail">Use {header} column as Parent E-mail</MenuItem>
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.preview.rows.map(({ values }, index) => (
              <TableRow key={'row' + index}>
                {values.map((value, cellIndex) => (
                  <TableCell key={'row' + index + 'cell' + cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button startIcon={<ArrowIcon />} variant="text" onClick={onClearFile}>
          Pick Other File
        </Button>
        <LoadingButton
          loading={loading}
          endIcon={<CheckIcon />}
          onClick={async () => {
            try {
              const { studentEmail, parentEmail } = schema.parse(headerMap)
              const header = { studentEmail, parentEmail }

              const { uploadId, type } = data

              await importStudentsAndParents({
                variables: { schoolId, input: { uploadId, type, header } },
              })

              onSubmitRef.current()
            } catch (error) {
              if (error instanceof z.ZodError) {
                pushError('Please select which headers should be mapped to the Student E-mail and Parent E-mail')
              } else {
                pushError(error)
              }
            }
          }}
        >
          Upload &amp; Invite
        </LoadingButton>
      </Stack>
    </Stack>
  )
}
