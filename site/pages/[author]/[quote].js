import { useRouter } from 'next/router'
import slugify from 'slugify'
import Quote from '../../components/Quote'

const Comment = ({ data }) => {
  const router = useRouter()
  const { author, quote } = router.query
  return (
    <div>
      <Quote data={data} />
    </div>
  )
}

export async function getStaticProps({ ...ctx }) {
  const quotes = (await import("../../../quotes.json")).default
  const { author, quote } = ctx.params
  const authorQuotes = quotes.filter((quote) => {
    const route = slugify(quote.author).toLowerCase()
    return route === author
  })
  return {
    props: { 
      data: authorQuotes[quote]
    }
  }
}
let authorQuotePaths = {}
export async function getStaticPaths() {
  const quotes = (await import("../../../quotes.json")).default
  const authors = quotes.map(quote => quote.author)
  
  console.log('authors.length', authors.length)
  const paths = authors.map(author => {
    const authorSlug = slugify(author).toLowerCase()
    if (!authorQuotePaths[authorSlug]) {
      authorQuotePaths[authorSlug] = 0
    } else {
      authorQuotePaths[authorSlug] = authorQuotePaths[authorSlug] + 1
    }
    return { 
      params: { 
        author: authorSlug,
        quote: authorQuotePaths[authorSlug].toString()
      } 
    }
  })
  console.log('paths', paths)
  return {
    paths,
    fallback: false
  }
}


export default Comment