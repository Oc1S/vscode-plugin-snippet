import { PluginOption } from 'vite'
import WebSocket from 'ws'

import { LOCAL_RELOAD_SOCKET_URL } from './constants'
import MessageInterpreter from './interpreter'

export function watchReloadPlugin(): PluginOption {
  let ws: WebSocket | null = null

  const onBuild = () => {
    console.log('send@@')
    ws?.send(MessageInterpreter.send({ type: 'build_complete' }))
  }

  function initializeWebSocket(params?: { onOpen?: () => void }) {
    const { onOpen } = params || {}
    if (!ws) {
      ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL)
      ws.onopen = () => {
        onOpen?.()
        console.log(
          `[HMR] ✅Connected to dev-server at ${LOCAL_RELOAD_SOCKET_URL}`
        )
      }
      ws.onerror = event => {
        console.error(
          `[HMR] 🚧Failed to connect to server at ${LOCAL_RELOAD_SOCKET_URL}`,
          event,
          '\nRetrying in 10 seconds...'
        )
        ws = null
        setTimeout(() => initializeWebSocket({ onOpen }), 10_000)
      }
    }
  }

  return {
    name: 'watch-rebuild',
    writeBundle() {
      /**
       * When the build is complete, send a message to the reload server.
       * The ws server will send a message to the client to refresh the extension.
       */
      if (!ws) {
        initializeWebSocket({ onOpen: onBuild })
        return
      }
      onBuild()
    },
  }
}
