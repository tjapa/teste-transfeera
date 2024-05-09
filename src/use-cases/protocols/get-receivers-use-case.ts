import {
  PixKeyType,
  ReceiverModel,
  ReceiverStatus,
} from '@/use-cases/models/receiver'

export interface GetReceiversUseCase {
  getReceivers: (filters: FiltersGetReceivers) => Promise<ReceiverModel[]>
}

export type FiltersGetReceivers = {
  offset?: number
  status?: ReceiverStatus
  name?: string
  pixKeyType?: PixKeyType
  pixKey?: string
}
