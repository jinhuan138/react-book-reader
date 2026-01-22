import "./toc.css";

interface TocComponentProps {
  toc: any[]
  current: string
  setLocation: (href: string, close?: boolean) => void
  isSubmenu: boolean
}

export default function Toc(props: TocComponentProps) {
  const { toc = [], current = '', setLocation, isSubmenu = false } = props
  return (
    <>
      {toc.map((item, index) => (
        <div key={index}>
          <button
            className={`tocAreaButton ${item.href === current ? 'active' : ''}`}
            onClick={() => {
              if (item.subitems && item.subitems.length > 0) {
                item.expansion = !item.expansion
                setLocation(item.href, false)
              } else {
                setLocation(item.href)
              }
            }}
          >
            {isSubmenu ? ' '.repeat(4) + item.label : item.label}
            {
              // 展开
              item.subitems && item.subitems.length > 0 && (
                <div
                  className={`expansion ${item.expansion ? 'open' : ''}`}
                ></div>
              )
            }
          </button>
          {
            //多级目录
            item.subitems && item.subitems.length > 0 && (
              <div v-show={item.expansion}>
                <Toc
                  toc={item.subitems}
                  current={current}
                  setLocation={setLocation}
                  isSubmenu={true}
                />
              </div>
            )
          }
        </div>
      ))}
    </>
  )
}
