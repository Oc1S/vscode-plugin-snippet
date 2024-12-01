import { join } from 'path-browserify'

const webviewPublicPath = window.__inject_path ?? ''

export function publicPath(relativePath: string): string {
  return join(webviewPublicPath, relativePath)
}
