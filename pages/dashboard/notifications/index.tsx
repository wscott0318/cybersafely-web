import ChevronIcon from '@mui/icons-material/ChevronRightOutlined'
import CheckIcon from '@mui/icons-material/DoneOutlined'
import { LoadingButton } from '@mui/lab'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { NextLink } from '../../../components/common/NextLink'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { namedOperations, useNotificationsQuery, useReadAllNotificationsMutation } from '../../../types/graphql'

function Notifications() {
  const { data, refetch } = useNotificationsQuery()

  const [readAllNotifications, { loading }] = useReadAllNotificationsMutation({
    refetchQueries: [namedOperations.Query.notificationsCount, namedOperations.Query.notifications],
  })

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <Typography variant="h5" flexGrow={1}>
          Notifications
        </Typography>
        {data && data.notifications.page.total > 0 && (
          <LoadingButton startIcon={<CheckIcon />} loading={loading} onClick={() => readAllNotifications()}>
            Read All
          </LoadingButton>
        )}
      </Stack>
      {data && data.notifications.page.total > 0 && (
        <Paper>
          <List>
            {data.notifications.nodes.map((notification, index, { length }) => {
              if (notification.url) {
                return (
                  <NextLink key={notification.id} href={notification.url}>
                    <ListItemButton component="a" divider={index < length - 1}>
                      <ListItemText
                        primary={notification.message}
                        secondary={new Date(notification.createdAt).toLocaleString()}
                      />
                      <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                        <ChevronIcon color="disabled" />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </NextLink>
                )
              }

              return (
                <ListItem key={notification.id} divider={index < length - 1}>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.createdAt).toLocaleString()}
                  />
                </ListItem>
              )
            })}
          </List>
        </Paper>
      )}
      {data && data.notifications.page.count > 1 && (
        <Pagination
          sx={{ alignSelf: 'center' }}
          count={data.notifications.page.count}
          page={data.notifications.page.index + 1}
          onChange={(_, page) => refetch({ page: { index: page - 1 } })}
        />
      )}
    </Stack>
  )
}

export default withDashboardLayout(Notifications, {
  maxWidth: 'md',
  title: 'Notifications',
})
