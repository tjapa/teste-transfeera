import { pgTable, uuid, varchar, pgEnum, timestamp } from 'drizzle-orm/pg-core'

export const receiverStatusEnum = pgEnum('receiver_status', [
  'RASCUNHO',
  'VALIDADO',
])

export const pixKeyTypeEnum = pgEnum('pix_key_type', [
  'CPF',
  'CNPJ',
  'EMAIL',
  'TELEFONE',
  'CHAVE_ALEATORIA',
])

export const receivers = pgTable('receivers', {
  id: uuid('id').primaryKey().notNull(),
  registerId: varchar('register_id', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  pixKey: varchar('pix_key', { length: 255 }).notNull(),
  pixKeyType: pixKeyTypeEnum('pix_key_type').notNull(),
  status: receiverStatusEnum('status').notNull(),
  createdAt: timestamp('created_at', {
    precision: 6,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
  modifiedAt: timestamp('modified_at', {
    precision: 6,
    mode: 'string',
  })
    .defaultNow()
    .notNull(),
})
