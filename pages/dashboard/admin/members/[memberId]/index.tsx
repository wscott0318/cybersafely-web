import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { NavigationActions, NavigationView } from '../../../../../components/common/NavigationView'
import { withDashboardLayout } from '../../../../../components/dashboard/Layout'
import { StudentDetails } from '../../../../../components/shared/StudentDetails'
import { StudentParentsTable } from '../../../../../components/shared/StudentParentsTable'
import { StudentPostsTable } from '../../../../../components/shared/StudentPostsTable'
import { useUserQuery } from '../../../../../schema'

type Props = {
  memberId: string
}

function Member({ memberId }: Props) {
  const [tab, setTab] = useState('parents')

  const { data } = useUserQuery({
    variables: { id: memberId },
  })

  return (
    <TabContext value={tab}>
      <NavigationView
        back="/dashboard/admin/members"
        title={data?.user.name ?? 'Member'}
        actions={
          <NavigationActions>
            <TabList onChange={(_, tab) => setTab(tab)}>
              <Tab label="Parents" value="parents" />
              <Tab label="Posts" value="posts" />
              <Tab label="Details" value="details" />
            </TabList>
          </NavigationActions>
        }
      >
        <TabPanel value="parents">
          <StudentParentsTable userId={memberId} />
        </TabPanel>
        <TabPanel value="posts">
          <StudentPostsTable
            userId={memberId}
            href={(postId) => ({
              pathname: '/dashboard/admin/posts/[postId]',
              query: { postId },
            })}
          />
        </TabPanel>
        <TabPanel value="details">
          <StudentDetails userId={memberId} />
        </TabPanel>
      </NavigationView>
    </TabContext>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const memberId = ctx.params!.memberId as string
  return { props: { memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Member',
})
