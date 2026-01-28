# Introduction

react-book-reader is a react wrapper for [foliate-js](https://github.com/johnfactotum/foliate-js) - library for rendering e-books in the browser.
Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF (experimental; requires PDF.js), or add support for other formats yourself by implementing the book interface

## Basic usage

```bash
npm install react-book-reader --save\
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

