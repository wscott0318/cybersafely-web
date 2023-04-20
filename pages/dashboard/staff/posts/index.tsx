import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { StudentPostsTable } from '../../../../components/shared/StudentPostsTable'

function Posts() {
  return (
    <StudentPostsTable
      href={(postId) => ({
        pathname: '/dashboard/staff/posts/[postId]',
        query: { postId },
      })}
    />
  )
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
