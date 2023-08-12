import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab'
import { Box, CircularProgress, Divider, Paper, Stack, Typography } from '@mui/material'
import { LinkProps } from 'next/link'
import { useMobile } from '../../helpers/hooks'
import { MediaTypeEnum, PostQuery, usePostQuery } from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { MediaCarouselModal } from '../common/MediaCarouselModal'
import { NavigationView } from '../common/NavigationView'
import { SeverityImage } from '../common/SeverityImage'
import { PostActions } from './PostsForAdminAndCoach'

const MediaCarouselStyleProps = {
  dialogContent: {
    p: 0,
  },
  dialogTitle: {
    p: 0,
  },
  dialogActions: {
    p: 0,
  },
  closeButton: {
    zIndex: 10,
    backgroundColor: 'white',
  },
}

type DetailedPostViewWrapperProps = {
  postId: string
  backURL: LinkProps['href']
  hideActions?: boolean
}

export function DetailedPostViewWrapper({
  post,
  backURL,
  hideActions,
}: DetailedPostViewWrapperProps & { post: PostQuery['post'] }) {
  const { isTablet } = useMobile()
  const { pushAlert } = useAlert()

  return (
    <NavigationView
      back={backURL}
      title={
        <Stack direction={isTablet ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
          <Stack direction="row" width="100%" justifyContent="center" flexWrap="wrap">
            <Typography>
              @{post.user.platforms.find((platform) => post.platform === platform.__typename?.toUpperCase())?.username}
            </Typography>
            <Typography fontWeight="bold">{post.user.name}</Typography>
            <Typography>{post.user.email}</Typography>
          </Stack>
        </Stack>
      }
    >
      <Paper>
        <Stack direction={isTablet ? 'column' : 'row'} spacing={0}>
          <Stack flex={1}>
            <Box width={isTablet ? '100%' : '500px'} height="100%">
              {post.media?.[0].type === MediaTypeEnum.Image ? (
                <img
                  alt="Media"
                  src={post.media?.[0].url}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: isTablet ? '8px 8px 0 0' : '8px 0 0 8px',
                  }}
                  onClick={() => {
                    pushAlert({
                      title: '',
                      type: 'custom',
                      content: () => <MediaCarouselModal media={post.media} />,
                      maxWidth: 'md',
                      styleProps: MediaCarouselStyleProps,
                    })
                  }}
                />
              ) : (
                <video
                  src={post.media?.[0].url}
                  style={{ width: '100%', height: '100%', borderRadius: isTablet ? '8px 8px 0 0' : '8px 0 0 8px' }}
                  autoPlay={false}
                  controls
                  onClick={() => {
                    pushAlert({
                      title: '',
                      type: 'custom',
                      content: () => <MediaCarouselModal media={post.media} />,
                      maxWidth: 'md',
                      styleProps: MediaCarouselStyleProps,
                    })
                  }}
                />
              )}
            </Box>
          </Stack>
          <Stack flex={1} spacing={0}>
            <Stack direction="row" height="50px" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight="bold">Date</Typography>
              <Typography variant="body2">{new Date(post.createdAt).toLocaleString()}</Typography>
            </Stack>
            <Divider sx={{ m: 0 }} />
            <Stack p={2}>
              <Typography fontWeight="bold">Caption</Typography>
              <Typography variant="body2">{post.text}</Typography>
            </Stack>
          </Stack>
          <Stack
            flex={1}
            spacing={0}
            sx={{
              borderLeft: (theme) => (isTablet ? 'none' : `1px solid ${theme.palette.grey[300]}`),
              borderTop: (theme) => (isTablet ? `1px solid ${theme.palette.grey[300]}` : 'none'),
              backgroundColor: '#F8F9FD',
            }}
          >
            <Stack direction="row" height="50px" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight="bold">Severity</Typography>
              <Stack direction="row" alignItems="center">
                <SeverityImage severity={post.severity} />
                <Typography>{post.severity}</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ m: 0 }} />
            <Stack direction="row" height="50px" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight="bold">Manual Review</Typography>
              <Typography>{post.manualReview ? 'Yes' : 'No'}</Typography>
            </Stack>
            <Divider sx={{ m: 0 }} />
            <Stack direction="row" height="50px" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight="bold">Reasons</Typography>
              <Typography>{post.flag?.reasons.join(', ') || '-'}</Typography>
            </Stack>
            {!hideActions && (
              <>
                <Divider sx={{ m: 0 }} />
                <Stack direction="row" height="50px" alignItems="center" justifyContent="space-between" p={2}>
                  <Typography fontWeight="bold">Actions</Typography>
                  <PostActions url={post.url} postId={post.id} />
                </Stack>
              </>
            )}
            <Divider sx={{ m: 0 }} />
            <Stack minHeight="50px" alignItems="center" justifyContent="space-between" p={2}>
              <Typography fontWeight="bold" textAlign="left" width="100%">
                Logs
              </Typography>
              <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.25 } }}>
                {post.actions.map((action) => (
                  <TimelineItem key={action.id}>
                    <TimelineOppositeContent align="right" variant="body2" sx={{ m: 'auto 0' }} color="text.secondary">
                      {new Date(action.createdAt).toLocaleString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ px: 2 }}>
                      <Typography component="span">{action.name}</Typography>
                      <Typography variant="body2">{action.user?.name ?? 'System'}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </NavigationView>
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
