import { DeleteReceiversRequestValidator } from '@/validation/validators/delete-receivers-request-validator'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import { mockDeleteReceiversRequest } from '@/tests/presentation/mocks/mock-delete-receivers-request'

const makeSut = (): DeleteReceiversRequestValidator => {
  return new DeleteReceiversRequestValidator()
}

describe('Delete Receivers Request Validator', () => {
  test('Should thrown if a invalid Delete Receivers Request is provided', async () => {
    const sut = makeSut()
    const deleteReceiversRequests = [[1], ['test', 1, 'test'], undefined]
    for (const deleteReceiversRequest of deleteReceiversRequests) {
      expect(() => {
        sut.validate(deleteReceiversRequest)
      }).toThrow(InvalidParamsError)
    }
  })

  test('Should return a valid deleteReceiverRequest on sucesss ', async () => {
    const sut = makeSut()
    const deleteReceiversRequest = mockDeleteReceiversRequest()
    const validDeleteReceiversRequest = sut.validate(deleteReceiversRequest)
    expect(validDeleteReceiversRequest).toEqual(deleteReceiversRequest)
  })
})
