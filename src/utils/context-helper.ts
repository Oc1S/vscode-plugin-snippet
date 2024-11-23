import { ExtensionContext, ExtensionMode } from 'vscode'

export class ContextHelper {
  static context: ExtensionContext
  static isProduction: boolean
  static isDev: boolean

  constructor(context: ExtensionContext) {
    ContextHelper.context = context
    ContextHelper.isProduction =
      context.extensionMode === ExtensionMode.Production
    ContextHelper.isDev = !ContextHelper.isProduction
  }
}
