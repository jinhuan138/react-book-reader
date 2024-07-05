import { useState } from 'react'
import { ReactReader } from './modules/index.ts'
import './App.css'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
      <ReactReader url="/files/啼笑因缘.pdf" />
    </div>
  )
}

export default App
