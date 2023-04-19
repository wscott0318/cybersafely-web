import { Container, Paper } from '@mui/material'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { useLogoUrl } from '../../helpers/hooks'

type Props = {
  source: MDXRemoteSerializeResult
}

export function MarkdownPage({ source }: Props) {
  const logoUrl = useLogoUrl()

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ px: 4, py: 2 }}>
        <Link href="/">
          <Image alt="Logo" src={logoUrl} width={162} height={75} />
        </Link>
        <MDXRemote {...source} />
      </Paper>
    </Container>
  )
}
