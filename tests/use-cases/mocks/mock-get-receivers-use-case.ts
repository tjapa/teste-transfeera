import { ReceiverModel } from '@/use-cases/models/receiver'
import {
  FiltersGetReceivers,
  GetReceiversUseCase,
} from '@/use-cases/protocols/get-receivers-use-case'
import {
  mockReceiverRascunhoCNPJ,
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'

export const mockGetReceiversUseCase = (): GetReceiversUseCase => {
  class GetReceiversUseCaseStub implements GetReceiversUseCase {
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
  return new GetReceiversUseCaseStub()
}
