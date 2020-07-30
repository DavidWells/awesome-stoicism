import React from 'react'
import Analytics from 'analytics'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'

const isBrowser = typeof window !== 'undefined'
const isProd = process.env.NODE_ENV === 'production'

const analytics = Analytics({
  app: 'hello-philosophy',
  plugins: [
    {
      name: 'logger',
      page: ({ payload }) => {
        console.log('page', payload)
      }
    }
  ]
})

export const useAnalytics = () => {
  React.useEffect(() => {
    // Fire initial page view
    if (process.env.NODE_ENV === 'production') {
      analytics.page()
    }
    // Fire page views on routing
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV === 'production') {
        // We need to wrap it in a rAF to ensure the correct data is sent to Segment
        // https://github.com/zeit/next.js/issues/6025
        requestAnimationFrame(() => {
          analytics.page()
        })
      }
    }

    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  return analytics
}
