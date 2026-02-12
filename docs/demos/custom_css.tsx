import { ReactReader } from 'react-book-reader'

export default function App() {
    const getCSS = () => [
        `
        html {
        background: #000;
        color: #fff;
        }`,
    ]
    const getRendition = (rendition) => {
        rendition.addEventListener('load', () => {
            rendition.renderer.setStyles(getCSS())
        })
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url="/react-book-reader/files/啼笑因缘.epub" getRendition={getRendition} />
        </div>
    )
}
