import React from 'react'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'

export const BlogCard = ({ frontMatter }) => {
  return (
    <div mt={4}>
      <Link href={frontMatter.id} passHref>
        <a>
          <div size={4}>
            {frontMatter.title}{' '}
            {frontMatter.draft && (<span>Draft</span>)}
          </div>
          <div>
            {format(parseISO(frontMatter.publishedAt), 'MMMM "yy')}
          </div>
        </a>
      </Link>
    </div>
  )
}
