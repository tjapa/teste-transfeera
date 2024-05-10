import {
  EditReceiverParams,
  EditReceiverUseCase,
} from '@/use-cases/protocols/edit-receiver-use-case'
import { ReceiverModel } from '@/use-cases/models/receiver'
import { mockReceiverRascunhoCPF } from './mock-receiver'

export const mockEditReceiverUseCase = (): EditReceiverUseCase => {
  class EditReceiverUseCaseStub implements EditReceiverUseCase {
    async edit(
      id: string,
      editReceiverParams: EditReceiverParams,
    ): Promise<ReceiverModel> {
      return mockReceiverRascunhoCPF()
    }
  }
  return new EditReceiverUseCaseStub()
}
