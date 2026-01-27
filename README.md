# an easy way to embed a reader into your webapp

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
      <ReactReader url="/files/梵高手稿.epub" />
    </div>
  )
}
```

