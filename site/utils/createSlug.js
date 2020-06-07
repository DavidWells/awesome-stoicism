import slugify from 'slugify'

export function createQuoteSlug(quote) {
  const oldString = quote.replace(/^\.+/g, '').split('.')
  return makeSlug(trimAt(oldString[0], 250))
}

function trimAt(str, length) {
  return str.length > length ? str.substring(0, length) : str;
}

export function createAuthorSlug(author) {
  return makeSlug(author)
}

function makeSlug(str) {
  return slugify(str.toLowerCase())
  .replace(/\./g, '')
  .replace(/'/g, '')
  .replace(/,/g, '')
  .replace(/"/g, '')
  .replace(/'/g, '')
  .replace(/!/g, '')
  .replace(/:/g, '')
}