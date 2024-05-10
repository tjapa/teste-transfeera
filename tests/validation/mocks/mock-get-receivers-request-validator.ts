import { GetReceiversRequest } from '@/presentation/models/get-receivers-request'
import { Validator } from '@/presentation/protocols'
import { mockGetReceiversRequest } from '@/tests/presentation/mocks/mocks-get-receivers-request'

export const mockGetReceiversRequestValidator =
  (): Validator<GetReceiversRequest> => {
    class GetReceiversRequestValidatorStub
      implements Validator<GetReceiversRequest>
    {
      validate(input: any): GetReceiversRequest {
        return mockGetReceiversRequest()
      }
    }
    return new GetReceiversRequestValidatorStub()
  }
