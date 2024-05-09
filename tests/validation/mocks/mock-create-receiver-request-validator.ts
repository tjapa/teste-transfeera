import { CreateReceiverRequest } from '@/presentation/models/create-receiver-request'
import { Validator } from '@/presentation/protocols'
import { mockCreateReceiverRequestCPF } from '@/tests/presentation/mocks/create-receiver-request-mocks'

export const mockCreateReceiverRequestValidator =
  (): Validator<CreateReceiverRequest> => {
    class CreateReceiverRequestValidatorStub
      implements Validator<CreateReceiverRequest>
    {
      validate(input: any): CreateReceiverRequest {
        return mockCreateReceiverRequestCPF()
      }
    }
    return new CreateReceiverRequestValidatorStub()
  }
