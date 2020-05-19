const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const MARKDOWN_PATH = path.join(__dirname, '..', 'README.md')
const QUOTES_PATH = path.join(__dirname, '..', 'quotes.json')
const QUOTES = JSON.parse(fs.readFileSync(QUOTES_PATH, 'utf8'))

const mdConfig = {
  transforms: {
    /*
      <!-- AUTO-GENERATED-CONTENT:START (GENERATE_QUOTE_LIST)-->
        plugin list will be generated here
      <!-- AUTO-GENERATED-CONTENT:END -->
     */
    GENERATE_QUOTE_LIST: function(content, options) {
      let md = ''
      QUOTES.sort(sortPlugins).forEach((data) => {
        md += `- **[${data.author}]** ${data.quote}\n`
      })
      return md.replace(/^\s+|\s+$/g, '')
    },
    /*
      <!-- AUTO-GENERATED-CONTENT:START (GENERATE_PLUGIN_TABLE)-->
        plugin list will be generated here
      <!-- AUTO-GENERATED-CONTENT:END -->
     */
    GENERATE_QUOTE_TABLE: function(content, options) {
      let md = `Plugin count: **${PLUGINS.length}** 🎉\n\n`
      md += `| Plugin | Author |\n`
      md += '|:---------------------------|:-----------:|\n'
      QUOTES.sort(sortPlugins).forEach((data) => {
        const profileURL = `https://github.com/${data.author}`
        md += `| **[${data.name} - \`${data.package.toLowerCase()}\`](${data.repo})** <br/> `
        md += ` ${data.description} | `
        md += `[${data.author}](${profileURL}) |\n`
      })
      return md.replace(/^\s+|\s+$/g, '')
    }
  }
}

/* Utils functions */
function sortPlugins(a, b) {
  const aName = a.author.toLowerCase()
  const bName = b.author.toLowerCase()
  return aName.localeCompare(bName)
}

markdownMagic(MARKDOWN_PATH, mdConfig, () => {
  console.log('quotes', QUOTES.length)
  console.log('Docs updated!')
})
