import { ReceiverModel } from '@/use-cases/models/receiver'
import { CreateReceiverRepository } from '@/repository/protocols/create-receiver-repository'
import {
  FiltersGetReceivers,
  GetReceiversRepository,
} from '@/repository/protocols/get-receivers-repository'
import { drizzleClient } from './dizzleClient'
import { receivers } from './schemas'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import {
  DeleteReceiversRepository,
  DeleteReceiversRepositoryResponse,
} from '@/repository/protocols/delete-receivers-repository'
import { GetReceiverByIdRepository } from '@/repository/protocols/get-receiver-by-id-repository'
import { EditReceiverRepository } from '@/repository/protocols/edit-receiver-repository'
import { EditReceiverParams } from '@/use-cases/protocols/edit-receiver-use-case'

export class ReceiverRepository
  implements
    CreateReceiverRepository,
    GetReceiversRepository,
    DeleteReceiversRepository,
    GetReceiverByIdRepository,
    EditReceiverRepository
{
  async create(receiver: ReceiverModel): Promise<ReceiverModel> {
    return (
      await drizzleClient.insert(receivers).values(receiver).returning({
        id: receivers.id,
        pixKeyType: receivers.pixKeyType,
        pixKey: receivers.pixKey,
        email: receivers.email,
        name: receivers.name,
        registerId: receivers.registerId,
        status: receivers.status,
      })
    )[0]
  }

  async getReceivers(filters?: FiltersGetReceivers): Promise<ReceiverModel[]> {
    const wheres = []

    if (filters?.pixKey) wheres.push(eq(receivers.pixKey, filters.pixKey))
    if (filters?.pixKeyType)
      wheres.push(eq(receivers.pixKeyType, filters.pixKeyType))
    if (filters?.status) wheres.push(eq(receivers.status, filters.status))
    if (filters?.name) wheres.push(eq(receivers.name, filters.name))

    return await drizzleClient.query.receivers.findMany({
      columns: {
        createdAt: false,
        modifiedAt: false,
      },
      where: and(...wheres),
      limit: 10,
      offset: filters?.offset,
      orderBy: desc(receivers.modifiedAt),
    })
  }

  async delete(
    receiverIds: string[],
  ): Promise<DeleteReceiversRepositoryResponse> {
    if (receiverIds.length < 1) {
      return []
    }
    return await drizzleClient
      .delete(receivers)
      .where(inArray(receivers.id, receiverIds))
      .returning({ deletedReceiverId: receivers.id })
  }

  async getReceiverById(id: string): Promise<ReceiverModel | undefined> {
    return await drizzleClient.query.receivers.findFirst({
      columns: {
        createdAt: false,
        modifiedAt: false,
      },
      where: eq(receivers.id, id),
    })
  }

  async edit(
    id: string,
    editReceiverData: EditReceiverParams,
  ): Promise<ReceiverModel> {
    return (
      await drizzleClient
        .update(receivers)
        .set({
          ...editReceiverData,
          modifiedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(and(eq(receivers.id, id)))
        .returning({
          id: receivers.id,
          pixKeyType: receivers.pixKeyType,
          pixKey: receivers.pixKey,
          email: receivers.email,
          name: receivers.name,
          registerId: receivers.registerId,
          status: receivers.status,
        })
    )[0]
  }
}
