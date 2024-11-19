import {
  Disposable,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode'

import { getNonce } from '../utilities/getNonce'
import { getUri } from '../utilities/getUri'

// https://juejin.cn/post/7330886455231627315?from=search-suggest#heading-1
export class HelloWorldPanelProvider {
  public static currentPanel: HelloWorldPanelProvider | undefined
  private readonly _panel: WebviewPanel
  private _disposables: Disposable[] = []

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel

    // 面板关闭时触发的函数
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

    // 面板要渲染的HTML内容
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    )

    // 监听函数
    this._setWebviewMessageListener(this._panel.webview)
  }

  // 渲染当前的Webview面板，如果当前面板不存在，那么重新创建一个Webview Panel
  public static render(extensionUri: Uri) {
    if (HelloWorldPanel.currentPanel) {
      HelloWorldPanel.currentPanel._panel.reveal(ViewColumn.One)
    } else {
      const panel = window.createWebviewPanel(
        'showHelloWorld', // panel类型
        'Hello World', // panel title
        ViewColumn.One,
        {
          enableScripts: true, // 是否在面板内执行js
          localResourceRoots: [Uri.joinPath(extensionUri, 'out')], // panel视图加载out路径下的资源文件（可以是打包后的js和css文件，具体在_getWebviewContent函数内）
        }
      )

      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri)
    }
  }

  // 视图关闭
  public dispose() {
    HelloWorldPanel.currentPanel = undefined

    this._panel.dispose()

    while (this._disposables.length) {
      const disposable = this._disposables.pop()
      if (disposable) {
        disposable.dispose()
      }
    }
  }

  // webview内容
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const webviewUri = getUri(webview, extensionUri, ['out', 'webview.js']) // 这里是通过一个函数来加载编译后的js文件，可以作为module导入

    const nonce = getNonce() // 一个工具函数，保证js脚本引用的唯一性和安全性

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';">
          <title>Hello World!</title>
        </head>
        <body>
          <h1>Hello World!</h1>
					<vscode-button id="howdy">Howdy!</vscode-button>
					<script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>
    `
  }

  // webview的监听函数，用来坚挺从webview发送过来的data
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command
        const text = message.text
        switch (command) {
          case 'hello':
            window.showInformationMessage(text)
            return
        }
      },
      undefined,
      this._disposables
    )
  }
}
