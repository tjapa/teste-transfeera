import { Validator } from '@/presentation/protocols'
import { throwError } from '@/tests/helpers/throw-error'
import {
  mockReceiverRascunhoCPF,
  mockReceiverRascunhoEmail,
  mockReceiverValidadoCPF,
} from '@/tests/use-cases/mocks/mock-receiver'
import { GetReceiversController } from '@/presentation/controllers/receiver/get-receivers-controller'
import { GetReceiversUseCase } from '@/use-cases/protocols/get-receivers-use-case'
import { mockGetReceiversUseCase } from '@/tests/use-cases/mocks/mock-get-receivers-use-case'
import { mockGetReceiversRequestValidator } from '@/tests/validation/mocks/mock-get-receivers-request-validator'
import { GetReceiversRequest } from '@/presentation/models/get-receivers-request'
import { mockGetReceiversRequest } from '../mocks/mocks-get-receivers-request'
import { mapReceiverModelToReceiverResponse } from '@/presentation/mappers/receiver-model-to-receiver-model-response'

interface SutType {
  sut: GetReceiversController
  getReceiversUseCaseStub: GetReceiversUseCase
  validatorStub: Validator<GetReceiversRequest>
}

const makeSut = (): SutType => {
  const getReceiversUseCaseStub = mockGetReceiversUseCase()
  const validatorStub = mockGetReceiversRequestValidator()
  const sut = new GetReceiversController(getReceiversUseCaseStub, validatorStub)

  return {
    sut,
    getReceiversUseCaseStub,
    validatorStub,
  }
}

describe('Get Receivers Controller', () => {
  test('Should return status code 200 on success', async () => {
    const { sut, getReceiversUseCaseStub } = makeSut()
    const mockReturnValueGetReceiverUseCase = [
      mockReceiverRascunhoCPF(),
      mockReceiverRascunhoEmail(),
      mockReceiverValidadoCPF(),
    ]
    jest
      .spyOn(getReceiversUseCaseStub, 'getReceivers')
      .mockReturnValueOnce(Promise.resolve(mockReturnValueGetReceiverUseCase))

    const { statusCode, body } = await sut.handle({})

    expect(statusCode).toBe(200)

    const receiverModelsAsReceiveReponse =
      mockReturnValueGetReceiverUseCase.map(mapReceiverModelToReceiverResponse)
    expect(body).toEqual(receiverModelsAsReceiveReponse)
  })

  test('Should call validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const getReceiversRequest = mockGetReceiversRequest()
    await sut.handle({ query: getReceiversRequest })
    expect(validateSpy).toHaveBeenCalledWith(getReceiversRequest)
  })

  test('Should return status code 403 if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(throwError)
    const getReceiversRequest = mockGetReceiversRequest()
    const result = await sut.handle({ query: getReceiversRequest })
    expect(result.statusCode).toBe(403)
  })

  test('Should call getReceiversUseCase with correct values', async () => {
    const { sut, getReceiversUseCaseStub, validatorStub } = makeSut()
    const getSpy = jest.spyOn(getReceiversUseCaseStub, 'getReceivers')
    const getReceiversRequest = mockGetReceiversRequest()
    jest
      .spyOn(validatorStub, 'validate')
      .mockReturnValueOnce(getReceiversRequest)
    const correctValues = {
      pixKeyType: getReceiversRequest?.pix_key_type,
      pixKey: getReceiversRequest?.pix_key,
      status: getReceiversRequest?.status,
      name: getReceiversRequest?.name,
      offset: getReceiversRequest?.offset,
    }
    await sut.handle({ query: getReceiversRequest })
    expect(getSpy).toHaveBeenCalledWith(correctValues)
  })

  test('Should return status code 500 if getReceiverUseCase throws', async () => {
    const { sut, getReceiversUseCaseStub } = makeSut()
    jest
      .spyOn(getReceiversUseCaseStub, 'getReceivers')
      .mockImplementationOnce(throwError)
    const result = await sut.handle({})
    expect(result.statusCode).toBe(500)
  })
})
