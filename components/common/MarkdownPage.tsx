import { Container, Paper } from '@mui/material'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  source: MDXRemoteSerializeResult
}

export function MarkdownPage({ source }: Props) {
  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Paper sx={{ px: 3 }}>
        <MDXRemote {...source} />
      </Paper>
    </Container>
  )
}
