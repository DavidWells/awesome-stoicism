const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const MARKDOWN_PATH = path.join(__dirname, '..', 'README.md')
const QUOTES_PATH = path.join(__dirname, '..', 'quotes.json')
const QUOTES = JSON.parse(fs.readFileSync(QUOTES_PATH, 'utf8'))

const mdConfig = {
  transforms: {
    /* Usage example in markdown:
      <!-- AUTO-GENERATED-CONTENT:START (GENERATE_QUOTE_LIST)-->
        quote will be generated here
      <!-- AUTO-GENERATED-CONTENT:END -->
     */
    GENERATE_QUOTE_LIST: function(content, options) {
      let md = ''
      QUOTES.sort(sortByAuthors).forEach((data) => {
        md += `- **${data.author}** ${data.quote}\n`
      })
      return md.replace(/^\s+|\s+$/g, '')
    }
  }
}

/* Utils functions */
function sortByAuthors(a, b) {
  const aName = a.author.toLowerCase()
  const bName = b.author.toLowerCase()
  return aName.localeCompare(bName)
}

markdownMagic(MARKDOWN_PATH, mdConfig, () => {
  console.log('quotes', QUOTES.length)
  console.log('Docs updated!')
})
