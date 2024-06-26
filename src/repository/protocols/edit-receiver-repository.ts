import { ReceiverModel } from '@/use-cases/models/receiver'
import { EditReceiverParams } from '@/use-cases/protocols/edit-receiver-use-case'

export interface EditReceiverRepository {
  edit: (
    id: string,
    editReceiverData: EditReceiverParams,
  ) => Promise<ReceiverModel>
}
