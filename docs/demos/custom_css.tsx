import { ReactReader } from 'react-book-reader'
import './custom_css.css'

export default function App() {
    const getRendition = (rendition) => {
        rendition.renderer.setStyles([
            `html {
                background: #000;
                color: #fff;
            }`,
        ])
    }
    return (
        <div style={{ height: '100vh' }} className="custom-css-demo">
            <ReactReader url="/react-book-reader/files/啼笑因缘.epub" getRendition={getRendition} />
        </div>
    )
}
