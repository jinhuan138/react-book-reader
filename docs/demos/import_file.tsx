import { ReactReader } from 'react-book-reader'
import { useState } from 'react'

export default function App() {
    const [url, setUrl] = useState('')
    const onChange = (e) => {
        const file = e.target.files[0]
        setUrl(file)
    }
    return (
        <div style={{ height: url ? '100vh' : '50px' }}>
            {url && <ReactReader url={url} />}
            <input type="file" accept=".epub,.mobi,.azw3,.FB2,.CBZ,.PDF" onChange={onChange} />
        </div>
    )
}
