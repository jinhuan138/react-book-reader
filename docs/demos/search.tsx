import { ReactReader } from 'react-book-reader'
import { useState } from 'react'

let rendition = null
interface SearchItem {
    label: string
    cfi: string
}
export default function App() {
    const [searchText, setSearchText] = useState('只在捻花一笑中')
    const [searchResults, setSearchResults] = useState<SearchItem[]>([])

    const search = async () => {
        if (!searchText) return
        const generator = await rendition.search({
            scope: undefined,
            query: searchText,
            index: undefined,
        })
        const results = []
        for await (const result of generator) {
            if (typeof result === 'string') {
                if (result === 'done') {
                    console.log('search done')
                }
            } else {
                if (result.progress) {
                    console.log('search progress:', result.progress)
                } else {
                    results.push(result)
                }
            }
        }
        const tableResults: SearchItem[] = []
        results.forEach(({ subitems }) => {
            subitems.forEach((item) => {
                const { pre, post } = item.excerpt
                const label = `${pre}<span style='color: orange;'>${searchText}</span>${post}`
                tableResults.push({
                    label,
                    cfi: item.cfi,
                })
            })
        })
        setSearchResults(tableResults)
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                url="/react-book-reader/files/啼笑因缘.mobi"
                getRendition={(val) => (rendition = val)}
            />
            <div className="absolute bottom-4 right-4 left-4 text-center z-[1] text-black bg-white flex items-center justify-center">
                <input
                    placeholder="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                />
                <div className="w-200">
                    {!searchResults.length ? (
                        <div>Empty</div>
                    ) : (
                        searchResults.map((item) => (
                            <div
                                key={item.cfi}
                                className="cursor-pointer rounded overflow-hidden whitespace-nowrap text-ellipsis border-b border-black hover:bg-black/5"
                                onClick={() => rendition.goTo(item.cfi)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: item.label }}></span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
