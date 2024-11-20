import {
  Disposable,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode'

import { getNonce, getUri } from './utils'

// https://juejin.cn/post/7330886455231627315?from=search-suggest#heading-1
export class PanelProvider {
  public static currentPanel: PanelProvider | undefined
  private readonly panel: WebviewPanel
  private disposables: Disposable[] = []

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this.panel = panel

    // 面板关闭时触发的函数
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables)

    // 面板要渲染的HTML内容
    this.panel.webview.html = this.getWebviewContent(
      this.panel.webview,
      extensionUri
    )

    // 监听函数
    this.setWebviewMessageListener(this.panel.webview)
  }

  // 渲染当前的Webview面板，如果当前面板不存在，那么重新创建一个Webview Panel
  public static render(extensionUri: Uri) {
    if (PanelProvider.currentPanel) {
      PanelProvider.currentPanel.panel.reveal(ViewColumn.One)
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

      PanelProvider.currentPanel = new PanelProvider(panel, extensionUri)
    }
  }

  // 视图关闭
  public dispose() {
    PanelProvider.currentPanel = undefined
    this.panel.dispose()
    while (this.disposables.length) {
      const disposable = this.disposables.pop()
      if (disposable) {
        disposable.dispose()
      }
    }
  }

  // webview内容
  private getWebviewContent(webview: Webview, extensionUri: Uri) {
    const webviewUri = getUri(webview, extensionUri, ['out', 'webview.js']) // 这里是通过一个函数来加载编译后的js文件，可以作为module导入

    const nonce = getNonce()
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <vscode-button id="howdy">Howdy!</vscode-button>
    <div id="root"></div>
    <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
  </body>
</html>
    `
  }

  // webview的监听函数，用来监听从webview发送过来的data
  private setWebviewMessageListener(webview: Webview) {
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
      this.disposables
    )
  }
}
