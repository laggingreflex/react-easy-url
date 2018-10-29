# react-easy-url

Auto synchronize your state with the URL

Based on [react-easy-params], but instead of `path` array and separate `params`, this uses a [URL]\(-like) object (only thing different is it has a `.params` plain-object instead of [searchParams])

Basically an extracted module version of [react-easy-params#5] (at least at the time of writing)

[URL]: https://developer.mozilla.org/en-US/docs/Web/API/URL
[searchParams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

[react-easy-params]: https://github.com/solkimicreb/react-easy-params
[react-easy-params#5]: https://github.com/solkimicreb/react-easy-params/pull/5

## Install

```
npm i react-easy-url
```

## Usage
Same example code from react-easy-params with following changes:

```
  import React from 'react'
  import { view } from 'react-easy-state'
- import { params, path } from 'react-easy-params'
+ import url from 'react-easy-url'

- const updatePath = ev => path[0] = ev.target.value
+ const updatePath = ev => url.pathname = '/' + ev.target.value

- const updateParam = ev => params.name = ev.target.value
+ const updateParam = ev => url.params = ev.target.value

  export default view(() =>
    <div>
-    <div>Path: <input onChange={updatePath} value={path[0]} /></div>
+    <div>Path: <input onChange={updatePath} value={url.pathname.substr(1)} /></div>
-    <div>Param: <input onChange={updateParam} value={params.name} /></div>
+    <div>Param: <input onChange={updateParam} value={url.params.name} /></div>
    </div>
  )
```
