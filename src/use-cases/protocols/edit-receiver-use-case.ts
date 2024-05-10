import { ReceiverModel } from '@/use-cases/models/receiver'

export interface EditReceiverUseCase {
  edit: (
    id: string,
    editReceiverData: EditReceiverParams,
  ) => Promise<ReceiverModel>
}

export type EditReceiverParams = Omit<ReceiverModel, 'id' | 'status'>
