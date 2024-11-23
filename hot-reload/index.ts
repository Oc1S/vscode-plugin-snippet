#!/usr/bin/env node
import { WebSocket, WebSocketServer } from 'ws'

import { LOCAL_RELOAD_SOCKET_PORT, LOCAL_RELOAD_SOCKET_URL } from './constants'
import MessageInterpreter from './interpreter'

const clientsThatNeedToUpdate: Set<WebSocket> = new Set()

function initReloadServer() {
  try {
    const wss = new WebSocketServer({ port: LOCAL_RELOAD_SOCKET_PORT })

    wss.on('listening', () =>
      console.log(`[HMR] Server listening at ${LOCAL_RELOAD_SOCKET_URL}`)
    )

    wss.on('connection', client => {
      clientsThatNeedToUpdate.add(client)

      client.addEventListener('close', () =>
        clientsThatNeedToUpdate.delete(client)
      )
      client.addEventListener('message', event => {
        const message = MessageInterpreter.receive(event.data.toString())
        if (message.type === 'done_update') {
          client.close()
        }
        if (message.type === 'build_complete') {
          clientsThatNeedToUpdate.forEach((client: WebSocket) =>
            client.send(MessageInterpreter.send({ type: 'do_update' }))
          )
        }
      })
    })

    ping()

    process.on('SIGINT', () => {
      console.log('SIGINT received. Closing server...')
      wss.close()
      process.exit(0)
    })
  } catch (e) {
    console.error(
      `[HMR] Failed to conenct to dev-server at ${LOCAL_RELOAD_SOCKET_URL}\n`,
      e
    )
  }
}

initReloadServer()

function ping() {
  clientsThatNeedToUpdate.forEach(ws =>
    ws.send(MessageInterpreter.send({ type: 'ping' }))
  )
  setTimeout(() => {
    ping()
  }, 15_000)
}
