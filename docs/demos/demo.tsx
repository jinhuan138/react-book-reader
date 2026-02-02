import { ReactReader } from 'react-book-reader'

export default function Demo() {
    return (
        <div style={{ height: '100vh' }}>
            {/* Supports EPUB, MOBI, KF8 (AZW3), FB2, CBZ, PDF */}
            <ReactReader url="/react-book-reader/files/啼笑因缘.epub" />
        </div>
    )
}
