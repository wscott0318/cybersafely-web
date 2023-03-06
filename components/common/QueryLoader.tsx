import { OperationVariables, QueryResult } from '@apollo/client'

export type QueryLoaderRenderProps<TData, TVariables extends OperationVariables = any> = {
  data: TData
  query: QueryResult<TData, TVariables>
}

type QueryLoaderProps<TData, TVariables extends OperationVariables> = {
  query: QueryResult<TData, TVariables>
  loading: () => JSX.Element
  render: (props: QueryLoaderRenderProps<TData, TVariables>) => JSX.Element
}

export function QueryLoader<TData, TVariables extends OperationVariables>({
  query,
  loading: Loading,
  render: Render,
}: QueryLoaderProps<TData, TVariables>) {
  if (query.loading || query.error || !query.data) {
    return <Loading />
  }

  return <Render data={query.data} query={query} />
}
