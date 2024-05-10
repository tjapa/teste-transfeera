import {
  DeleteReceiversUseCase,
  DeleteReceiversUseCaseResponse,
} from '@/use-cases/protocols/delete-receivers-use-case'
import { faker } from '@faker-js/faker'

export const mockDeleteReceiversUseCase = (): DeleteReceiversUseCase => {
  class DeleteReceiversUseCaseStub implements DeleteReceiversUseCase {
    async deleteReceivers(
      receiverIds: string[],
    ): Promise<DeleteReceiversUseCaseResponse> {
      return {
        deletedReceiverIds: [faker.string.uuid(), faker.string.uuid()],
        notFoundReceiverIds: [faker.string.uuid(), faker.string.uuid()],
      }
    }
  }
  return new DeleteReceiversUseCaseStub()
}
