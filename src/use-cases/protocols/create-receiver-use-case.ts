import { ReceiverModel } from '@/use-cases/models/receiver'

export interface CreateReceiverUseCase {
  create: (createReceiverParams: CreateReceiverParams) => Promise<ReceiverModel>
}

export type CreateReceiverParams = Pick<
  ReceiverModel,
  'pixKey' | 'pixKeyType' | 'name' | 'email' | 'registerId'
>
