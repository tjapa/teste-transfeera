import { DeleteReceiversRequest } from '@/presentation/models/delete-receivers-request'
import { Validator } from '@/presentation/protocols'
import { faker } from '@faker-js/faker'

export const mockDeleteReceiversRequestValidator =
  (): Validator<DeleteReceiversRequest> => {
    class DeleteReceiversRequestValidatorStub
      implements Validator<DeleteReceiversRequest>
    {
      validate(input: any): DeleteReceiversRequest {
        return [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()]
      }
    }
    return new DeleteReceiversRequestValidatorStub()
  }
