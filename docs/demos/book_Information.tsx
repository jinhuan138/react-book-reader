import { ReactReader } from 'react-book-reader'
import { useState } from 'react'

export default function App() {
    const [information, setInformation] = useState<any>(null)
    const getRendition = (rendition) => {
        const { book } = rendition
        book.getCover?.().then((blob) => {
            setInformation({
                ...book.metadata,
                cover: URL.createObjectURL(blob)
            })
        })
    }
    return (
        <>
            <ReactReader url="/react-book-reader/files/啼笑因缘.epub" getRendition={getRendition} style={{ display: 'none' }} />
            {
                information && (
                    <div style={{ color: "#000" }}>
                        <img src={information.cover}
                            alt={information.title}
                            style={{ width: '100px' }}
                        />
                        <p>title:{information.title}</p>
                        <p>author:{information?.author?.name}</p>
                        <p>publisher:{information.publisher}</p>
                        <p>language:{information.language}</p>
                        <p>published:{information.published}</p>
                        <p>description:{information.description}</p>
                    </div>
                )
            }
        </>
    )
}
