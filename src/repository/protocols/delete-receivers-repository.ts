export interface DeleteReceiversRepository {
  delete: (receiverIds: string[]) => Promise<DeleteReceiversRepositoryResponse>
}

export type DeleteReceiversRepositoryResponse = { deletedReceiverId: string }[]
