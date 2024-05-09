import {
  PixKeyType,
  ReceiverModel,
  ReceiverStatus,
} from '@/use-cases/models/receiver'

export interface GetReceiversRepository {
  getReceivers: (filters?: {
    offset?: number | undefined
    status?: ReceiverStatus | undefined
    name?: string | undefined
    pixKeyType?: PixKeyType | undefined
    pixKey?: string | undefined
  }) => Promise<ReceiverModel[]>
}
