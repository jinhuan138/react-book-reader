import { ReactReader } from 'react-book-reader'
import { useState } from 'react'
import { Overlayer } from 'react-book-reader/lib/overlayer.js'
let rendition = null

interface Item {
    cfi: string
    text: string
}
export default function App() {
    const [selections, setSelections] = useState<Item[]>([])
    const getSelectionRange = (sel: Selection) => {
        if (!sel || !sel.rangeCount) return
        const range = sel?.getRangeAt(0)
        if (range.collapsed) return
        return range
    }
    const getRendition = (val) => {
        rendition = val
        rendition.addEventListener('load', (e) => {
            const { doc, index } = e.detail
            doc.addEventListener('pointerup', () => {
                const sel = doc.getSelection() as Selection
                const range = getSelectionRange(sel)
                if (!range) return
                const cfi = rendition.getCFI(index, range)
                const text = sel.toString()
                const annotation = {
                    value: cfi,
                    type: 'highlight',
                    color: 'red',
                    note: text,
                }
                setSelections((val) => [...val, { text, cfi }])
                rendition.addAnnotation(annotation)
            })
        })
        rendition.addEventListener('draw-annotation', (e) => {
            const { draw, annotation } = e.detail
            const { color, type } = annotation
            if (type === 'highlight') draw(Overlayer.highlight, { color })
            else if (type === 'underline') draw(Overlayer.underline, { color })
            else if (type === 'squiggly') draw(Overlayer.squiggly, { color })
        })
    }
    const show = (cfi: string) => {
        rendition.goTo(cfi)
    }
    const remove = (index: number) => {
        setSelections(
            selections.filter((i, j) => {
                if (index !== j) {
                    return true
                } else {
                    const annotation = {
                        value: i.cfi,
                        note: i.text,
                    }
                    rendition.addAnnotation(annotation, true)
                    return false
                }
            })
        )
    }
    return (
        <>
            <div style={{ height: '100vh' }}>
                <ReactReader
                    url="/react-book-reader/files/alice.epub"
                    getRendition={getRendition}
                />
            </div>
            {
                <div className="z-1 text-black bg-white border border-stone-400">
                    <div className="font-bold mb-1">Selections</div>
                    <ul className="border-stone-400">
                        {selections.map(({ text, cfi }, index) => {
                            return (
                                <li
                                    key={index}
                                    className="flex justify-between py-0.5 mx-5 text-2xl!"
                                >
                                    <div className="w-[60%] truncate cursor-pointer" title={text}>
                                        {text}
                                    </div>
                                    <div>
                                        <button
                                            className="text-neutral-500  text-center bg-orange-500 cursor-pointer mr-1 rounded-sm p-2"
                                            onClick={() => show(cfi)}
                                        >
                                            show
                                        </button>
                                        <button
                                            className="text-neutral-500 text-center bg-orange-500 cursor-pointer rounded-sm p-2"
                                            onClick={() => remove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    )
}
