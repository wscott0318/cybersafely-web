import PersonIcon from '@mui/icons-material/PersonOutlined'
import { Button, Container } from '@mui/material'
import Link from 'next/link'

type NextLinkProps = {
  children: JSX.Element
  href: string
}

function NextLink(props: NextLinkProps) {
  return (
    <Link href={props.href} passHref legacyBehavior>
      {props.children}
    </Link>
  )
}

export default function Landing() {
  return (
    <Container sx={{ p: 2 }}>
      <NextLink href="/login">
        <Button startIcon={<PersonIcon />} variant="contained">
          Login
        </Button>
      </NextLink>
    </Container>
  )
}
