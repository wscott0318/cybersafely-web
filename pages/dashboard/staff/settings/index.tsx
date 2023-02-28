import { FormControlLabel, FormGroup, Paper, Stack, Switch } from '@mui/material'
import { NavigationView } from '../../../../components/common/NavigationView'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { namedOperations, useSettingsQuery, useUpdateSettingsMutation } from '../../../../schema'

function Settings() {
  const { data, loading } = useSettingsQuery()

  const [updateSettings] = useUpdateSettingsMutation({
    refetchQueries: [namedOperations.Query.settings],
  })

  return (
    <NavigationView title="Settings">
      <Paper sx={{ p: 2 }}>
        <Stack>
          <FormGroup>
            <FormControlLabel
              disabled={loading}
              label="Enable Organization Sign Ups"
              control={
                <Switch
                  checked={data?.settings.enableSignUps ?? false}
                  onChange={(_, enableSignUps) => {
                    updateSettings({ variables: { input: { enableSignUps } } })
                  }}
                />
              }
            />
          </FormGroup>
        </Stack>
      </Paper>
    </NavigationView>
  )
}

export default withDashboardLayout(Settings, {
  title: 'Settings',
  maxWidth: 'sm',
})
