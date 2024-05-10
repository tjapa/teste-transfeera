import { EditReceiverModel, ReceiverModel } from '@/use-cases/models/receiver'

export interface EditReceiverRepository {
  edit: (
    id: string,
    editReceiverData: EditReceiverModel,
  ) => Promise<ReceiverModel>
}
