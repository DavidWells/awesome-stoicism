import React from 'react'
import slugify  from 'slugify'
import Link from 'next/link'
import { blogPosts } from '../utils/blogPosts'
import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { BlogCard } from '../components/BlogCard'
import styles from './index.module.css'

export default function Home({ links }){

  let renderAuthors = links.map((author, i) => {
    return (
      <div key={i} className={styles.quoteWrapper}>
        <Link href="/[author]" as={`/${author.slug}/`}>
          <a>
            {author.name}
          </a>
        </Link>
      </div>
    )
  })

  return (
    <div className={styles.wrapper}>
      <TitleAndMetaTags />

      <div>
        <div>
          <h1>
            Hello Philosophy
          </h1>

          <h2>
            This site is all about stoic philosophy
          </h2>
        </div>
      </div>

      {renderAuthors}

      <div>
        <div>
          Writing
        </div>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.title}>
              <BlogCard frontMatter={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps({ ...ctx }) {
  const quotes = (await import("../../quotes.json")).default
  const authors = new Set(quotes.map(quote => quote.author))
  const authorLinks = Array.from(authors).sort().map(author => {
    return {
      name: author,
      slug: slugify(author).toLowerCase()
    }
  })
  return {
    props: { 
      links: authorLinks
    }
  }
}
