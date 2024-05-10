import { EditReceiverUseCase } from '@/use-cases/protocols/edit-receiver-use-case'
import { EditReceiver } from '@/use-cases/use-cases/edit-receiver-use-case'
import { EditReceiverRepository } from '@/repository/protocols/edit-receiver-repository'
import { mockEditReceiverRepository } from '@/tests/repository/mocks/mock-edit-receiver-repository'
import { throwError } from '@/tests/helpers/throw-error'
import { GetReceiverByIdRepository } from '@/repository/protocols/get-receiver-by-id-repository'
import { mockGetReceiverByIdRepository } from '@/tests/repository/mocks/mock-get-receiver-by-id-repository'
import {
  mockEditReceiverParams,
  mockEditReceiverParamsOnlyEmail,
} from '../mocks/mock-edit-receiver-params'
import { ReceiverNotFoundError } from '@/use-cases/errors/receiver-not-found-error'
import {
  mockReceiverRascunhoCPF,
  mockReceiverValidadoCPF,
} from '../mocks/mock-receiver'
import { InvalidReceiverEditDataFieldsError } from '@/use-cases/errors/invalid-receiver-edit-data-error'

interface SutType {
  sut: EditReceiverUseCase
  editReceiverRepositoryStub: EditReceiverRepository
  getReceiverByIdRepositoryStub: GetReceiverByIdRepository
}

const makeSut = (): SutType => {
  const getReceiverByIdRepositoryStub = mockGetReceiverByIdRepository()
  const editReceiverRepositoryStub = mockEditReceiverRepository()
  const sut = new EditReceiver(
    getReceiverByIdRepositoryStub,
    editReceiverRepositoryStub,
  )

  return {
    sut,
    editReceiverRepositoryStub,
    getReceiverByIdRepositoryStub,
  }
}

describe('Edit Receiver Use Case', () => {
  describe('edit()', () => {
    test('Should return the receiver with status RASCUNHO edited from db on success', async () => {
      const { sut, getReceiverByIdRepositoryStub, editReceiverRepositoryStub } =
        makeSut()
      const receiver = mockReceiverRascunhoCPF()
      jest
        .spyOn(getReceiverByIdRepositoryStub, 'getReceiverById')
        .mockReturnValueOnce(Promise.resolve(receiver))

      const id = receiver.id
      const editReceiverData = mockEditReceiverParams()
      const expectedReturn = { ...receiver, ...editReceiverData }

      jest
        .spyOn(editReceiverRepositoryStub, 'edit')
        .mockReturnValueOnce(Promise.resolve(expectedReturn))

      const receiverEdited = await sut.edit(id, editReceiverData)
      expect(receiverEdited).toEqual(expectedReturn)
    })

    test('Should return the receiver with status VALIDADO edited from db on success', async () => {
      const { sut, getReceiverByIdRepositoryStub, editReceiverRepositoryStub } =
        makeSut()
      const receiver = mockReceiverValidadoCPF()
      jest
        .spyOn(getReceiverByIdRepositoryStub, 'getReceiverById')
        .mockReturnValueOnce(Promise.resolve(receiver))

      const id = receiver.id
      const editReceiverData = mockEditReceiverParamsOnlyEmail()
      const expectedReturn = { ...receiver, ...editReceiverData }

      jest
        .spyOn(editReceiverRepositoryStub, 'edit')
        .mockReturnValueOnce(Promise.resolve(expectedReturn))

      const receiverEdited = await sut.edit(id, editReceiverData)
      expect(receiverEdited).toEqual(expectedReturn)
    })

    test('Should throw if try edit invalid field for receiver with status VALIDADO', async () => {
      const { sut, getReceiverByIdRepositoryStub } = makeSut()
      const getReceiverByIdSpy = jest
        .spyOn(getReceiverByIdRepositoryStub, 'getReceiverById')
        .mockReturnValueOnce(Promise.resolve(mockReceiverValidadoCPF()))
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      const promise = sut.edit(id, editReceiverData)
      expect(promise).rejects.toThrow(InvalidReceiverEditDataFieldsError)
    })

    test('Should call GetReceiverByIdRepository with correct params', async () => {
      const { sut, getReceiverByIdRepositoryStub } = makeSut()
      const getReceiverByIdSpy = jest.spyOn(
        getReceiverByIdRepositoryStub,
        'getReceiverById',
      )
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      await sut.edit(id, editReceiverData)
      expect(getReceiverByIdSpy).toHaveBeenCalledWith(id)
    })

    test('Should throw if GetReceiverByIdRepository throws', async () => {
      const { sut, getReceiverByIdRepositoryStub } = makeSut()
      jest
        .spyOn(getReceiverByIdRepositoryStub, 'getReceiverById')
        .mockImplementationOnce(throwError)
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      const promise = sut.edit(id, editReceiverData)
      expect(promise).rejects.toThrow()
    })

    test('Should throw if GetReceiverByIdRepository returns undefined', async () => {
      const { sut, getReceiverByIdRepositoryStub } = makeSut()
      jest
        .spyOn(getReceiverByIdRepositoryStub, 'getReceiverById')
        .mockReturnValueOnce(Promise.resolve(undefined))
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      const promise = sut.edit(id, editReceiverData)
      expect(promise).rejects.toThrow(new ReceiverNotFoundError(id))
    })

    test('Should call EditReceiverRepositoryRepository with correct params', async () => {
      const { sut, editReceiverRepositoryStub } = makeSut()
      const editReceiverRepositorySpy = jest.spyOn(
        editReceiverRepositoryStub,
        'edit',
      )
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      await sut.edit(id, editReceiverData)
      expect(editReceiverRepositorySpy).toHaveBeenCalledWith(
        id,
        editReceiverData,
      )
    })

    test('Should throw if EditReceiverRepositoryRepository throws', async () => {
      const { sut, editReceiverRepositoryStub } = makeSut()
      jest
        .spyOn(editReceiverRepositoryStub, 'edit')
        .mockImplementationOnce(throwError)
      const id = 'any_id'
      const editReceiverData = mockEditReceiverParams()
      const promise = sut.edit(id, editReceiverData)
      expect(promise).rejects.toThrow()
    })
  })
})

//
// test('Should call IdGenerator', async () => {
//   const { sut, getReceiverByIdRepositoryStub: idGeneratorStub } = makeSut()
//   const idGeneratorSpy = jest.spyOn(idGeneratorStub, 'generate')
//   const editReceiverParams = mockEditReceiverParams()
//   await sut.edit(editReceiverParams)
//   expect(idGeneratorSpy).toHaveBeenCalled()
// })
//
// test('Should throw if EditReceiverRepository throws', async () => {
//   const { sut, editReceiverRepositoryStub } = makeSut()
//   jest
//     .spyOn(editReceiverRepositoryStub, 'edit')
//     .mockImplementationOnce(throwError)
//   const editReceiverParams = mockEditReceiverParams()
//   const promise = sut.edit(editReceiverParams)
//   expect(promise).rejects.toThrow()
// })
//
// test('Should throw if IdGenerator throws', async () => {
//   const { sut, getReceiverByIdRepositoryStub: idGeneratorStub } = makeSut()
//   jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(throwError)
//   const editReceiverParams = mockEditReceiverParams()
//   const promise = sut.edit(editReceiverParams)
//   expect(promise).rejects.toThrow()
// })
