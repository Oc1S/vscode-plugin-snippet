type UpdateRequestMessage = {
  type: 'do_update'
}
type UpdateCompleteMessage = { type: 'done_update' }
type PingMessage = { type: 'ping' }
type BuildCompletionMessage = { type: 'build_complete' }

export type WebSocketMessage =
  | UpdateCompleteMessage
  | UpdateRequestMessage
  | BuildCompletionMessage
  | PingMessage

export default class MessageInterpreter {
  private constructor() {}
  static send(message: WebSocketMessage): string {
    return JSON.stringify(message)
  }
  static receive(
    serializedMessage: string
  ): WebSocketMessage | { type: 'parse_error' } {
    try {
      return JSON.parse(serializedMessage)
    } catch (e) {
      console.error('message parse error@', e)
      return { type: 'parse_error' }
    }
  }
}
