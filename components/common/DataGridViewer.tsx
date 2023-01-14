import { QueryResult } from '@apollo/client'
import BackIcon from '@mui/icons-material/ArrowBackOutlined'
import { Alert, Box, IconButton, LinearProgress, Pagination, Stack, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridSortModel, GridValidRowModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

function composeObjectFromKeyValue(key: string, value: any) {
  let obj = value

  const keys = key.split('.').reverse()
  for (const key of keys) {
    obj = { [key]: obj }
  }

  return obj
}

function sortModelToOrder([model]: GridSortModel) {
  if (model && model.sort) {
    return composeObjectFromKeyValue(model.field, model.sort.toUpperCase())
  }
}

type DataGridErrorOverlayProps = {
  error: any
}

function DataGridErrorOverlay(props: DataGridErrorOverlayProps) {
  const message = useMemo(() => {
    if (props.error instanceof Error) {
      return props.error.message
    }
    return String(props.error)
  }, [props.error])

  return (
    <Alert severity="error" sx={{ border: 'none' }}>
      {message}
    </Alert>
  )
}

export type InferNodeType<TData> = TData extends { nodes: Array<infer TNode> } ? TNode : unknown

type DataGridViewerProps<TQuery, TData, TNode extends GridValidRowModel> = {
  query: QueryResult<TQuery, any>
  data: TData | undefined
  columns: GridColumns<TNode>
  href?: (node: TNode) => string
  title: string | ((query: TQuery) => string)
  actions?: React.ReactNode
  back?: string
}

export function DataGridViewer<
  TQuery,
  TData extends { page: { index: number; count: number; total: number }; nodes: Array<GridValidRowModel> }
>(props: DataGridViewerProps<TQuery, TData, InferNodeType<TData>>) {
  const router = useRouter()

  const [data, setData] = useState<TData>()
  const [index, setIndex] = useState(0)
  const [sortModel, setSortModel] = useState<GridSortModel>()

  useEffect(() => {
    if (props.data) {
      setData(props.data)
    }
  }, [props.data])

  useEffect(() => {
    const variables: any = {
      page: { index },
    }

    if (sortModel) {
      variables.order = sortModelToOrder(sortModel)
    }

    props.query.refetch(variables)
  }, [index, sortModel])

  const title = useMemo(() => {
    if (typeof props.title === 'string') {
      return props.title
    } else if (typeof props.title === 'function' && props.query.data) {
      return props.title(props.query.data)
    }
  }, [props.title, props.query.data])

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        {!!props.back && (
          <IconButton edge="start" sx={{ mr: -1 }} onClick={() => router.push(props.back!)}>
            <BackIcon />
          </IconButton>
        )}
        <Box flexGrow={1}>
          {!!title && (
            <Typography variant="h5">
              {title}{' '}
              {data && (
                <Typography display="inline" color="text.disabled">
                  ({data.page.total ?? 0} in total)
                </Typography>
              )}
            </Typography>
          )}
        </Box>
        {props.actions}
      </Stack>
      <DataGrid
        autoHeight
        hideFooter
        disableColumnMenu
        filterMode="server"
        sortingMode="server"
        sortModel={sortModel}
        getRowId={(e) => e.id}
        rows={data?.nodes ?? []}
        error={props.query.error}
        loading={props.query.loading}
        columns={props.columns as GridColumns}
        onSortModelChange={(model) => {
          setIndex(0)
          setSortModel(model)
        }}
        onRowClick={
          props.href &&
          ((e) => {
            router.push(props.href!(e.row))
          })
        }
        components={{
          LoadingOverlay: LinearProgress,
          ErrorOverlay: DataGridErrorOverlay,
        }}
        sx={
          props.href && {
            '.MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }
        }
      />
      <Pagination
        sx={{ alignSelf: 'center' }}
        count={data?.page.count ?? 0}
        page={(data?.page.index ?? 0) + 1}
        onChange={(_, page) => setIndex(page - 1)}
      />
    </Stack>
  )
}
