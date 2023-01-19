import { QueryResult } from '@apollo/client'
import BackIcon from '@mui/icons-material/ArrowBackOutlined'
import {
  Alert,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DataGrid, GridColumns, GridSortItem, GridSortModel, GridValidRowModel } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

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
  title: string
  actions?: React.ReactNode | React.ReactNode[]
  back?: string
  initialSortModel?: GridSortItem
}

export function DataGridViewer<
  TQuery,
  TData extends { page: { index: number; count: number; total: number }; nodes: Array<GridValidRowModel> }
>(props: DataGridViewerProps<TQuery, TData, InferNodeType<TData>>) {
  const router = useRouter()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [data, setData] = useState<TData>()
  const [index, setIndex] = useState(0)
  const [sortModel, setSortModel] = useState<GridSortModel | undefined>(
    props.initialSortModel && [props.initialSortModel]
  )

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

  const actions = useMemo(() => {
    if (props.actions) {
      return React.Children.map(props.actions, (child) => {
        return (
          <Grid item xs={12} sm="auto">
            {child}
          </Grid>
        )
      })
    }
  }, [props.actions])

  return (
    <Stack>
      <Box>
        <Grid container spacing={1} alignItems="center" wrap={isMobile ? 'wrap' : 'nowrap'}>
          {!!props.back && (
            <Grid item>
              <IconButton edge="start" sx={{ mr: -0.5 }} onClick={() => router.push(props.back!)}>
                <BackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item flexGrow={1} overflow="hidden">
            <Typography variant="h5" noWrap>
              {props.title}{' '}
              {data && (
                <Typography display="inline" color="text.disabled">
                  ({data.page.total ?? 0} in total)
                </Typography>
              )}
            </Typography>
          </Grid>
          {actions}
        </Grid>
      </Box>
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
      {data && data.page.count > 0 && (
        <Pagination
          count={data.page.count}
          page={data.page.index + 1}
          sx={{ alignSelf: 'center' }}
          onChange={(_, page) => {
            setIndex(page - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
    </Stack>
  )
}
