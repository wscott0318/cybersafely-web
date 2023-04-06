import { LoadingButton } from '@mui/lab'
import {
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
} from '@mui/material'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import {
  PreviewImportMutation,
  PreviewImportTypeEnum,
  namedOperations,
  useImportAthletesAndParentsMutation,
  usePreviewImportMutation,
} from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useFilePicker, useUpload } from '../../utils/upload'
import { Form } from '../common/form/Form'
import { FormText } from '../common/form/FormText'

const schema = z.object({
  email: z.string().email(),
  parentEmail: z.string().email(),
})

type InviteAthleteFormProps = {
  schoolId: string
  onSubmit: (value: z.infer<typeof schema>) => void
}

const IMPORT_TYPES = {
  'text/csv': 'CSV',
  'application/vnd.ms-excel': 'EXCEL',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'EXCEL',
} satisfies Record<string, PreviewImportTypeEnum>

const IMPORT_ACCEPT = Object.keys(IMPORT_TYPES).join(',')

export function InviteAthleteForm(props: InviteAthleteFormProps) {
  const { pick } = useFilePicker()
  const { upload } = useUpload()
  const { pushAlert } = useAlert()

  const [previewImport] = usePreviewImportMutation()

  const [loading, setLoading] = useState(false)

  return (
    <Stack>
      <Form schema={schema} onSubmit={(data) => props.onSubmit(data)}>
        <FormText name="email" label="E-mail" type="email" required />
        <FormText name="parentEmail" label="Parent E-mail" type="email" required />
      </Form>
      <LoadingButton
        variant="text"
        loading={loading}
        onClick={async () => {
          setLoading(true)

          try {
            const file = await pick(IMPORT_ACCEPT)

            if (file) {
              const uploadId = await upload(file)
              const type = IMPORT_TYPES[file.type as keyof typeof IMPORT_TYPES]

              if (uploadId) {
                const { data } = await previewImport({
                  variables: { input: { uploadId, type } },
                })

                pushAlert({
                  type: 'custom',
                  maxWidth: 'lg',
                  title: 'Import from file',
                  content: PreviewImportTable,
                  props: { data: data!.previewImport, uploadId, type, schoolId: props.schoolId },
                  result: () => {},
                })
              }
            }
          } finally {
            setLoading(false)
          }
        }}
      >
        Import from file
      </LoadingButton>
    </Stack>
  )
}

const headerMapSchema = z.object({
  athleteEmail: z.string().min(1),
  parentEmail: z.string().min(1),
})

function PreviewImportTable({
  schoolId,
  data,
  uploadId,
  type,
  onSubmit,
}: {
  schoolId: string
  data: PreviewImportMutation['previewImport']
  uploadId: string
  type: PreviewImportTypeEnum
  onSubmit: () => void
}) {
  const { pushAlert } = useAlert()

  const [headerMap, setHeaderMap] = useState<Record<string, string>>({})

  const reverseHeaderMap = useMemo(() => {
    const entries = Object.entries(headerMap).map(([key, value]) => [value, key] as const)
    return Object.fromEntries(entries)
  }, [headerMap])

  const [importAthletesAndParents, { loading }] = useImportAthletesAndParentsMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data.headers.map((header, index) => (
                <TableCell key={String(index)}>
                  <Stack>
                    <Typography>{header}</Typography>
                    <Select
                      value={reverseHeaderMap[header] ?? '-'}
                      onChange={(e) => {
                        setHeaderMap((headerMap) => ({ ...headerMap, [e.target.value]: header }))
                      }}
                    >
                      <MenuItem value="-">-</MenuItem>
                      <MenuItem value="athleteEmail">Athlete e-mail</MenuItem>
                      <MenuItem value="parentEmail">Parent e-mail</MenuItem>
                    </Select>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map(({ values }, index) => (
              <TableRow key={String(index)}>
                {values.map((value) => (
                  <TableCell key={String(index)}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LoadingButton
        loading={loading}
        onClick={async () => {
          try {
            const { athleteEmail, parentEmail } = headerMapSchema.parse(headerMap)
            const header = { athleteEmail, parentEmail }

            await importAthletesAndParents({
              variables: { schoolId, input: { uploadId, type, header } },
            })

            onSubmit()
          } catch (error) {
            if (error instanceof z.ZodError) {
              pushAlert({
                type: 'alert',
                title: 'Error',
                message: 'Please select which headers should be mapped to the athlete/parent email',
              })
            } else {
              pushAlert({
                type: 'alert',
                title: 'Error',
                message: String(error),
              })
            }
          }
        }}
      >
        Import from file
      </LoadingButton>
    </Stack>
  )
}
