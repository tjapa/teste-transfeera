import { EditReceiverRequestValidator } from '@/validation/validators/edit-receiver-request-validator'
import { InvalidParamsError } from '@/presentation/errors/invalid-params-error'
import {
  mockEditReceiverRequestCNPJ,
  mockEditReceiverRequestCPF,
  mockEditReceiverRequestChaveAleatoria,
  mockEditReceiverRequestPixEmail,
  mockEditReceiverRequestTelefone,
  mockEditReceiverRequestInvalidCNPJ,
  mockEditReceiverRequestInvalidCPF,
  mockEditReceiverRequestInvalidChaveAleatoria,
  mockEditReceiverRequestInvalidPixEmail,
  mockEditReceiverRequestInvalidEmail,
  mockEditReceiverRequestInvalidTelefone,
  mockEditReceiverRequestInvalidRegisterId,
  mockEditReceiverRequestInvalidPixKeyTypeWithoutPixKey,
  mockEditReceiverRequestWithoutSomeFields,
} from '@/tests/presentation/mocks/mocks-edit-receiver-request'
import { mockEditReceiverRequestInvalidPixKeyWithoutPixKeyType } from '@/tests/presentation/mocks/mocks-edit-receiver-request'

const makeSut = (): EditReceiverRequestValidator => {
  return new EditReceiverRequestValidator()
}

describe('Edit Receiver Request Validator', () => {
  test('Should thrown if a invalid Edit Receiver Request is provided', () => {
    const sut = makeSut()
    const editReceiverRequests = [
      mockEditReceiverRequestInvalidCPF(),
      mockEditReceiverRequestInvalidCNPJ(),
      mockEditReceiverRequestInvalidPixEmail(),
      mockEditReceiverRequestInvalidTelefone(),
      mockEditReceiverRequestInvalidChaveAleatoria(),
      mockEditReceiverRequestInvalidEmail(),
      mockEditReceiverRequestInvalidRegisterId(),
      mockEditReceiverRequestInvalidPixKeyTypeWithoutPixKey(),
      mockEditReceiverRequestInvalidPixKeyWithoutPixKeyType(),
    ]
    for (const editReceiverRequest of editReceiverRequests) {
      expect(() => {
        sut.validate(editReceiverRequest)
      }).toThrow(InvalidParamsError)
    }
  })

  test('Should return a valid editReceiverRequest on sucesss ', () => {
    const sut = makeSut()
    const editReceiverRequests = [
      mockEditReceiverRequestWithoutSomeFields(),
      mockEditReceiverRequestCPF(),
      mockEditReceiverRequestCNPJ(),
      mockEditReceiverRequestPixEmail(),
      mockEditReceiverRequestTelefone(),
      mockEditReceiverRequestChaveAleatoria(),
    ]
    for (const editReceiverRequest of editReceiverRequests) {
      const validEditReceiverRequest = sut.validate(editReceiverRequest)
      expect(validEditReceiverRequest).toEqual(editReceiverRequest)
    }
  })
})
