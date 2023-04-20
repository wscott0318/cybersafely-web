import { Box, Toolbar } from '@mui/material'
import Footer from './LandingFooter'
import Header from './LandingHeader'

function LandingLayout({ children, enableMargin }: { children: React.ReactNode; enableMargin?: boolean }) {
  return (
    <Box>
      <Header />
      {!!enableMargin && <Toolbar />}
      <Box component="main" sx={{ minHeight: '100vh' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default LandingLayout
