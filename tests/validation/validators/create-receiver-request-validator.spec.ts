import { CreateReceiverRequestValidator } from '@/validation/validators/create-receiver-request-validator'
import {
  mockCreateReceiverRequestCNPJ,
  mockCreateReceiverRequestCPF,
  mockCreateReceiverRequestChaveAleatoria,
  mockCreateReceiverRequestPixEmail,
  mockCreateReceiverRequestTelefone,
  mockCreateReceiverRequestInvalidCNPJ,
  mockCreateReceiverRequestInvalidCPF,
  mockCreateReceiverRequestInvalidChaveAleatoria,
  mockCreateReceiverRequestInvalidPixEmail,
  mockCreateReceiverRequestInvalidEmail,
  mockCreateReceiverRequestInvalidTelefone,
  mockCreateReceiverRequestInvalidRegisterId,
} from '@/tests/presentation/mocks/mocks-create-receiver-request'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'

const makeSut = (): CreateReceiverRequestValidator => {
  return new CreateReceiverRequestValidator()
}

describe('Create Receiver Request Validator', () => {
  test('Should thrown if a invalid Create Receiver Request is provided', () => {
    const sut = makeSut()
    const createReceiverRequests = [
      mockCreateReceiverRequestInvalidCPF(),
      mockCreateReceiverRequestInvalidCNPJ(),
      mockCreateReceiverRequestInvalidPixEmail(),
      mockCreateReceiverRequestInvalidTelefone(),
      mockCreateReceiverRequestInvalidChaveAleatoria(),
      mockCreateReceiverRequestInvalidEmail(),
      mockCreateReceiverRequestInvalidRegisterId(),
    ]
    for (const createReceiverRequest of createReceiverRequests) {
      expect(() => {
        sut.validate(createReceiverRequest)
      }).toThrow(InvalidParamsError)
    }
  })

  test('Should return a valid createReceiverRequest on sucesss ', () => {
    const sut = makeSut()
    const createReceiverRequests = [
      mockCreateReceiverRequestCPF(),
      mockCreateReceiverRequestCNPJ(),
      mockCreateReceiverRequestPixEmail(),
      mockCreateReceiverRequestTelefone(),
      mockCreateReceiverRequestChaveAleatoria(),
    ]
    for (const createReceiverRequest of createReceiverRequests) {
      const validCreateReceiverRequest = sut.validate(createReceiverRequest)
      expect(validCreateReceiverRequest).toEqual(createReceiverRequest)
    }
  })
})
