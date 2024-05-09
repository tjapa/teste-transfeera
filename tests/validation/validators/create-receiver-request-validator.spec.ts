import { CreateReceiverRequestValidator } from '@/validation/validators/create-receiver-request-validator'
import {
  mockCreateReceiverRequestCNPJ,
  mockCreateReceiverRequestCPF,
  mockCreateReceiverRequestChaveAleatoria,
  mockCreateReceiverRequestPixEmail,
  mockCreateReceiverRequestTelefone,
  mockCreateReceiverRequestWrongCNPJ,
  mockCreateReceiverRequestWrongCPF,
  mockCreateReceiverRequestWrongChaveAleatoria,
  mockCreateReceiverRequestWrongPixEmail,
  mockCreateReceiverRequestWrongEmail,
  mockCreateReceiverRequestWrongTelefone,
  mockCreateReceiverRequestWrongRegisterId,
} from '@/tests/presentation/mocks/create-receiver-request-mocks'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'

const makeSut = (): CreateReceiverRequestValidator => {
  return new CreateReceiverRequestValidator()
}

describe('Create Receiver Request Validator', () => {
  test('Should thrown if a invalid Create Receiver Request is provided', async () => {
    const sut = makeSut()
    const createReceiverRequests = [
      mockCreateReceiverRequestWrongCPF(),
      mockCreateReceiverRequestWrongCNPJ(),
      mockCreateReceiverRequestWrongPixEmail(),
      mockCreateReceiverRequestWrongTelefone(),
      mockCreateReceiverRequestWrongChaveAleatoria(),
      mockCreateReceiverRequestWrongEmail(),
      mockCreateReceiverRequestWrongRegisterId(),
    ]
    for (const createReceiverRequest of createReceiverRequests) {
      // console.log(createReceiverRequest)
      expect(() => {
        sut.validate(createReceiverRequest)
      }).toThrow(InvalidParamsError)
    }
  })

  test('Should return a valid createReceiverRequest on sucesss ', async () => {
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
