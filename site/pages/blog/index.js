import React from 'react'
import NextLink from 'next/link'
import { blogPosts } from '../../utils/blogPosts'
import TitleAndMetaTags from '../../components/TitleAndMetaTags'
import { BlogCard } from '../../components/BlogCard'

const Blog = () => {
  return (
    <div>
      <TitleAndMetaTags 
        description="Blog articles" 
      />

      <div>
        <div>
          <NextLink href="/" passHref>
            <a>
              <div>
                Back home
              </div>
            </a>
          </NextLink>
        </div>

        <div>
          Blog
        </div>

        {blogPosts.map((post) => (
          <BlogCard key={post.title} frontMatter={post} />
        ))}
      </div>
    </div>
  )
}

export default Blog
