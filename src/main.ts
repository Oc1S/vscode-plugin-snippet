import {
  Button,
  provideVSCodeDesignSystem,
  vsCodeButton,
} from '@vscode/webview-ui-toolkit'

export const main = () => {
  provideVSCodeDesignSystem().register(vsCodeButton()) // 注册Button组件

  // 获取插件API
  const vscode = acquireVsCodeApi()

  // 这里需要先load webview
  window.addEventListener('load', main)

  // 待webview load完成后，获取dom节点信息
  function main() {
    // 通过在Provider class里渲染的节点ID来获取dom节点
    const howdyButton = document.getElementById('howdy') as Button
    howdyButton?.addEventListener('click', handleHowdyClick)
  }

  function handleHowdyClick() {
    // 通过postMessage API进行数据传递
    vscode.postMessage({
      command: 'hello',
      text: 'Hey there partner! 🤠',
    })
  }
}
