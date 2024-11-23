import { Button } from '@nextui-org/react'

const demo = `function App() {
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

function App() {
  return (
    <>
      <div>
        <Button>1</Button>
        {demo}
      </div>
    </>
  )
}

export default App
