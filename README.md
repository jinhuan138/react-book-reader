<div align="center">
  <img width=250 src="https://raw.githubusercontent.com/jinhuan138/react-book-reader/master/docs/public/logo.png" />
  <h1>ReactReader</h1>
</div>

<p>
  <a href="https://www.npmjs.com/package/react-book-reader" target="_blank">
    <img src="https://img.shields.io/npm/v/react-book-reader?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/react-book-reader" target="_blank" >
    <img src="https://img.shields.io/npm/dw/react-book-reader?style=flat-square" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/npm/l/react-book-reader?style=flat-square" />
  </a>
</p>

<div align="center">
  <h2><a href="https://jinhuan138.github.io/react-book-reader/">📖Documentation</a></h2>


# Introduction

react-book-reader is a react wrapper for [foliate-js](https://github.com/johnfactotum/foliate-js) - library for rendering e-books in the browser.
Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF (experimental; requires PDF.js), or add support for other formats yourself by implementing the book interface

## Basic usage

```bash
npm install react-book-reader --save
```

And in your react-component...

```jsx
import { ReactReader } from 'react-book-reader'

export default () => {
  return (
    <div style={{ height: '100vh' }}>
      {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
      <ReactReader url="/files/啼笑因缘.epub" />
    </div>
  )
}
```

