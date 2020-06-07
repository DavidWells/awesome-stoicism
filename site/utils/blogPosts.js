import { frontMatter } from '../pages/blog/**/*.mdx'

export const blogPosts = frontMatter.sort(
  (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
)
