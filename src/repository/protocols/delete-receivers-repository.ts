export interface DeleteReceiversRepository {
  delete: (receiverIds: string[]) => Promise<{ deletedReceiverId: string }[]>
}
