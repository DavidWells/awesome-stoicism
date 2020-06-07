import Link from 'next/link'
import getFrontMatter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const getSlugs = (context) => {
  const keys = context.keys()

  const data = keys.map((key, index) => {
    let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

    return slug
  })
  return data
}

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <>
      <div pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <div className='back'>
          <Link href='/'>
            <a>Back to post list</a>
          </Link>
        </div>
        <article>
          <h1>{frontmatter.title}</h1>
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
      </div>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params
  const content = await import(`../../content/posts/${postname}.md`)
  console.log('content', content)
  const config = {
    "title": "Demo Blog",
    "description": "This is a simple blog built with Next, easily deployable to Netlify!"
  }
  
  const data = getFrontMatter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../content/posts', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/raw-md/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}
