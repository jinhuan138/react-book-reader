import { ReactReader } from 'react-book-reader'
import Lightbox, { Slide } from "yet-another-react-lightbox-lite";
import "yet-another-react-lightbox-lite/styles.css";
import { useState } from 'react'

export default function App() {
    const [index, setIndex] = useState<number>();
    const [slides, setSlides] = useState<Slide[]>([])
    const getRendition = (rendition) => {
        rendition.renderer.setStyles([
            `img, image {
                cursor: pointer;
            }`
        ])
        rendition.addEventListener('load', () => {
            const docs = rendition.renderer.getContents()
            docs.forEach(({ doc }) => {
                const imgs = [
                    ...doc.querySelectorAll('img'),
                    ...doc.querySelectorAll('image'),
                ]
                const newSlides = imgs.map((img, index) => {
                    img.addEventListener('click', () => {
                        setIndex(index)
                    })
                    const src = img.getAttribute('src') || img.getAttribute('xlink:href')
                    return { src}
                })
                setSlides(newSlides)
            })
           
        })
    }
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader url='/react-book-reader/files/梵高手稿.epub' getRendition={getRendition} />
            <Lightbox
                slides={slides}
                index={index}
                setIndex={setIndex}
            />
        </div>
    )
}
