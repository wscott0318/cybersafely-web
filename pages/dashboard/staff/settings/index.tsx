import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { NavigationView } from '../../../../components/common/NavigationView'
import { QueryLoader, QueryLoaderRenderProps } from '../../../../components/common/QueryLoader'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { namedOperations, SettingsQuery, useSettingsQuery, useUpdateSettingsMutation } from '../../../../schema'

function Loading() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height={72} />
    </Stack>
  )
}

function Render({ data }: QueryLoaderRenderProps<SettingsQuery>) {
  const [updateSettings, { loading }] = useUpdateSettingsMutation({
    refetchQueries: [namedOperations.Query.settings],
  })

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <FormGroup>
          <FormControlLabel
            disabled={loading}
            label={
              <Stack direction="row" alignItems="center">
                <Typography variant="inherit">Enable Organization Sign Ups</Typography>
                {loading && <CircularProgress size={20} />}
              </Stack>
            }
            control={
              <Switch
                checked={data.settings.enableSignUps ?? false}
                onChange={(_, enableSignUps) => {
                  updateSettings({ variables: { input: { enableSignUps } } })
                }}
              />
            }
          />
        </FormGroup>
      </Stack>
    </Paper>
  )
}

function Settings() {
  const query = useSettingsQuery({
    notifyOnNetworkStatusChange: false,
  })

  return (
    <NavigationView title="Settings">
      <QueryLoader query={query} loading={Loading} render={Render} />
    </NavigationView>
  )
}

export default withDashboardLayout(Settings, {
  title: 'Settings',
  maxWidth: 'sm',
})
