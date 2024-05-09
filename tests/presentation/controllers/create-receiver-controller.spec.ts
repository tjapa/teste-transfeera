import { CreateReceiverController } from '@/presentation/controllers/receiver/create-receiver-controller'
import { CreateReceiverUseCase } from '@/domain/protocols/create-receiver-use-case'
import { CreateReceiverRequest } from '@/presentation/models/create-receiver-request'
import { Validator } from '@/presentation/protocols'
import { mockCreateReceiverRequestValidator } from '@/tests/validation/mocks/mock-create-receiver-request-validator'
import { mockCreateReceiverUseCase } from '@/tests/domain/mocks/mock-create-receiver-use-case'
import { mockCreateReceiverRequestCPF } from '../mocks/create-receiver-request-mocks'
import { throwError } from '@/tests/helpers/throw-error'
import { mockCreateReceiverParams } from '@/tests/domain/mocks/mock-receiver'

interface SutType {
  sut: CreateReceiverController
  createReceiverUseCaseStub: CreateReceiverUseCase
  validatorStub: Validator<CreateReceiverRequest>
}

const makeSut = (): SutType => {
  const createReceiverUseCaseStub = mockCreateReceiverUseCase()
  const validatorStub = mockCreateReceiverRequestValidator()
  const sut = new CreateReceiverController(
    createReceiverUseCaseStub,
    validatorStub,
  )

  return {
    sut,
    createReceiverUseCaseStub,
    validatorStub,
  }
}

describe('Create Receiver Controller', () => {
  test('Should return status code 200 on success', async () => {
    const { sut, createReceiverUseCaseStub } = makeSut()
    const createReceiverParams = mockCreateReceiverParams()
    jest.spyOn(createReceiverUseCaseStub, 'create').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        status: 'RASCUNHO',
        ...createReceiverParams,
      }),
    )
    const createReceiverRequest = mockCreateReceiverRequestCPF()
    const { statusCode, body } = await sut.handle({
      body: createReceiverRequest,
    })
    expect(statusCode).toBe(200)
    expect(body.id).toBe('any_id')
    expect(body.status).toBe('RASCUNHO')
    expect(body.pix_key).toBe(createReceiverParams.pixKey)
    expect(body.pix_key_type).toBe(createReceiverParams.pixKeyType)
    expect(body.email).toBe(createReceiverParams.email)
    expect(body.name).toBe(createReceiverParams.name)
    expect(body.register_id).toBe(createReceiverParams.registerId)
  })

  test('Should call validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const createReceiverRequest = mockCreateReceiverRequestCPF()
    await sut.handle({ body: createReceiverRequest })
    expect(validateSpy).toHaveBeenCalledWith(createReceiverRequest)
  })

  test('Should return status code 403 if validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(throwError)
    const createReceiverRequest = mockCreateReceiverRequestCPF()
    const result = await sut.handle({ body: createReceiverRequest })
    expect(result.statusCode).toBe(403)
  })

  test('Should call createReceiverUseCase with correct values', async () => {
    const { sut, createReceiverUseCaseStub, validatorStub } = makeSut()
    const createSpy = jest.spyOn(createReceiverUseCaseStub, 'create')
    const createReceiverRequest = mockCreateReceiverRequestCPF()
    jest
      .spyOn(validatorStub, 'validate')
      .mockReturnValueOnce(createReceiverRequest)
    const correctValues = {
      pixKeyType: createReceiverRequest.pix_key_type,
      pixKey: createReceiverRequest.pix_key,
      email: createReceiverRequest.email,
      name: createReceiverRequest.name,
      registerId: createReceiverRequest.register_id,
    }
    await sut.handle({ body: createReceiverRequest })
    expect(createSpy).toHaveBeenCalledWith(correctValues)
  })

  test('Should return status code 500 if createReceiverUseCase throws', async () => {
    const { sut, createReceiverUseCaseStub } = makeSut()
    jest
      .spyOn(createReceiverUseCaseStub, 'create')
      .mockImplementationOnce(throwError)
    const createReceiverRequest = mockCreateReceiverRequestCPF()
    const result = await sut.handle({ body: createReceiverRequest })
    expect(result.statusCode).toBe(500)
  })
})
