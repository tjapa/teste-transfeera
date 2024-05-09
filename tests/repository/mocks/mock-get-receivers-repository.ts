import { ReceiverModel } from '@/use-cases/models/receiver'
import {
  FiltersGetReceivers,
  GetReceiversRepository,
} from '@/repository/protocols/get-receivers-repository'
import {
  mockReceiverRascunhoCNPJ,
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'

export const mockGetReceiversRepository = (): GetReceiversRepository => {
  class GetReceiversRepositoryStub implements GetReceiversRepository {
    async getReceivers(
      filters?: FiltersGetReceivers,
    ): Promise<ReceiverModel[]> {
      return [
        mockReceiverRascunhoCPF(),
        mockReceiverRascunhoCNPJ(),
        mockReceiverValidadoCPF(),
      ]
    }
  }
  return new GetReceiversRepositoryStub()
}
