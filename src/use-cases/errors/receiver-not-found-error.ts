export class ReceiverNotFoundError extends Error {
  constructor(receiverId: string) {
    super(`Receiver with id ${receiverId} not found`)
    this.name = 'ReceiverNotFound'
  }
}
