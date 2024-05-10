import { ReceiverModel } from '@/use-cases/models/receiver'
import { GetReceiverByIdRepository } from '@/repository/protocols/get-receiver-by-id-repository'
import { mockReceiverRascunhoCPF } from '@/tests/use-cases/mocks/mock-receiver'

export const mockGetReceiverByIdRepository = (): GetReceiverByIdRepository => {
  class GetReceiverByIdRepositoryStub implements GetReceiverByIdRepository {
    async getReceiverById(id: string): Promise<ReceiverModel> {
      return mockReceiverRascunhoCPF()
    }
  }
  return new GetReceiverByIdRepositoryStub()
}
