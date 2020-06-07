import slugify from 'slugify'
import { createQuoteSlug, createAuthorSlug } from '../../utils/createSlug'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Quote from '../../components/Quote'
import styles from './author.module.css'

const Post = ({ quotes, authorInfo }) => {
  const router = useRouter()
  const { author } = router.query

  let renderQuotes = quotes.map((q, i) => {
    return (
      <div key={i} className={styles.quoteWrapper}>
        <Link href="/[author]/[quote]" as={`/${author}/${q.slug}`}>
          <a>
            <Quote data={q} />
          </a>
        </Link>
      </div>
    )
  })

  return (
    <div>
      <Link href='/'>Back home</Link>
      <div className={styles.wrapper}>
        <h1>{authorInfo}</h1>
        {quotes.length} quotes
        {renderQuotes}
      </div>
    </div>
  )
}

export async function getStaticProps({ ...ctx }) {
  const quotes = (await import("../../../quotes.json")).default
  const { author } = ctx.params
  const authorQuotes = quotes.filter((data) => {
    const currentRoute = createAuthorSlug(data.author)
    return currentRoute === author
  }).map((data) => {
    return {
      ...data,
      slug: createQuoteSlug(data.quote)
    }
  })

  return {
    props: { 
      authorInfo: authorQuotes[0].author,
      quotes: authorQuotes
    }
  }
}

export async function getStaticPaths() {
  const quotes = (await import("../../../quotes.json")).default
  const authors = new Set(quotes.map(quote => quote.author))
  const paths = Array.from(authors).map(author => {
    const authorSlug = createAuthorSlug(author)
    return { 
      params: { 
        author: authorSlug
      } 
    }
  })
  return {
    paths,
    fallback: false
  }
}

export default Post