import { ReceiverModel } from '@/domain/models/receiver'

export interface CreateReceiverRepository {
  create: (createReceiverParams: ReceiverModel) => Promise<ReceiverModel>
}
