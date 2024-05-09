import { mockCreateReceiverParams } from '@/tests/domain/mock/mockReceiver'
import { CreateReceiverUseCase } from '@/domain/protocols/create-receiver-use-case'
import { CreateReceiver } from '@/domain/use-cases/create-receiver-use-case'
import { IdGenerator } from '@/domain/protocols/id-generator'
import { CreateReceiverRepository } from '@/repository/protocols/create-account-receiver-repository'
import { mockCreateReceiverRepositoy } from '@/tests/repository/mocks/mock-create-account-repository'
import { mockIdGenerator } from '../mock/mockIdGenerator'
import { throwError } from '@/tests/helpers/throw-error'
import { ReceiverStatus } from '@/domain/models/receiver'

interface SutType {
  sut: CreateReceiverUseCase
  createReceiverRepositoryStub: CreateReceiverRepository
  idGeneratorStub: IdGenerator
}

const makeSut = (): SutType => {
  const createReceiverRepositoryStub = mockCreateReceiverRepositoy()
  const idGeneratorStub = mockIdGenerator()
  const sut = new CreateReceiver(createReceiverRepositoryStub, idGeneratorStub)

  return {
    sut,
    createReceiverRepositoryStub,
    idGeneratorStub,
  }
}

describe('Create Receiver Use Case', () => {
  describe('create()', () => {
    test('Should return an receiver with status equals to RASCUNHO and same createReceiverParams on create success', async () => {
      const { sut, idGeneratorStub, createReceiverRepositoryStub } = makeSut()
      const createReceiverParams = mockCreateReceiverParams()
      const id = 'any_id'
      const receiver = {
        ...createReceiverParams,
        status: ReceiverStatus.RASCUNHO,
        id,
      }
      jest.spyOn(idGeneratorStub, 'generate').mockReturnValueOnce(id)
      jest
        .spyOn(createReceiverRepositoryStub, 'create')
        .mockReturnValueOnce(Promise.resolve(receiver))
      const receiverCreated = await sut.create(createReceiverParams)
      expect(receiverCreated.status).toBe(ReceiverStatus.RASCUNHO)
      expect(receiverCreated.id).toBe(id)
      expect(receiverCreated.name).toBe(receiver.name)
      expect(receiverCreated.pixKey).toBe(receiver.pixKey)
      expect(receiverCreated.pixKeyType).toBe(receiver.pixKeyType)
      expect(receiverCreated.email).toBe(receiver.email)
    })

    test('Should call CreateReceiverRepository with correct params', async () => {
      const { sut, idGeneratorStub, createReceiverRepositoryStub } = makeSut()
      const id = 'any_id'
      jest.spyOn(idGeneratorStub, 'generate').mockReturnValueOnce(id)
      const createReceiverRepositorySpy = jest.spyOn(
        createReceiverRepositoryStub,
        'create',
      )
      const createReceiverParams = mockCreateReceiverParams()
      const correctParams = {
        ...createReceiverParams,
        status: ReceiverStatus.RASCUNHO,
        id,
      }
      await sut.create(createReceiverParams)
      expect(createReceiverRepositorySpy).toHaveBeenCalledWith(correctParams)
    })
  })

  test('Should call IdGenerator', async () => {
    const { sut, idGeneratorStub, createReceiverRepositoryStub } = makeSut()
    const idGeneratorSpy = jest.spyOn(idGeneratorStub, 'generate')
    const createReceiverParams = mockCreateReceiverParams()
    await sut.create(createReceiverParams)
    expect(idGeneratorSpy).toHaveBeenCalled()
  })

  test('Should throw if CreateReceiverRepository throws', async () => {
    const { sut, createReceiverRepositoryStub } = makeSut()
    jest
      .spyOn(createReceiverRepositoryStub, 'create')
      .mockImplementationOnce(throwError)
    const createReceiverParams = mockCreateReceiverParams()
    const promise = sut.create(createReceiverParams)
    expect(promise).rejects.toThrow()
  })

  test('Should throw if IdGenerator throws', async () => {
    const { sut, idGeneratorStub } = makeSut()
    jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(throwError)
    const createReceiverParams = mockCreateReceiverParams()
    const promise = sut.create(createReceiverParams)
    expect(promise).rejects.toThrow()
  })
})
