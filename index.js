const { observable, observe } = require('@nx-js/observer-util')

const url = module.exports = observable(createUrl())

const unWritableKeys = ['origin', 'searchParams']

observe(syncUrl)

function createUrl(href = location.href) {
  const url = new URL(href)
  const ret = {}
  for (const key in url) {
    ret[key] = url[key]
  }
  ret.params = createParams(url.searchParams)
  return ret
}

function createParams(searchParams) {
  return Array.from(searchParams.entries()).reduce((params, [key, value]) => ({
    ...params,
    [key]: value
  }), {})
}

function updateParams(params, searchParams) {
  for (const key in params) {
    searchParams.set(key, params[key])
  }
}

function updateUrl(oldUrl, href = oldUrl.href) {
  const newUrl = new URL(href)
  for (const key in newUrl) {
    if (unWritableKeys.includes(key)) continue
    newUrl[key] = oldUrl[key]
  }
  updateParams(oldUrl.params, newUrl.searchParams)
  return createUrl(newUrl.href)
}

function syncUrl(newUrl = updateUrl(url), state = history.state) {
  history.replaceState(state, '', newUrl.href)
}
