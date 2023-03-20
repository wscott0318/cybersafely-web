import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Chip, CircularProgress, Divider, Grid, Paper, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import { PostQuery, usePostQuery } from '../../schema'
import { NavigationActions, NavigationView } from '../common/NavigationView'

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

type PostForAdminAndCoachProps = {
  postId: string
  backURL: string
}

export function PostForAdminAndCoachWrapper({
  post,
  backURL,
}: PostForAdminAndCoachProps & { post: PostQuery['post'] }) {
  const [tab, setTab] = useState('details')

  return (
    <TabContext value={tab}>
      <NavigationView
        back={backURL}
        title={post.user.name + "'s Post"}
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
              {post.media.map((media) => (
                <Row
                  title="Media"
                  key={media.id}
                  message={
                    media.type === 'IMAGE' ? (
                      <img src={media.url} style={{ width: '100%' }} />
                    ) : (
                      <video src={media.url} style={{ width: '100%' }} autoPlay={false} controls />
                    )
                  }
                />
              ))}

              <Row
                title="URL"
                message={
                  <Button size="small" target="_blank" href={post.url} variant="text" startIcon={<OpenIcon />}>
                    Open Link
                  </Button>
                }
              />
              <Row title="Text" message={post.text} />
              <Row title="Date" message={new Date(post.createdAt).toLocaleString()} />
              <Row
                title="Platform"
                message={
                  <Chip
                    label="Twitter"
                    variant="filled"
                    sx={{ background: '#1d9bf0' }}
                    icon={<img alt="Twitter" src="/images/logos/twitter.svg" height={14} style={{ marginLeft: 6 }} />}
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

export function PostForAdminAndCoach(props: PostForAdminAndCoachProps) {
  const { data } = usePostQuery({
    variables: { id: props.postId },
  })

  if (!data) {
    return <CircularProgress />
  }

  return <PostForAdminAndCoachWrapper {...props} post={data.post} />
}
