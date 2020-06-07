import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import { useAnalytics } from '../utils/analytics'
import { Footer } from '../components/Footer'
import './global.css'

const OTHERCOMPONENTS = {}

export default function App({ Component, pageProps }) {
  useAnalytics()
  return (
      <MDXProvider
        components={{
          ...OTHERCOMPONENTS,
          p: (props) => <p {...props}>{props.children}</p>,
          a: ({ href = '', ...props }) => {
            if (href.startsWith('/')) {
              return (
                <NextLink href={href} passHref>
                  <a {...props} />
                </NextLink>
              )
            }
            return <a href={href} target="_blank" rel="noopener" {...props} />
          },
        }}
      >
        <Head>
          <title>Hello Philosophy</title>
          <link rel="icon" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Fira+Mono&display=swap" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <div>
          <Component {...pageProps} />
          <Footer />
        </div>
      </MDXProvider>
  )
}
