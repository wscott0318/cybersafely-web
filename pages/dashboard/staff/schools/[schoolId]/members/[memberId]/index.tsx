import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { NavigationActions, NavigationView } from '../../../../../../../components/common/NavigationView'
import { withDashboardLayout } from '../../../../../../../components/dashboard/Layout'
import { StudentParentsTable } from '../../../../../../../components/shared/StudentParentsTable'
import { StudentPostsTable } from '../../../../../../../components/shared/StudentPostsTable'
import { useUserQuery } from '../../../../../../../schema'

type Props = {
  schoolId: string
  memberId: string
}

function Member({ memberId, schoolId }: Props) {
  const [tab, setTab] = useState('parents')

  const { data } = useUserQuery({
    variables: { id: memberId },
  })

  return (
    <TabContext value={tab}>
      <NavigationView
        title={data?.user.name ?? 'Member'}
        back={{
          pathname: `/dashboard/staff/schools/[schoolId]`,
          query: { schoolId },
        }}
        actions={
          <NavigationActions>
            <TabList onChange={(_, tab) => setTab(tab)}>
              <Tab label="Parents" value="parents" />
              <Tab label="Posts" value="posts" />
            </TabList>
          </NavigationActions>
        }
      >
        <TabPanel value="parents">
          <StudentParentsTable userId={memberId} />
        </TabPanel>
        <TabPanel value="posts">
          <StudentPostsTable userId={memberId} />
        </TabPanel>
      </NavigationView>
    </TabContext>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const schoolId = ctx.params!.schoolId as string
  const memberId = ctx.params!.memberId as string
  return { props: { schoolId, memberId } }
}

export default withDashboardLayout(Member, {
  title: 'Members',
})
