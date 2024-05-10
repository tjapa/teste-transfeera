import { Validator } from '@/presentation/protocols'
import { throwError } from '@/tests/helpers/throw-error'
import {
  mockReceiverRascunhoCPF,
  mockReceiverRascunhoEmail,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'
import { DeleteReceiversController } from '@/presentation/controllers/receiver/delete-receivers-controller'
import { DeleteReceiversUseCase } from '@/use-cases/protocols/delete-receivers-use-case'
import { mockDeleteReceiversUseCase } from '@/tests/use-cases/mocks/mock-delete-receivers-use-case'
import { mockDeleteReceiversRequestValidator } from '@/tests/validation/mocks/mock-delete-receivers-request-validator'
import { DeleteReceiversRequest } from '@/presentation/models/delete-receivers-request'
import { mockDeleteReceiversRequest } from '../mocks/mock-delete-receivers-request'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'
import { faker } from '@faker-js/faker'

interface SutType {
  sut: DeleteReceiversController
  deleteReceiversUseCaseStub: DeleteReceiversUseCase
  validatorStub: Validator<DeleteReceiversRequest>
}

const makeSut = (): SutType => {
  const deleteReceiversUseCaseStub = mockDeleteReceiversUseCase()
  const validatorStub = mockDeleteReceiversRequestValidator()
  const sut = new DeleteReceiversController(
    deleteReceiversUseCaseStub,
    validatorStub,
  )

  return {
    sut,
    deleteReceiversUseCaseStub,
    validatorStub,
  }
}

describe('Delete Receivers Controller', () => {
  test('Should return status code 200 on success', async () => {
    const { sut, deleteReceiversUseCaseStub } = makeSut()
    const mockReturnValueDeleteReceiverUseCase = {
      deletedReceiverIds: [faker.string.uuid(), faker.string.uuid()],
      notFoundReceiverIds: [faker.string.uuid(), faker.string.uuid()],
    }
    jest
      .spyOn(deleteReceiversUseCaseStub, 'deleteReceivers')
      .mockReturnValueOnce(
        Promise.resolve(mockReturnValueDeleteReceiverUseCase),
      )

    const { statusCode, body } = await sut.handle({})

    expect(statusCode).toBe(200)

    const expectedResponse = {
      deleted_receiver_ids:
        mockReturnValueDeleteReceiverUseCase.deletedReceiverIds,
      not_found_receiver_ids:
        mockReturnValueDeleteReceiverUseCase.notFoundReceiverIds,
    }
    expect(body).toEqual(expectedResponse)
  })

  test('Should call validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const deleteReceiversRequest = mockDeleteReceiversRequest()
    await sut.handle({ body: deleteReceiversRequest })
    expect(validateSpy).toHaveBeenCalledWith(deleteReceiversRequest)
  })

  test('Should return status code 403 if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(throwError)
    const deleteReceiversRequest = mockDeleteReceiversRequest()
    const result = await sut.handle({ body: deleteReceiversRequest })
    expect(result.statusCode).toBe(403)
  })

  test('Should call deleteReceiversUseCase with correct values', async () => {
    const { sut, deleteReceiversUseCaseStub, validatorStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteReceiversUseCaseStub, 'deleteReceivers')
    const deleteReceiversRequest = mockDeleteReceiversRequest()
    const correctValue = mockDeleteReceiversRequest()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(correctValue)
    await sut.handle({ body: deleteReceiversRequest })
    expect(deleteSpy).toHaveBeenCalledWith(correctValue)
  })

  test('Should return status code 500 if deleteReceiverUseCase throws', async () => {
    const { sut, deleteReceiversUseCaseStub } = makeSut()
    jest
      .spyOn(deleteReceiversUseCaseStub, 'deleteReceivers')
      .mockImplementationOnce(throwError)
    const deleteReceiversRequest = mockDeleteReceiversRequest()
    const result = await sut.handle({ body: deleteReceiversRequest })
    expect(result.statusCode).toBe(500)
  })
})
