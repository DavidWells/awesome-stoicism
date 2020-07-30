import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Quote from '../../components/Quote'
import { createQuoteSlug, createAuthorSlug } from '../../utils/createSlug'
import Wrapper from '../../components/Wrapper'
import Nav from '../../components/Nav'
import styles from './quote.module.css'
import getShareImage from '@jlengstorf/get-share-image'

export default function QuoteView({ data }) {
  const router = useRouter()
  const { author, quote } = router.query

  const urlPath = Object.keys(router.query).reduce((acc, curr) => {
    const value = router.query[curr]
    return acc.replace(`[${curr}]`, value)
  }, router.pathname)
  // console.log('urlPath', urlPath)

  const rightContent = (
    <div className={styles.rightNav}>
      <Link href={`/${author}`}>
        <a>
          View {data.author} Quotes
        </a>
      </Link>
      <Link href='/'>
        <a>
          Philosophers
        </a>
      </Link>
    </div>
  )

  const textLength = data.quote.length
  let textFontSize = 68
  // console.log('textLength', textLength)
  let textWidth = 1120
  if (textLength < 190) {
    textFontSize = 72
  } else if (textLength < 250) {
    textFontSize = Math.round(textLength * .25)
  } else if (textLength < 350) {
    textFontSize = Math.round(textLength * .15)
  } else if (textLength < 450) {
    textFontSize = Math.round(textLength * .1)
    textWidth = 1160
  } else {
    textFontSize = Math.round(textLength * .09)
    textWidth = 1160
  }

  const socialImage = getShareImage({
    title: data.quote,
    tagline: data.author,
    cloudName: 'davidwells',
    imagePublicID: 'card_nooiax',
    titleFont: 'futura',
    taglineFont: 'futura',
    textColor: '232129',
    textLeftOffset: 80,
    textAreaWidth: textWidth,
    titleGravity: 'north_west',
    taglineGravity: 'south_west',
    taglineColor: '00a395',
    titleBottomOffset: 90,
    taglineTopOffset: 30,
    titleFontSize: textFontSize,
    taglineFontSize: (data.author.length > 200) ? 35 : 50
  })
  const title = `${truncate(data.quote)} - ${data.author}`
  let meta
  if (textLength < 450) {
    meta = (
      <>
      <meta name="image" content={socialImage} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={data.quote} />
      <meta property="og:url" content={`https://hellophilosophy.com${urlPath}`} />
      <meta property="og:image" content={socialImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={'Stoic Quotes - Hello Philosophy'} />
      <meta name="twitter:description" content={title} />
      <meta name="twitter:image" content={socialImage} />
      </>
    )
  }
  /*<meta name="twitter:creator" content="@stoic">*/

  return (
    <Wrapper>
      <Head>
        {meta}
        <title>{title}</title>
      </Head>
      <Nav rightContent={rightContent} />
      <div className={styles.wrapper}>
        <div className={styles.quoteWrapper}>
          <Quote data={data} author={author} />
        </div>
      </div>
    </Wrapper>
  )
}

function removePeriod(str) {
  return str.replace(/\.$/, '').replace(/$/, '')
}

function truncate(str, length = 160, ending = '...') {
  const oldString = str.replace(/^\.+/g, '').split('.')
  if (oldString[0].length < length) {
    return removePeriod(oldString[0])
  }
  return removePeriod(oldString[0].substring(0, length - ending.length) + ending)
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
