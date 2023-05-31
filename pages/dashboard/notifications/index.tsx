import CheckIcon from '@mui/icons-material/DoneAllOutlined'
import { LoadingButton } from '@mui/lab'
import { LinkProps } from 'next/link'
import { DataGridActions, DataGridViewer, InferColType } from '../../../components/common/DataGridViewer'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import {
  NotificationsQuery,
  namedOperations,
  useNotificationsQuery,
  useReadNotificationsMutation,
} from '../../../schema'
import { useUser } from '../../../utils/context/auth'

const columns: InferColType<NotificationsQuery['notifications']> = [
  {
    width: 500,
    field: 'body',
    headerName: 'Message',
  },
  {
    width: 200,
    field: 'createdAt',
    headerName: 'Created',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
]

function Notifications() {
  const { user, refetchUser } = useUser()

  const query = useNotificationsQuery()

  const [readNotifications, { loading }] = useReadNotificationsMutation({
    refetchQueries: [namedOperations.Query.notifications],
    onCompleted: () => {
      refetchUser()
    },
  })

  return (
    <DataGridViewer
      query={query}
      columns={columns}
      title="Notifications"
      data={query.data?.notifications}
      href={(e) => (e.url ?? '#') as LinkProps['href']}
      actions={
        user.notificationCount > 0 ? (
          <DataGridActions>
            <LoadingButton fullWidth loading={loading} startIcon={<CheckIcon />} onClick={() => readNotifications()}>
              Read All
            </LoadingButton>
          </DataGridActions>
        ) : undefined
      }
    />
  )
}

export default withDashboardLayout(Notifications, {
  maxWidth: 'md',
  title: 'Notifications',
})
