import { ReactReader } from 'react-book-reader'
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs'
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Demo() {
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url="/react-book-reader/files/啼笑因缘.pdf" />
        </div>
    )
}
