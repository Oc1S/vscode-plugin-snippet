// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode'

import { PanelProvider } from './panel-provider'

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

  context.subscriptions.push(
    vscode.commands.registerCommand('snippet-manager.dashboard', () => {
      // The code you place here will be executed every time your command is executed
      PanelProvider.render(context)

      context.subscriptions.push(PanelProvider.current!)
    })
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}
