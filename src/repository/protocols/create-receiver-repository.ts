import { ReceiverModel } from '@/use-cases/models/receiver'

export interface CreateReceiverRepository {
  create: (createReceiverParams: ReceiverModel) => Promise<ReceiverModel>
}
