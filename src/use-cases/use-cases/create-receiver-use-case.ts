import { CreateReceiverRepository } from '@/repository/protocols/create-receiver-repository'
import { ReceiverModel, ReceiverStatus } from '@/use-cases/models/receiver'
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
    const receiver: ReceiverModel = {
      ...createReceiverParams,
      id: this.idGenerator.generate(),
      status: 'RASCUNHO',
    }
    const receiverCreated = await this.createReceiverRepository.create(receiver)
    return receiverCreated
  }
}
