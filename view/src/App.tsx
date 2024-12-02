import { useEffect, useRef } from 'react'
import { Reorder, useInView } from 'framer-motion'

import { CodeBlock } from '@/components/code-block'
import { useDisableSave } from '@/hooks'
import { actions, store, useStore } from '@/store'
import { cx } from '@/utils'

const Tabs = () => {
  const firstRef = useRef(null)
  const isFirstInView = useInView(firstRef)
  const lastRef = useRef(null)
  const isLastInView = useInView(lastRef)

  console.log('islastInView', isLastInView)

  const fileIndex = useStore.fileIndex()
  const currentSet = useStore.currentSet()

  const { files } = currentSet

  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (event: WheelEvent) => {
      const { deltaX, deltaY } = event
      event.preventDefault()

      const dis = 30
      if (deltaX > 0 || deltaY > 0) {
        el.scrollLeft += dis
      } else {
        el.scrollLeft -= dis
      }
      // el.scrollLeft += (event.deltaY + event.deltaX) / 4
    }
    el.addEventListener('wheel', handler)
    return () => {
      el.removeEventListener('wheel', handler)
    }
  }, [])

  const maskClassName = () => {
    if (!(isFirstInView || isLastInView)) {
      return 'mask-both'
    }
    if (!isFirstInView) {
      return 'mask-left'
    }
    if (!isLastInView) {
      return 'mask-right'
    }
    return ''
  }

  return (
    <div
      ref={containerRef}
      className={cx(
        'no-scrollbar mb-[1px] flex w-full overflow-x-scroll pr-1',
        maskClassName()
      )}
    >
      <div ref={firstRef} />
      <Reorder.Group
        key={currentSet.id}
        className="flex"
        axis="x"
        values={files}
        onReorder={newFiles => {
          const currentFileId = store.currentFile().id
          const newFileIndex = newFiles.findIndex(f => f.id === currentFileId)
          actions.state(draft => {
            draft.codeSets[draft.codeSetIndex].files = newFiles
            draft.fileIndex = newFileIndex
          })
        }}
      >
        {files.map((f, index) => (
          <Reorder.Item key={f.name} value={f}>
            <div
              key={f.id}
              className={cx(
                'flex min-w-8 cursor-pointer items-center justify-center rounded-t-md border-b border-transparent p-2 text-sm transition hover:bg-black/30',
                fileIndex === index && 'border-[#6cc7f6]'
              )}
              onClick={() => {
                actions.fileIndex(index)
              }}
            >
              {f.name}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div ref={lastRef} />
    </div>
  )
}

const SideBar = () => {
  const codeSets = useStore.codeSets()
  const codeSetIndex = useStore.codeSetIndex()
  return (
    <div className="flex w-[200px] flex-col items-center justify-center gap-2">
      <div className="text-xl text-[#e0e055]">CodeSets</div>
      <Reorder.Group
        className="flex flex-col"
        axis="y"
        values={codeSets}
        onReorder={newSets => {
          const currentSetId = store.currentSet().id
          const newSetIndex = newSets.findIndex(s => s.id === currentSetId)
          actions.state(draft => {
            draft.codeSets = newSets
            draft.codeSetIndex = newSetIndex
          })
        }}
      >
        {codeSets.map((s, index) => {
          const isCurrent = codeSetIndex === index
          return (
            <Reorder.Item
              key={s.id}
              value={s}
              onClick={() => actions.changeCodeSet(index)}
            >
              <div
                className={cx(
                  'my-0.5 flex cursor-pointer items-center justify-center rounded-md p-4 py-1 text-[#eee] transition hover:bg-white/10 hover:opacity-90',
                  isCurrent && 'bg-white/10'
                )}
              >
                {s.name}
              </div>
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
}

function App() {
  const codeSetIndex = useStore.codeSetIndex()
  const fileIndex = useStore.fileIndex()
  const currentSet = useStore.currentSet()

  useDisableSave()

  return (
    <div className="flex w-full">
      {/* left */}
      <SideBar />
      {/* right */}
      <div className="flex items-center">
        <div className="flex w-[800px] flex-col">
          <Tabs />
          <CodeBlock
            value={currentSet.files[fileIndex].code}
            onChange={newVal => {
              actions.state(draft => {
                draft.codeSets[codeSetIndex].files[fileIndex].code = newVal
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
