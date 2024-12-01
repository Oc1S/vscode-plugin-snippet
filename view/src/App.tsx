import { Reorder } from 'framer-motion'

import { CodeBlock } from '@/components/code-block'
import { useDisableSave } from '@/hooks'
import { actions, store, useStore } from '@/store'
import { cx } from '@/utils'

const Tabs = () => {
  const fileIndex = useStore.fileIndex()
  const currentSet = useStore.currentSet()

  const { files } = currentSet
  return (
    <Reorder.Group
      key={currentSet.id}
      className="flex w-full overflow-hidden"
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
  )
}

const SideBar = () => {
  const codeSets = useStore.codeSets()
  const codeSetIndex = useStore.codeSetIndex()
  return (
    <div className="flex w-[200px] flex-col items-center justify-center gap-2">
      <div className="text-lg">CodeSets</div>
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
          return (
            <Reorder.Item
              key={s.id}
              value={s}
              onClick={() => actions.changeCodeSet(index)}
            >
              <div
                className={cx(
                  'flex cursor-pointer transition hover:opacity-70',
                  index === codeSetIndex && 'text-primary translate-x-2'
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
        <div className="flex flex-col">
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
