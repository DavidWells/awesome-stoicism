import React from 'react'
import NextDocument, { Head, Main, NextScript } from 'next/document'
import { renderSnippet, gtagUrl } from '../utils/analytics'

export default class Document extends NextDocument {
  render() {
    return (
      <html lang="en">
        <Head>
          <script async src={gtagUrl} />
          <script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
