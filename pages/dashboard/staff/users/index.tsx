import { Checkbox, LinearProgress } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { withDashboardLayout } from '../../../../components/dashboard/layout'
import { UsersQueryVariables, useUsersQuery } from '../../../../types/graphql'

function sortModelToOrder([model]: GridSortModel) {
  if (model && model.sort) {
    return { [model.field]: model.sort.toUpperCase() }
  }
}

function Home() {
  const [sortModel, setSortModel] = useState<GridSortModel>()

  const variables = useMemo(() => {
    const variables: UsersQueryVariables = {}

    if (sortModel) {
      variables.order = sortModelToOrder(sortModel)
    }

    return variables
  }, [sortModel])

  const { data, loading, error } = useUsersQuery({ variables })

  return (
    <DataGrid
      autoHeight
      hideFooter
      error={error}
      loading={loading}
      filterMode="server"
      sortingMode="server"
      rows={data?.users.nodes ?? []}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      components={{
        LoadingOverlay: LinearProgress,
      }}
      columns={[
        {
          width: 200,
          field: 'createdAt',
          headerName: 'Joined',
          valueFormatter(params) {
            return new Date(params.value).toLocaleString()
          },
        },
        {
          width: 250,
          field: 'email',
          headerName: 'E-mail',
        },
        {
          width: 250,
          field: 'name',
          headerName: 'Name',
        },
        {
          width: 150,
          field: 'isConfirmed',
          headerName: 'Confirmed',
          renderCell(params) {
            return <Checkbox checked={params.value} readOnly />
          },
        },
        {
          width: 150,
          field: 'isStaff',
          headerName: 'Staff',
          renderCell(params) {
            return <Checkbox checked={params.value} readOnly />
          },
        },
      ]}
    />
  )
}

export default withDashboardLayout(Home, {
  title: 'Staff Dashboard',
})
