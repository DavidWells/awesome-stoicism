import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import TitleAndMetaTags from '../components/TitleAndMetaTags'
import Nav from '../components/Nav'
import Wrapper from '../components/Wrapper'
import styles from './default.module.css'

export default (frontMatter) => {
  return ({ children }) => {
    const router = useRouter()

    const twitterShare = `https://twitter.com/intent/tweet?div="${frontMatter.title}" by @helloPhilosophy&url=https://ped.ro${router.route}`
    const date = format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')
    return (
      <Wrapper>
        <Nav />
        <TitleAndMetaTags description={frontMatter.title} />

        <div>
          <div>
            <NextLink href="/" passHref>
              <div className={styles.cool}>
                Back home
              </div>
            </NextLink>
          </div>

          <div>
            {frontMatter.title}{' '}
            {frontMatter.draft && (<span>Draft</span>)}
          </div>

          <div>
            {date} — {frontMatter.readingTime.div}
          </div>

          <div>
            {children}
          </div>
        </div>
      </Wrapper>
    )
  }
}
