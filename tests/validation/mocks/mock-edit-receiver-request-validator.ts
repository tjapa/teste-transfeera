import { EditReceiverRequest } from '@/presentation/models/edit-receiver-request'
import { Validator } from '@/presentation/protocols'
import { mockCreateReceiverRequestCPF } from '@/tests/presentation/mocks/mocks-create-receiver-request'

export const mockEditReceiverRequestValidator =
  (): Validator<EditReceiverRequest> => {
    class EditReceiverRequestValidatorStub
      implements Validator<EditReceiverRequest>
    {
      validate(input: any): EditReceiverRequest {
        return mockCreateReceiverRequestCPF()
      }
    }
    return new EditReceiverRequestValidatorStub()
  }
