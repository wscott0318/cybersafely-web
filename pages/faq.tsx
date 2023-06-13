import { MarkdownPage } from '../components/common/MarkdownPage'
import { createMarkdownPageStaticProps } from '../utils/markdown'

const { getStaticProps } = createMarkdownPageStaticProps('faq.md')

export { getStaticProps }

export default MarkdownPage
