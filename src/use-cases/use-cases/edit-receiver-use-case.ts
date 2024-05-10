import { ReceiverModel } from '@/use-cases/models/receiver'
import {
  EditReceiverParams,
  EditReceiverUseCase,
} from '../protocols/edit-receiver-use-case'
import { GetReceiverByIdRepository } from '@/repository/protocols/get-receiver-by-id-repository'
import { EditReceiverRepository } from '@/repository/protocols/edit-receiver-repository'
import { ReceiverNotFoundError } from '../errors/receiver-not-found-error'
import { InvalidReceiverEditDataFieldsError } from '../errors/invalid-receiver-edit-data-error'

export class EditReceiver implements EditReceiverUseCase {
  constructor(
    private readonly getReceiverByIdRepository: GetReceiverByIdRepository,
    private readonly editReceiverByIdRepository: EditReceiverRepository,
  ) { }

  async edit(
    id: string,
    editReceiverData: EditReceiverParams,
  ): Promise<ReceiverModel> {
    const receiver = await this.getReceiverByIdRepository.getReceiverById(id)

    if (!receiver) {
      throw new ReceiverNotFoundError(id)
    }

    if (receiver.status === 'VALIDADO') {
      const editReceiverDataKeys = Object.keys(editReceiverData).filter((key) =>
        Boolean(editReceiverData[key as keyof typeof editReceiverData]),
      )
      console.log({ editReceiverData })
      const validFields = ['email']
      const invalidFields = editReceiverDataKeys.filter(
        (key) => !validFields.includes(key),
      )
      console.log({ invalidFields })
      if (invalidFields.length > 0) {
        throw new InvalidReceiverEditDataFieldsError(invalidFields)
      }
    }

    const receiverEdit = await this.editReceiverByIdRepository.edit(
      id,
      editReceiverData,
    )

    return receiverEdit
  }
}
