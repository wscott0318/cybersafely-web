import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Checkbox, CircularProgress, Divider, Grid, Paper, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import { PostQuery, usePostQuery } from '../../schema'
import { AvatarWithName } from '../common/AvatarWithName'
import { NavigationActions, NavigationView } from '../common/NavigationView'
import { PlatformChip } from '../common/PlatformChip'
import { PostActions } from './PostsForAdminAndCoach'

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
                      <img alt="Media" src={media.url} style={{ width: '100%' }} />
                    ) : (
                      <video src={media.url} style={{ width: '100%' }} autoPlay={false} controls />
                    )
                  }
                />
              ))}
              <Row title="Text" message={post.text} />
              <Row title="Date" message={new Date(post.createdAt).toLocaleString()} />
              <Row title="Platform" message={<PlatformChip platform={post.platform} />} />
              <Row
                last
                title="User"
                message={<AvatarWithName src={post.user.avatar?.url} name={post.user.name} email={post.user.email} />}
              />
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="actions">
          <Paper sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Row title="Flagged" message={<Checkbox checked={post.flag?.flagged ?? false} />} />
              <Row title="Reasons" message={post.flag?.reasons.join(', ')} />
              <Row title="Actions" message={<PostActions url={post.url} postId={post.id} />} />
              <Row
                last
                title="Logs"
                message={post.actions.map((action) => (
                  <AvatarWithName
                    key={action.id}
                    name={action.name}
                    src={action.user?.avatar?.url}
                    email={
                      (action.user?.name ?? action.user?.email ?? 'System') +
                      ' - ' +
                      new Date(action.createdAt).toLocaleString()
                    }
                  />
                ))}
              />
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
