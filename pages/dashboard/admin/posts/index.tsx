import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { PostsForAdminAndCoach } from '../../../../components/shared/PostsForAdminAndCoach'

function Posts() {
  return <PostsForAdminAndCoach />
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
