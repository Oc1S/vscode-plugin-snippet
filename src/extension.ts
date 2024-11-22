// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from 'node:path'

import * as vscode from 'vscode'

import { getWebviewContent } from './view'

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const global = vscode.window
  const editor = global.activeTextEditor
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('get it running', global, context, editor)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'snippet-manager.dashboard',
    () => {
      // The code you place here will be executed every time your command is executed

      const panel = vscode.window.createWebviewPanel(
        'snippet-manager.dashboard',
        'Snippet Manager',
        vscode.ViewColumn.One,
        {
          retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
          enableScripts: true,
        }
      )

      const isProduction =
        context.extensionMode === vscode.ExtensionMode.Production
      let srcUrl = ''
      if (isProduction) {
        const filePath = vscode.Uri.file(
          path.join(context.extensionPath, 'out', 'dist', 'static/js/main.js')
        )
        srcUrl = panel.webview.asWebviewUri(filePath).toString()
      } else {
        srcUrl = 'http://localhost:5173/src/main.tsx'
      }

      panel.webview.html = getWebviewContent(srcUrl)
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
