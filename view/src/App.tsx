import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from '@nextui-org/react'
import { useLocalStorage } from 'usehooks-ts'

import { CodeBlock } from './components/code-block'

const code = `function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <ReactIcon />
        </a>
      </div>
      <h1>Vite + react</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <Button>1</Button>
      </div>
    </>
  )
}
`

const mockCodeSet = Array.from({ length: 10 }, (_, index) => {
  return {
    name: `test_set_${index}`,
    content: Array.from({ length: 5 }, (_, idx) => ({
      name: `App_${idx}.tsx`,
      code,
    })),
  }
})

function App() {
  const [value] = useLocalStorage<typeof mockCodeSet>('code', mockCodeSet)
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const currentSet = value[currentSetIndex]

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const Tabs = () => {
    return (
      <div className="flex">
        {currentSet.content.map(c => {
          return (
            <div className="border-primary flex min-w-8 cursor-pointer items-center justify-center rounded-t-md border-b bg-black p-2 hover:opacity-80">
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
