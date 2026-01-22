import { ReactReader } from './packages/index.ts'
import './App.css'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
      <ReactReader url="/files/啼笑因缘.azw3" />
    </div>
  )
}

export default App
