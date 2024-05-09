import { ReceiverModel } from '@/domain/models/receiver'
import { CreateReceiverRepository } from '@/repository/protocols/create-account-receiver-repository'
import { mockReceiver } from '@/tests/domain/mocks/mockReceiver'

export const mockCreateReceiverRepositoy = (): CreateReceiverRepository => {
  class CreateReceiverRepositoryStup implements CreateReceiverRepository {
    async create(receiver: ReceiverModel): Promise<ReceiverModel> {
      return mockReceiver()
    }
  }
  return new CreateReceiverRepositoryStup()
}
