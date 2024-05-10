import { EditReceiverController } from '@/presentation/controllers/receiver/edit-receiver-controller'
import { EditReceiverUseCase } from '@/use-cases/protocols/edit-receiver-use-case'
import { EditReceiverRequest } from '@/presentation/models/edit-receiver-request'
import { Validator } from '@/presentation/protocols'
import { mockEditReceiverRequestValidator } from '@/tests/validation/mocks/mock-edit-receiver-request-validator'
import { mockEditReceiverUseCase } from '@/tests/use-cases/mocks/mock-edit-receiver-use-case'
import { mockEditReceiverRequestCPF } from '../mocks/mocks-edit-receiver-request'
import { throwError } from '@/tests/helpers/throw-error'
import { mockEditReceiverParams } from '@/tests/use-cases/mocks/mock-edit-receiver-params'
import { mockReceiverRascunhoCPF } from '@/tests/use-cases/mocks/mock-receiver'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'
import { ReceiverNotFoundError } from '@/use-cases/errors/receiver-not-found-error'
import { InvalidReceiverEditDataFieldsError } from '@/use-cases/errors/invalid-receiver-edit-data-error'

interface SutType {
  sut: EditReceiverController
  editReceiverUseCaseStub: EditReceiverUseCase
  validatorStub: Validator<EditReceiverRequest>
}

const makeSut = (): SutType => {
  const editReceiverUseCaseStub = mockEditReceiverUseCase()
  const validatorStub = mockEditReceiverRequestValidator()
  const sut = new EditReceiverController(editReceiverUseCaseStub, validatorStub)

  return {
    sut,
    editReceiverUseCaseStub,
    validatorStub,
  }
}

describe('Edit Receiver Controller', () => {
  test('Should return status code 200 and receiver edited on success', async () => {
    const { sut, editReceiverUseCaseStub } = makeSut()
    const receiver = mockReceiverRascunhoCPF()
    const editReceiverParams = mockEditReceiverParams()
    const expectedReceiverEdited = {
      ...receiver,
      ...editReceiverParams,
    }
    jest
      .spyOn(editReceiverUseCaseStub, 'edit')
      .mockReturnValueOnce(Promise.resolve(expectedReceiverEdited))
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const { statusCode, body } = await sut.handle({
      params: { id: receiver.id },
      body: editReceiverRequest,
    })
    const expectedReceiverEditedFormatted = mapReceiverModelToReceiverResponse(
      expectedReceiverEdited,
    )

    expect(statusCode).toBe(200)
    expect(body).toEqual(expectedReceiverEditedFormatted)
  })

  test('Should return status code 403 if empty id is provided', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(throwError)
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const result = await sut.handle({
      body: editReceiverRequest,
    })
    expect(result.statusCode).toBe(403)
  })

  test('Should call validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const id = 'any_id'
    await sut.handle({ params: { id }, body: editReceiverRequest })
    expect(validateSpy).toHaveBeenCalledWith(editReceiverRequest)
  })

  test('Should return status code 403 if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(throwError)
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const id = 'any_id'
    const result = await sut.handle({
      params: { id },
      body: editReceiverRequest,
    })
    expect(result.statusCode).toBe(403)
  })

  test('Should call editReceiverUseCase with correct values', async () => {
    const { sut, editReceiverUseCaseStub, validatorStub } = makeSut()
    const editSpy = jest.spyOn(editReceiverUseCaseStub, 'edit')
    const editReceiverRequest = mockEditReceiverRequestCPF()
    jest
      .spyOn(validatorStub, 'validate')
      .mockReturnValueOnce(editReceiverRequest)
    const correctValues = {
      pixKeyType: editReceiverRequest.pix_key_type,
      pixKey: editReceiverRequest.pix_key,
      email: editReceiverRequest.email,
      name: editReceiverRequest.name,
      registerId: editReceiverRequest.register_id,
    }
    const id = 'any_id'
    await sut.handle({ params: { id }, body: editReceiverRequest })
    expect(editSpy).toHaveBeenCalledWith(id, correctValues)
  })

  test('Should return status code 500 if editReceiverUseCase throws an unexpected error', async () => {
    const { sut, editReceiverUseCaseStub } = makeSut()
    jest
      .spyOn(editReceiverUseCaseStub, 'edit')
      .mockImplementationOnce(throwError)
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const id = 'any_id'
    const result = await sut.handle({
      params: { id },
      body: editReceiverRequest,
    })
    expect(result.statusCode).toBe(500)
  })

  test('Should return status code 404 if editReceiverUseCase throws an ReceiverNotFoundError', async () => {
    const { sut, editReceiverUseCaseStub } = makeSut()
    jest.spyOn(editReceiverUseCaseStub, 'edit').mockImplementationOnce(() => {
      throw new ReceiverNotFoundError('any_id')
    })
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const id = 'any_id'
    const result = await sut.handle({
      params: { id },
      body: editReceiverRequest,
    })
    expect(result.statusCode).toBe(404)
  })

  test('Should return status code 403 if editReceiverUseCase throws an InvalidReceiverEditData', async () => {
    const { sut, editReceiverUseCaseStub } = makeSut()
    jest.spyOn(editReceiverUseCaseStub, 'edit').mockImplementationOnce(() => {
      throw new InvalidReceiverEditDataFieldsError([])
    })
    const editReceiverRequest = mockEditReceiverRequestCPF()
    const id = 'any_id'
    const result = await sut.handle({
      params: { id },
      body: editReceiverRequest,
    })
    expect(result.statusCode).toBe(403)
  })
})
