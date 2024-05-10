import { GetReceiversRequestValidator } from '@/validation/validators/get-receivers-request-validator'
import {
  mockGetReceiversRequest,
  mockGetReceiversRequestInvalidOffset,
  mockGetReceiversRequestInvalidPixKey,
  mockGetReceiversRequestInvalidPixKeyType,
  mockGetReceiversRequestInvalidStatus,
} from '@/tests/presentation/mocks/mocks-get-receivers-request'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'

const makeSut = (): GetReceiversRequestValidator => {
  return new GetReceiversRequestValidator()
}

describe('Get Receivers Request Validator', () => {
  test('Should thrown if a invalid Get Receivers Request is provided', async () => {
    const sut = makeSut()
    const getReceiversRequests = [
      mockGetReceiversRequestInvalidPixKeyType(),
      mockGetReceiversRequestInvalidPixKey(),
      mockGetReceiversRequestInvalidStatus(),
      mockGetReceiversRequestInvalidOffset(),
    ]
    for (const getReceiversRequest of getReceiversRequests) {
      expect(() => {
        sut.validate(getReceiversRequest)
      }).toThrow(InvalidParamsError)
    }
  })

  test('Should return a valid getReceiverRequest on sucesss ', async () => {
    const sut = makeSut()
    const getReceiversRequest = mockGetReceiversRequest()
    const validGetReceiversRequest = sut.validate(getReceiversRequest)
    expect(validGetReceiversRequest).toEqual(getReceiversRequest)
  })
})
