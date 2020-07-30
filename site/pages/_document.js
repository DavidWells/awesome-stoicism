import React from 'react'
import NextDocument, { Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <html lang="en">
        <Head>
          <script src='https://d26s9dlh9vivqr.cloudfront.net/go.js' type='text/javascript' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
