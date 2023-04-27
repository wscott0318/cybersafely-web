import { EmptyFileAnimation } from '../../../../components/common/lottie/EmptyFileAnimation'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'

function Posts() {
  return <EmptyFileAnimation />
}

export default withDashboardLayout(Posts, {
  title: 'Posts',
})
