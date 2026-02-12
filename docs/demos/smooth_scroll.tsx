import { ReactReader } from 'react-book-reader'

export default function App() {
    const getRendition = (rendition) => {
        rendition.renderer.setAttribute('animated', '')
        //rendition.value.renderer.removeAttribute('animated')
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url="/react-book-reader/files/啼笑因缘.epub" getRendition={getRendition} />
        </div>
    )
}
