import { useRouter } from 'next/router'
import Link from 'next/link'
import Quote from '../../components/Quote'
import { createQuoteSlug, createAuthorSlug } from '../../utils/createSlug'
import styles from './quote.module.css'

export default function QuoteView({ data }) {
  const router = useRouter()
  const { author, quote } = router.query
  return (
    <div>
      <Link href={`/${author}`}>Back</Link>
      <div className={styles.wrapper}>
        <div className={styles.quoteWrapper}>
          <Quote data={data} author={author} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ ...ctx }) {
  const quotes = (await import("../../../quotes.json")).default
  const { author, quote } = ctx.params
  const quoteData = quotes.find((data) => {
    const currentRoute = createQuoteSlug(data.quote)
    return currentRoute === quote
  })
  // console.log('quoteData', quoteData)
  return {
    props: { 
      data: quoteData
    }
  }
}

export async function getStaticPaths() {
  const quotes = (await import("../../../quotes.json")).default
  
  const paths = quotes.map((data) => {
    const authorSlug = createAuthorSlug(data.author)
    const quoteSlug = createQuoteSlug(data.quote)
    return { 
      params: { 
        author: authorSlug,
        quote: quoteSlug
      } 
    }
  })
  return {
    paths,
    fallback: false
  }
}