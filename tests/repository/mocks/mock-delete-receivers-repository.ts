import { DeleteReceiversRepository } from '@/repository/protocols/delete-receivers-repository'
import {
  mockReceiverRascunhoCNPJ,
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'

export const mockDeleteReceiversRepository = (): DeleteReceiversRepository => {
  class DeleteReceiversRepositoryStub implements DeleteReceiversRepository {
    async delete(
      receiverIds: string[],
    ): Promise<{ deletedReceiverId: string }[]> {
      return [
        { deletedReceiverId: mockReceiverRascunhoCPF().id },
        { deletedReceiverId: mockReceiverRascunhoCNPJ().id },
        { deletedReceiverId: mockReceiverValidadoCPF().id },
      ]
    }
  }
  return new DeleteReceiversRepositoryStub()
}
