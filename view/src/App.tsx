import { useState } from 'react'
import { Button, ButtonGroup } from '@nextui-org/react'
import { useLocalStorage } from 'usehooks-ts'

import { repoStore } from '@/store'

import { CodeBlock } from './components/code-block'
import { code } from './demo'
import { useDisableSave } from './hooks'

function App() {
  const codeSets = repoStore.get.codeSets()
  const [value, setValue] = useLocalStorage<typeof codeSets>('code', codeSets)

  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const currentSet = value[currentSetIndex]

  useDisableSave()

  const Tabs = () => {
    return (
      <div className="flex">
        {currentSet.content.map(c => {
          return (
            <div
              key={c.name}
              className="border-primary flex min-w-8 cursor-pointer items-center justify-center rounded-t-md border-b bg-black p-2 hover:opacity-80"
            >
              {c.name}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex w-full">
      <ButtonGroup className="mr-4 flex flex-col" radius="none">
        {value.map((data, index) => {
          return (
            <Button
              key={index}
              color={index === currentSetIndex ? 'primary' : 'default'}
              onClick={() => [setCurrentSetIndex(index)]}
            >
              {data.name}
            </Button>
          )
        })}
      </ButtonGroup>

      <div className="flex flex-col">
        <Tabs />
        <CodeBlock initValue={code} />
      </div>
    </div>
  )
}

export default App
