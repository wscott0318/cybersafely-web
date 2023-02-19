import ImageIcon from '@mui/icons-material/ImageOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Chip, Divider, Grid, Paper, Tab, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { NavigationActions, NavigationView } from '../../../../../components/common/NavigationView'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'

function Row(props: { title: string; message: React.ReactNode; last?: boolean }) {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Typography color="text.disabled" mx={2}>
          {props.title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography mx={2}>{props.message}</Typography>
      </Grid>
      {!props.last && (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      )}
    </>
  )
}

type Props = {
  postId: string
}

function Post({ postId }: Props) {
  const [tab, setTab] = useState('details')

  return (
    <TabContext value={tab}>
      <NavigationView
        title={`Post #${postId}`}
        subtitle="Some Athlete - athlete@wonderkiln.com"
        back="/dashboard/coach/posts"
        actions={
          <NavigationActions>
            <TabList onChange={(_, tab) => setTab(tab)}>
              <Tab label="Details" value="details" />
              <Tab label="Actions" value="actions" />
            </TabList>
          </NavigationActions>
        }
      >
        <TabPanel value="details">
          <Paper sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Row
                title="Media"
                message={
                  <Box paddingTop="56%" bgcolor="divider" position="relative" fontSize="5vw" borderRadius={2}>
                    <Box
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      display="flex"
                      position="absolute"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <ImageIcon fontSize="inherit" color="disabled" />
                    </Box>
                  </Box>
                }
              />
              <Row
                title="Content"
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
              <Row title="Date" message={new Date().toLocaleString()} />
              <Row
                title="Platform"
                message={
                  <Chip
                    label="TikTok"
                    color="default"
                    icon={<img src="/images/logos/tiktok.svg" height={14} style={{ marginLeft: 6 }} />}
                  />
                }
                last
              />
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="actions">
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Button fullWidth>Notify Athlete</Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth>Take Down Post</Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth>Mark as Acceptable</Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </NavigationView>
    </TabContext>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const postId = ctx.params!.postId as string
  return { props: { postId } }
}

export default withDashboardLayout(Post, {
  title: 'Post',
  maxWidth: 'md',
})
