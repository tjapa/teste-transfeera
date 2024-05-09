import {
  CreateReceiverParams,
  CreateReceiverUseCase,
} from '@/domain/protocols/create-receiver-use-case'
import { ReceiverModel } from '@/domain/models/receiver'
import { mockReceiver } from './mock-receiver'

export const mockCreateReceiverUseCase = (): CreateReceiverUseCase => {
  class CreateReceiverUseCaseStub implements CreateReceiverUseCase {
    async create(
      createReceiverParams: CreateReceiverParams,
    ): Promise<ReceiverModel> {
      return mockReceiver()
    }
  }
  return new CreateReceiverUseCaseStub()
}
