export interface DeleteReceiversUseCase {
  deleteReceivers: (
    receiverIds: string[],
  ) => Promise<DeleteReceiversUseCaseResponse>
}

export type DeleteReceiversUseCaseResponse = {
  deletedReceiverIds: string[]
  notFoundReceiverIds: string[]
}
