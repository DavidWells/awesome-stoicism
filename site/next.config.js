const readingTime = require('reading-time');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withVideos = require('next-videos');
const withMdxEnhanced = require('next-mdx-enhanced');

module.exports = withPlugins(
  [
    withMdxEnhanced({
      layoutPath: 'layouts',
      defaultLayout: true,
      fileExtensions: ['mdx'],
      // rehypePlugins: [require('mdx-prism')],
      extendFrontMatter: {
        process: (mdxContent, frontMatter) => {
          return {
            id: makeIdFromPath(frontMatter.__resourcePath),
            wordCount: mdxContent.split(/\s+/g).length,
            readingTime: readingTime(mdxContent),
          };
        },
      },
    }),
    // withOptimizedImages,
    // withVideos,
  ],
  /* Next.js config */
  {
    target: 'serverless',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    poweredByHeader: false,
    webpack: function (config, { isServer }) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
      return config
    },
    env: {
      TWITTER: "https://twitter.com/davidwells",
    }
  }
);

/**
 *
 * @param {string} resourcePath
 *
 * Make an ID from a path
 *
 * Currently, `resourcePath` is formatted like this:
 * 	- "blog/name-of-file.mdx"
 * 	- "blog/name-of-folder/index.mdx"
 *
 * This function will make the following IDs:
 * 	- "name-of-file"
 * 	- "name-of-folder"
 *
 */
function makeIdFromPath(resourcePath) {
  const parts = resourcePath.split('/');
  const articleType = parts[0];
  let lastPart = parts[parts.length - 1];

  if (lastPart.includes('index')) {
    lastPart = parts[parts.length - 2];
  }

  return `${articleType}/${lastPart.replace('.mdx', '')}`;
}
