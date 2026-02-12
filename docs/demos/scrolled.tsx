import { ReactReader } from 'react-book-reader'

export default function App() {
    const getRendition = (rendition) => {
        rendition.renderer.setAttribute('flow', 'scrolled')
        // rendition.renderer.setAttribute('flow', 'paginated')
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url="/react-book-reader/files/啼笑因缘.mobi" getRendition={getRendition} />
        </div>
    )
}
