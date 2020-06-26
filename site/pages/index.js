import React from 'react'
import slugify  from 'slugify'
import Link from 'next/link'
import { blogPosts } from '../utils/blogPosts'
import { BlogCard } from '../components/BlogCard'
import Wrapper from '../components/Wrapper'
import Nav from '../components/Nav'
import { createAuthorSlug } from '../utils/createSlug'
import TitleAndMetaTags from '../components/TitleAndMetaTags'
import styles from './index.module.css'

export default function Home({ links }){

  let renderAuthors = links.map((author, i) => {
    return (
      <div key={i} className={styles.authorCard}>
        <Link
          href="/[author]"
          as={`/${createAuthorSlug(author.slug)}/`
        }>
          <a>
            {author.name}
          </a>
        </Link>
      </div>
    )
  })

  return (
    <Wrapper>
      <TitleAndMetaTags />

      <div>
        <div>
          <Nav />
          <h1>
            Stop. Think. Learn. <span className={styles.smile}>😃</span>
          </h1>

          <h2>
            HelloPhilosophy is all about Stoic living and making sense of the world around us.
          </h2>

          <p>Explore the philosophers below</p>
        </div>
      </div>

      <div>
        <h1>
          Stoic Philosophers
        </h1>
        <div className={styles.authorsWrapper}>
          {renderAuthors}
        </div>
      </div>


      {/* <div>
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
      </div> */}
    </Wrapper>
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
