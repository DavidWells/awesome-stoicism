import slugify from 'slugify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Quote from '../../components/Quote'
import styles from './author.module.css'

const Post = ({ quotes }) => {
  const router = useRouter()
  const { author } = router.query

  let renderQuotes = quotes.map((q, i) => {
    return (
      <div key={i} className={styles.quoteWrapper}>
        <Link href="/[author]/[quote]" as={`/${author}/${i}`}>
          <a>
            <Quote data={q} />
          </a>
        </Link>
      </div>
    )
  })

  return (
    <>
      <Link href='/'>Back home</Link>
      <h1>{author}</h1>
      {quotes.length} quotes
      {renderQuotes}
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const quotes = (await import("../../../quotes.json")).default
  const { author } = ctx.params
  const authorQuotes = quotes.filter((quote) => {
    const route = slugify(quote.author).toLowerCase()
    return route === author
  })
  return {
    props: { 
      quotes: authorQuotes
    }
  }
}

export async function getStaticPaths() {
  const quotes = (await import("../../../quotes.json")).default
  const authors = new Set(quotes.map(quote => quote.author))
  const paths = Array.from(authors).map(author => {
    const authorSlug = slugify(author).toLowerCase()
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