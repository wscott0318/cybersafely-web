import { GetServerSideProps } from 'next'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { DetailedPostView } from '../../../../../components/shared/DetailedPostView'

type Props = {
  postId: string
}

function Post({ postId }: Props) {
  return <DetailedPostView postId={postId} backURL="/dashboard/admin/posts" />
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const postId = ctx.params!.postId as string
  return { props: { postId } }
}

export default withDashboardLayout(Post, {
  title: 'Post',
  maxWidth: 'lg',
})
