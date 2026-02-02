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
import 'core-js/proposals/array-grouping-v2'
interface FoliateViewElement extends HTMLElement {
  open: (url: string | File) => Promise<void>
  close: () => void
  goTo: (href: string | number) => void
  next: () => void
  prev: () => void
  renderer: any
  book: {
    toc: any[]
  }
}
interface BookViewProps {
  url: string | File
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
if (typeof Promise.withResolvers === 'undefined') {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
}
export default forwardRef<BookVieRef, BookViewProps>((props, ref) => {
  const { url, location, getRendition, tocChanged, onUpdateLocation, LoadingView, ErrorView } = props
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const viewer = useRef<HTMLDivElement | null>(null)
  const view = useRef<FoliateViewElement | null>(null)
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  const initBook = async () => {
    try {
      if (url) {
        if (view.current) {
          view.current.close()
        } else {
          view.current = document.createElement('foliate-view') as FoliateViewElement
          viewer.current!.append(view.current)
        }
        await view.current.open(url)
        getRendition && getRendition(view.current)
        initReader()
      }
    } catch (error) {
      console.error('Error opening book:', error)
      setIsError(true)
    }
  }

  const initReader = () => {
    setIsLoaded(true)
    const { book } = view.current!
    registerEvents()
    tocChanged && tocChanged(book.toc)
    if (location) {
      view.current!.goTo(location)
    } else {
      view.current!.renderer.next()
    }
  }

  const flipPage = (direction: string) => {
    if (direction === 'next') nextPage()
    else if (direction === 'prev') prevPage()
  }

  const registerEvents = () => {
    view.current!.addEventListener('load', onLoad)
    view.current!.addEventListener('relocate', onRelocate)
  }

  const onLoad = ({ detail: { doc } }) => {
    wheelListener(doc, flipPage)
    swipListener(doc, flipPage)
    keyListener(doc, flipPage)
  }

  const onRelocate = ({ detail }) => {
    onUpdateLocation && onUpdateLocation(detail)
  }

  const nextPage = () => view.current!.next()

  const prevPage = () => view.current!.prev()

  const setLocation = (href: string | number) => view.current!.goTo(href)
  useImperativeHandle(ref, () => ({ prevPage, nextPage, setLocation }))

  useEffect(() => {
    if (viewer.current && !customElements.get('foliate-view')) {
      import('../foliate-js/view.js').then(() => {
        initBook()
      })
    }
  }, [viewer.current])
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      initBook()
    }
  }, [url])

  return (
    <div className="reader">
      <div className="viewHolder">
        <div
          ref={viewer}
          id="viewer"
          style={{ display: isLoaded ? '' : 'none' }}
        ></div>
        {!isLoaded && (isError ? ErrorView : LoadingView)}
      </div>
    </div>
  )
})
