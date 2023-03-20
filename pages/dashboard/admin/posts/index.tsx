import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { PostsForAdminAndCoach } from '../../../../components/shared/PostsForAdminAndCoach'

function Posts() {
  return <PostsForAdminAndCoach baseURL="/dashboard/admin" />
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
