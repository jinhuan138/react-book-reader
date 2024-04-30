import { useState } from 'react'
import { ReactReader } from './modules/index.ts'
import './App.css'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ReactReader url="/files/啼笑因缘.azw3" />
    </div>
  )
}

export default App
