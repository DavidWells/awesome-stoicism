import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function TitleAndMetaTags({
  url = 'https://hellophilosophy.com',
  pathname,
  title = 'Hello Philosophy',
  description = 'Stoic quotes',
}) {
  const router = useRouter()

  const path = pathname || router.pathname
  const domain = `${url}${path}`

  return (
    <Head>
      <title>
        {title} — {description}
      </title>
      <meta name="description" content={description} />
    </Head>
  )
}
