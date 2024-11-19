// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

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
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          retainContextWhenHidden: true, // 保证 Webview 所在页面进入后台时不被释放
          enableScripts: true, // 运行 JS 执行
        }
      )
      panel.webview.html = getWebviewContent()
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
      </head>
      <body>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
      </body>
    </html>`
}
