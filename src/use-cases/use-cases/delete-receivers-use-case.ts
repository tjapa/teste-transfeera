import {
  DeleteReceiversUseCase,
  DeleteReceiversUseCaseResponse,
} from '../protocols/delete-receivers-use-case'
import { DeleteReceiversRepository } from '@/repository/protocols/delete-receivers-repository'

export class DeleteReceivers implements DeleteReceiversUseCase {
  constructor(
    private readonly deleteReceiversRepository: DeleteReceiversRepository,
  ) {}

  async deleteReceivers(
    receiverIds: string[],
  ): Promise<DeleteReceiversUseCaseResponse> {
    const deletedReceiverIds = (
      await this.deleteReceiversRepository.delete(receiverIds)
    ).map((receiverDeleted) => receiverDeleted.deletedReceiverId)

    const notFoundReceiverIds = receiverIds.filter(
      (receiverId) => !deletedReceiverIds.includes(receiverId),
    )

    return {
      deletedReceiverIds,
      notFoundReceiverIds,
    }
  }
}
