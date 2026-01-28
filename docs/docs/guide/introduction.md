# Introduction

an vue wrapper for [foliate-js](https://github.com/johnfactotum/foliate-js) - library for rendering e-books in the browser

## Installation

::: code-group
```bash [npm]
npm install react-book-reader --save
```

```bash [pnpm]
pnpm add  react-book-reader --save
```
:::

## Basic Usage

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

