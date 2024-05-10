import { ReceiverModel } from '@/use-cases/models/receiver'
import { EditReceiverRepository } from '@/repository/protocols/edit-receiver-repository'
import { mockReceiverRascunhoCPF } from '@/tests/use-cases/mocks/mock-receiver'
import { EditReceiverParams } from '@/use-cases/protocols/edit-receiver-use-case'

export const mockEditReceiverRepository = (): EditReceiverRepository => {
  class EditReceiverRepositoryStub implements EditReceiverRepository {
    async edit(
      id: string,
      editReceiverData: EditReceiverParams,
    ): Promise<ReceiverModel> {
      return mockReceiverRascunhoCPF()
    }
  }
  return new EditReceiverRepositoryStub()
}
