import path from 'node:path'

import * as cheerio from 'cheerio'
import * as fs from 'fs'
import {
  Disposable,
  ExtensionContext,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode'

import { ContextHelper } from './utils/context-helper'

export class PanelProvider {
  public static current: PanelProvider | undefined
  private readonly context: ExtensionContext
  private readonly panel: WebviewPanel
  private disposables: Disposable[] = []

  private constructor(context: ExtensionContext, panel: WebviewPanel) {
    this.context = context
    this.panel = panel

    // 面板关闭时触发的函数
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables)

    // 面板要渲染的HTML内容
    this.panel.webview.html = this.getWebviewContent()

    // 监听函数
    this.setWebviewMessageListener(this.panel.webview)

    new ContextHelper(context)

    if (ContextHelper.isDev) {
      const updateWebview = () => {
        this.panel.webview.html = this.getWebviewContent()
      }
      updateWebview()
      const interval = setInterval(updateWebview, 2000)
      this.disposables.push({
        dispose: () => {
          clearInterval(interval)
        },
      })
    }
  }

  // 渲染当前的Webview面板，如果当前面板不存在，那么重新创建一个Webview Panel
  public static render(context: ExtensionContext) {
    if (PanelProvider.current) {
      PanelProvider.current.panel.reveal(ViewColumn.One)
      return PanelProvider.current.panel
    } else {
      const panel = window.createWebviewPanel(
        'snippet-manager.dashboard',
        'Snippet Manager',
        ViewColumn.One,
        {
          retainContextWhenHidden: true,
          enableScripts: true,
        }
      )

      PanelProvider.current = new PanelProvider(context, panel)
      return panel
    }
  }

  // clean up
  public dispose() {
    PanelProvider.current = undefined
    this.panel.dispose()
    while (this.disposables.length) {
      const disposable = this.disposables.pop()
      if (disposable?.dispose) {
        disposable.dispose()
      }
    }
  }

  /** local source to webview source */
  private toWebviewUri = (path: string) => {
    const filePath = Uri.file(path)
    return this.panel.webview.asWebviewUri(filePath).toString()
  }

  /** content of webview */
  private getWebviewContent() {
    const distPath = path.join(this.context.extensionPath, 'out/view')
    const $ = cheerio.load(fs.readFileSync(path.join(distPath, 'index.html')))
    const jsElement = $('script[crossorigin]')
    const cssElement = $('link[rel=stylesheet]')
    const jsSrc = jsElement.attr('src')!
    const cssHref = cssElement.attr('href')!
    const [jsFilePath, cssFilePath] = [jsSrc, cssHref].map(filePath =>
      this.toWebviewUri(path.join(distPath, filePath))
    )
    jsElement.attr('src', jsFilePath)
    cssElement.attr('href', cssFilePath)
    return $.html()
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

  public postMessage(text: string) {
    this.panel.webview.postMessage({ text })
  }
}
