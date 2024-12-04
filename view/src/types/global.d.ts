type AnyFunction = (...args: any[]) => any

type Fn = () => void

interface Window {
  __inject_path: string
  isVSCodeWebview: boolean
}
