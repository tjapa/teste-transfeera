import { ReceiverModel } from '@/use-cases/models/receiver'

export interface GetReceiverByIdRepository {
  getReceiverById: (id: string) => Promise<ReceiverModel | undefined>
}
