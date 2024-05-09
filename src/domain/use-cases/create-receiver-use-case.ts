import { CreateReceiverRepository } from '@/repository/protocols/create-receiver-repository'
import { ReceiverModel, ReceiverStatus } from '@/domain/models/receiver'
import {
  CreateReceiverParams,
  CreateReceiverUseCase,
} from '../protocols/create-receiver-use-case'
import { IdGenerator } from '../protocols/id-generator'

export class CreateReceiver implements CreateReceiverUseCase {
  constructor(
    private readonly createReceiverRepository: CreateReceiverRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async create(
    createReceiverParams: CreateReceiverParams,
  ): Promise<ReceiverModel> {
    const receiver = {
      ...createReceiverParams,
      id: this.idGenerator.generate(),
      status: ReceiverStatus.RASCUNHO,
    }
    const receiverCreated = await this.createReceiverRepository.create(receiver)
    return receiverCreated
  }
}
