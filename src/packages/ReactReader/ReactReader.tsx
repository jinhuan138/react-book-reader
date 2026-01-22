import React, { useState, useRef, ReactElement } from 'react'
import BookView from '../BookView/BookView.tsx'
import Toc from './Toc.tsx'
import './style.css'
interface ReactReaderProps {
  url: string | File
  showToc?: boolean
  getRendition?: (rendition: any) => void
  title?: string
  LoadingView?: ReactElement
  ErrorView?: ReactElement
}
export default function ReactReader(props: ReactReaderProps) {
  const {
    showToc = true,
    getRendition,
    LoadingView,
    ErrorView,
    ...attrs
  } = props
  const bookRef = useRef<React.ElementRef<typeof BookView>>(null)
  const [toc, setToc] = useState<any[]>([])
  const [expandedToc, setExpandedToc] = useState<boolean>(false)
  const [bookName, setBookName] = useState<string>('')
  const [currentHref, setCurrentHref] = useState<string>('')
  let rendition = null
  const onGetRendition = (val: any) => {
    getRendition && getRendition(val)
    const { book } = val
    rendition = val
    const title = book.metadata?.title
    setBookName(title || '')
  }

  const onTocChange = (_toc) => {
    setToc(_toc)
  }

  const pre = () => bookRef.current!.nextPage()
  const next = () => bookRef.current!.nextPage()
  const toggleToc = () => {
    setExpandedToc(!expandedToc)
  }

  const setLocation = (href: string, close = true) => {
    bookRef.current!.setLocation(href)
    setCurrentHref(href)
    setExpandedToc(!close)
  }
  return (
    <div className="container">
      <div className={`readerArea ${expandedToc ? 'containerExpanded' : ''}`}>
        {/* 展开目录 */}
        {showToc && (
          <button
            className={`tocButton ${expandedToc ? 'tocButtonExpanded' : ''}`}
            onClick={toggleToc}
          >
            <span className="tocButtonBar" style={{ top: '35%' }} />
            <span className="tocButtonBar" style={{ top: '66%' }} />
          </button>
        )}
        {/* 书名 */}
        <div className="titleArea" title={bookName}>
          {/* {slots.title ? slots.title?.() : title.value || bookName.value} */}
        </div>
        {/* 阅读区 */}
        <BookView
          ref={bookRef}
          onGetRendition={onGetRendition}
          tocChanged={onTocChange}
          LoadingView={
            LoadingView || <div className="loadingView">Loading…</div>
          }
          ErrorView={
            ErrorView || <div className="errorView">Error loading book</div>
          }
          {...attrs}
        ></BookView>
        {/*  翻页 */}
        <button className="arrow pre" onClick={pre}>
          ‹
        </button>
        <button className="arrow next" onClick={next}>
          ›
        </button>
      </div>
      {/* 目录 */}
      {showToc && (
        <div>
          <div className="tocArea">
            <Toc
              toc={toc}
              current={currentHref}
              setLocation={setLocation}
              isSubmenu={false}
            />
          </div>
          {expandedToc && (
            //目录遮罩
            <div className="tocBackground" onClick={toggleToc}></div>
          )}
        </div>
      )}
    </div>
  )
}
