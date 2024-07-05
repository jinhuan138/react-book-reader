# an easy way to embed a reader into your webapp

```bash
npm install react-book-reader --save
```

And in your vue-component...

```react
import { ReactReader } from 'react-book-reader'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
      <ReactReader url="/files/啼笑因缘.azw3" />
    </div>
  )
}

export default App
```

