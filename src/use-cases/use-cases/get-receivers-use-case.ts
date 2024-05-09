import { ReceiverModel } from '@/use-cases/models/receiver'
import {
  FiltersGetReceivers,
  GetReceiversUseCase,
} from '../protocols/get-receivers-use-case'
import { GetReceiversRepository } from '@/repository/protocols/get-receivers-repository'

export class GetReceivers implements GetReceiversUseCase {
  constructor(
    private readonly getReceiversRepository: GetReceiversRepository,
  ) {}

  async getReceivers(filters: FiltersGetReceivers): Promise<ReceiverModel[]> {
    return await this.getReceiversRepository.getReceivers(filters)
  }
}
