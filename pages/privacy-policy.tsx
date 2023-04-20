import { MarkdownPage } from '../components/common/MarkdownPage'
import { createMarkdownPageStaticProps } from '../utils/markdown'

const { getStaticProps } = createMarkdownPageStaticProps('privacy-policy.md')

export { getStaticProps }

export default MarkdownPage
