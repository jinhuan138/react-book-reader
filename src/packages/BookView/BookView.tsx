import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ReactElement,
} from 'react'
import {
  clickListener,
  swipListener,
  wheelListener,
  keyListener,
} from '../utils/listener/listener'
import './style.css'
interface FoliateViewElement extends HTMLElement {
  open: (url: string | File) => Promise<void>
  close: () => void
  goTo: (location: string | number) => void
  next: () => void
  prev: () => void
  renderer: any
  book: {
    toc: any[]
  }
}
interface BookViewProps {
  url: String | File
  location?: string | number
  getRendition?: (rendition: FoliateViewElement) => void
  tocChanged?: (toc: any[]) => void
  onUpdateLocation?: (location: any) => void
  LoadingView: ReactElement
  ErrorView: ReactElement
}
interface BookVieRef {
  prevPage: () => void
  nextPage: () => void
  setLocation: (href: string | number) => void
}
export default forwardRef<BookVieRef, BookViewProps>((props, ref) => {
  const { url, location, getRendition, tocChanged,onUpdateLocation, LoadingView, ErrorView } =
    props
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const viewer = useRef<HTMLDivElement | null>(null)
  let view: null | FoliateViewElement = null

  const initBook = async () => {
    try {
      if (url) {
        if (view) {
          view.close()
        } else {
          view = document.createElement('foliate-view') as FoliateViewElement
          viewer.current!.append(view)
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
    setIsLoaded(true)
    const { book } = view!
    registerEvents()
    tocChanged && tocChanged(book.toc)
    if (location) {
      view!.goTo(location)
    } else {
      view!.renderer.next()
    }
  }

  const flipPage = (direction: string) => {
    if (direction === 'next') nextPage()
    else if (direction === 'prev') prevPage()
  }

  const registerEvents = () => {
    view!.addEventListener('load', onLoad)
    view!.addEventListener('relocate', onRelocate)
  }

  const onLoad = ({ detail: { doc } }) => {
    wheelListener(doc, flipPage)
    swipListener(doc, flipPage)
    keyListener(doc, flipPage)
  }

  const onRelocate = ({ detail }) => {
    onUpdateLocation && onUpdateLocation(detail)
  }

  const nextPage = () => view!.next()

  const prevPage = () => view!.prev()

  const setLocation = (href: string | number) => view!.goTo(href)
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
        {isLoaded && LoadingView}
        {isError && ErrorView}
      </div>
    </div>
  )
})
