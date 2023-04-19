import { Box } from '@mui/material'
import Footer from './LandingFooter'
import Header from './LandingHeader'

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  )
}

export default LandingLayout
