import { ReactReader } from 'react-book-reader'
import { useState } from 'react'

let rendition = null
export default function App() {
    const [current, setCurrent] = useState<number>(0)
    const change = (e) => {
        const value = e.target.value
        setCurrent(value)
        rendition.goToFraction(parseFloat(value / 100))
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                url="/react-book-reader/files/啼笑因缘.epub"
                getRendition={(val) => (rendition = val)}
            />
            <div className="absolute bottom-4 right-4 left-4 z-[1] text-black! flex flex-wrap justify-center">
                <input
                    className="text-center"
                    type="number"
                    value={current}
                    min={0}
                    max={100}
                    step={1}
                    onChange={change}
                />
                %
                <input
                    className="w-full"
                    type="range"
                    value={current}
                    min={0}
                    max={100}
                    step={1}
                    onChange={change}
                />
            </div>
        </div>
    )
}
