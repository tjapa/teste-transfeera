import { ReceiverModel } from '@/use-cases/models/receiver'

export interface EditReceiverUseCase {
  edit: (
    id: string,
    editReceiverData: EditReceiverParams,
  ) => Promise<ReceiverModel>
}

export type EditReceiverParams = Partial<Omit<ReceiverModel, 'id' | 'status'>>
