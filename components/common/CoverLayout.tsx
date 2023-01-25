import { Box, Grid } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useLogoUrl, useMobile } from '../../helpers/hooks'

type CoverLayoutProps = {
  children: React.ReactNode
}

export function CoverLayout(props: CoverLayoutProps) {
  const logoUrl = useLogoUrl()
  const { isMobile, isTablet } = useMobile()

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={7}>
        <Box position="relative" p={4} height="100%">
          <NextImage
            fill
            alt="Hero"
            src="/images/landing/hero.jpg"
            style={{
              zIndex: -1,
              opacity: 0.3,
              objectFit: 'cover',
            }}
          />
          <NextLink href="/">
            <NextImage alt="Logo" src={logoUrl} height={75} width={162} />
          </NextLink>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Box
          flex={1}
          display="flex"
          p={isMobile ? 6 : 12}
          flexDirection="column"
          justifyContent="center"
          minHeight={isTablet ? undefined : '100vh'}
        >
          {props.children}
        </Box>
      </Grid>
    </Grid>
  )
}
