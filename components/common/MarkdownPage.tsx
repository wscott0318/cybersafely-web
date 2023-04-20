import { Container, Paper } from '@mui/material'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { useLogoUrl } from '../../helpers/hooks'
import LandingLayout from '../layout/LandingLayout'

type Props = {
  source: MDXRemoteSerializeResult
}

export function MarkdownPage({ source }: Props) {
  const logoUrl = useLogoUrl()

  return (
    <LandingLayout enableMargin>
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Paper sx={{ px: 4, py: 2 }}>
          <Link href="/">
            <Image alt="Logo" src={logoUrl} width={162} height={75} />
          </Link>
          <MDXRemote {...source} />
        </Paper>
      </Container>
    </LandingLayout>
  )
}
