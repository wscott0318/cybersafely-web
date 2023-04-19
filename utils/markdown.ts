import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import remarkGfm from 'remark-gfm'

export function createMarkdownPageStaticProps(fileName: string) {
  async function getStaticProps() {
    const file = path.join(process.cwd(), './docs/' + fileName)
    const source = fs.readFileSync(file)
    const mdxSource = await serialize(source, { mdxOptions: { remarkPlugins: [remarkGfm] } })
    return { props: { source: mdxSource } }
  }

  return { getStaticProps }
}
