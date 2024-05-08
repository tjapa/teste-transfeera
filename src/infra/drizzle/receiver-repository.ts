import { ReceiverModel } from '@/domain/models/receiver'
import { CreateReceiverRepository } from '@/repository/protocols/create-account-receiver-repository'
import { drizzleClient } from './dizzleClient'
import { receivers } from './schemas'

export class ReceiverRepository implements CreateReceiverRepository {
  async create(receiver: ReceiverModel): Promise<ReceiverModel> {
    return (
      await drizzleClient.insert(receivers).values(receiver).returning()
    )[0]
  }
}
