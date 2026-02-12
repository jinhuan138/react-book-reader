import { ReactReader } from 'react-book-reader'
import { useState } from 'react'

export default function App() {
    const [page, setPage] = useState<string>('')
    const getRendition = (rendition) => {
        rendition.addEventListener('relocate', ({ detail }) => {
            const { tocItem } = detail
            setPage(tocItem?.label || '')
        })
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url="/react-book-reader/files/啼笑因缘.fb2" getRendition={getRendition} />
            <div style={{ textAlign: 'center' }}>{page}</div>
        </div>
    )
}
