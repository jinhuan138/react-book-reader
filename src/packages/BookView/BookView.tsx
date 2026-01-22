import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  clickListener,
  swipListener,
  wheelListener,
  keyListener,
} from '../utils/listener/listener'
import './style.css'

const BookView: React.FC<any> = forwardRef((props, ref) => {
  const { url, getRendition, tocChanged, loadingView } = props
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const viewer = useRef<HTMLDivElement | null>(null)
  let view: any

  const initBook = async () => {
    try {
      if (url) {
        if (view) {
          view.close()
        } else {
          view = document.createElement('foliate-view')
          viewer.current?.append(view)
        }
        await view.open(url)
        getRendition && getRendition(view)
        initReader()
      }
    } catch (error) {
      console.error('Error opening book:', error)
      setIsError(true)
    }
  }

  const initReader = () => {
    if (!view) return
    setIsLoaded(true)
    const { book } = view
    registerEvents()
    getRendition && getRendition(view)
    tocChanged && tocChanged(book.toc)
    view.renderer.next()
  }

  const flipPage = (direction: string) => {
    if (direction === 'next') nextPage()
    else if (direction === 'prev') prevPage()
  }

  const registerEvents = () => {
    view.addEventListener('load', onLoad)
    view.addEventListener('relocate', onRelocate)
  }

  const onLoad = ({ detail: { doc } }) => {
    wheelListener(doc, flipPage)
    swipListener(doc, flipPage)
    keyListener(doc, flipPage)
  }

  const onRelocate = ({ detail }) => {}

  const nextPage = () => view?.next()

  const prevPage = () => view?.prev()

  const setLocation = (href: string | number) => view?.goTo(href)

  useImperativeHandle(ref, () => ({ prevPage, nextPage, setLocation }))

  useEffect(() => {
    if (!customElements.get('foliate-view')) {
      import('../foliate-js/view.js').then(initBook)
    }
  }, [])

  useEffect(() => {
    view && initReader()
  }, [view])

  return (
    <div className="reader">
      <div className="viewHolder">
        <div
          ref={viewer}
          id="viewer"
          style={{ display: isLoaded ? '' : 'none' }}
        ></div>
        {isLoaded && (loadingView)}
      </div>
    </div>
  )
})

export default BookView
