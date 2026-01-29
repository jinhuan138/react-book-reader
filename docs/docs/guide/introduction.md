# Introduction

a react wrapper for [foliate-js](https://github.com/johnfactotum/foliate-js) - library for rendering e-books in the browser

## Installation

:::code-group
```bash [npm]
npm install react-book-reader
```

```bash [pnpm]
pnpm add  react-book-reader
```
:::

## Basic Usage

And in your react-component...

```jsx
import { ReactReader } from 'react-book-reader'

export default () => (
  <div style={{ height: '100vh' }}>
    {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
    <ReactReader url="/react-book-reader/files/啼笑因缘.epub" />
  </div>
);
```

