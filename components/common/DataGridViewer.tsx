import { QueryResult } from '@apollo/client'
import { Alert, LinearProgress, Pagination, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridSortItem, GridSortModel, GridValidRowModel } from '@mui/x-data-grid'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useCallbackRef } from '../../helpers/hooks'
import { NavigationActions, NavigationView } from './NavigationView'

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

export type InferNodeType<TData> = TData extends { nodes: Array<infer TNode> } ? TNode : any
export type InferColType<T extends GridValidRowModel> = GridColDef<InferNodeType<T>>[]

export const DataGridActions = NavigationActions

type DataGridViewerProps<TQuery, TData, TNode extends GridValidRowModel> = {
  query: QueryResult<TQuery, any>
  data: TData | undefined
  columns: GridColDef<TNode>[]
  href?: (node: TNode) => LinkProps['href']
  title: string
  actions?: React.ReactNode
  back?: LinkProps['href']
  initialSortModel?: GridSortItem
}

export function DataGridViewer<
  TQuery,
  TData extends { page: { index: number; count: number; total: number }; nodes: Array<GridValidRowModel> }
>(props: DataGridViewerProps<TQuery, TData, InferNodeType<TData>>) {
  const router = useRouter()

  const [data, setData] = useState<TData>()
  const [index, setIndex] = useState(0)
  const [sortModel, setSortModel] = useState<GridSortModel | undefined>(
    props.initialSortModel && [props.initialSortModel]
  )

  const refetchRef = useCallbackRef(props.query.refetch)

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

    refetchRef.current(variables)
  }, [index, sortModel, refetchRef])

  return (
    <NavigationView
      back={props.back}
      title={props.title}
      actions={props.actions}
      subtitle={data ? `${data.page.total} in total` : undefined}
    >
      <Stack>
        {props.query.error && <DataGridErrorOverlay error={props.query.error} />}
        <DataGrid
          autoHeight
          hideFooter
          disableColumnMenu
          filterMode="server"
          sortingMode="server"
          sortModel={sortModel}
          getRowId={(e) => e.id}
          rows={data?.nodes ?? []}
          loading={props.query.loading}
          columns={props.columns as GridColDef<GridValidRowModel>[]}
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
    </NavigationView>
  )
}
