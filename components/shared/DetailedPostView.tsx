import {
  TabContext,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab'
import { CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material'
import { LinkProps } from 'next/link'
import { useState } from 'react'
import { PostQuery, usePostQuery } from '../../schema'
import { AvatarWithName } from '../common/AvatarWithName'
import { NavigationView } from '../common/NavigationView'
import { PlatformChip } from '../common/PlatformChip'
import { SeverityImage } from '../common/SeverityImage'
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

type DetailedPostViewWrapperProps = {
  postId: string
  backURL: LinkProps['href']
}

export function DetailedPostViewWrapper({ post, backURL }: DetailedPostViewWrapperProps & { post: PostQuery['post'] }) {
  const [tab, setTab] = useState('details')

  return (
    <TabContext value={tab}>
      <NavigationView back={backURL} title={post.user.name + "'s Post"}>
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
            {!!post.platform && <Row title="Platform" message={<PlatformChip platform={post.platform} />} />}
            <Row
              last
              title="User"
              message={<AvatarWithName src={post.user.avatar?.url} name={post.user.name} email={post.user.email} />}
            />
          </Grid>
        </Paper>
        <Paper sx={{ py: 2 }}>
          <Grid container spacing={2}>
            <Row title="Severity" message={<SeverityImage severity={post.severity} />} />
            <Row title="Manual Review" message={post.manualReview ? 'Yes' : 'No'} />
            <Row title="Reasons" message={post.flag?.reasons.join(', ') || '-'} />
            <Row title="Actions" message={<PostActions url={post.url} postId={post.id} />} />
            <Row
              last
              title="Logs"
              message={
                <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.25 } }}>
                  {post.actions.map((action) => (
                    <TimelineItem key={action.id}>
                      <TimelineOppositeContent
                        align="right"
                        variant="body2"
                        sx={{ m: 'auto 0' }}
                        color="text.secondary"
                      >
                        {new Date(action.createdAt).toLocaleString()}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ px: 2 }}>
                        <Typography variant="h6" component="span">
                          {action.name}
                        </Typography>
                        <Typography>{action.user?.name ?? 'System'}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              }
            />
          </Grid>
        </Paper>
      </NavigationView>
    </TabContext>
  )
}

export function DetailedPostView(props: DetailedPostViewWrapperProps) {
  const { data } = usePostQuery({
    variables: { id: props.postId },
  })

  if (!data) {
    return <CircularProgress />
  }

  return <DetailedPostViewWrapper {...props} post={data.post} />
}
