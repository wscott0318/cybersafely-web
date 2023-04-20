import { MarkdownPage } from '../components/common/MarkdownPage'
import { createMarkdownPageStaticProps } from '../utils/markdown'

const { getStaticProps } = createMarkdownPageStaticProps('how-it-works.md')

export { getStaticProps }

export default MarkdownPage
