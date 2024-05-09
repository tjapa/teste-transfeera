import { ReceiverModel } from '@/use-cases/models/receiver'
import { CreateReceiverRepository } from '@/repository/protocols/create-receiver-repository'
import { mockReceiver } from '@/tests/use-cases/mocks/mock-receiver'

export const mockCreateReceiverRepository = (): CreateReceiverRepository => {
  class CreateReceiverRepositoryStub implements CreateReceiverRepository {
    async create(receiver: ReceiverModel): Promise<ReceiverModel> {
      return mockReceiver()
    }
  }
  return new CreateReceiverRepositoryStub()
}
