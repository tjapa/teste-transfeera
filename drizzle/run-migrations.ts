import { DrizzleConfig } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

export async function runMigrations(
  postgresDbUrl: string,
  postgresConfig?: postgres.Options<{}>,
  drizzleConfig?: DrizzleConfig,
) {
  const sql = postgres(postgresDbUrl, { max: 1, ...postgresConfig })
  const db = drizzle(sql, drizzleConfig)
  await migrate(db, { migrationsFolder: 'drizzle/migrations' })
  await sql.file('drizzle/custom-sql/insert-receivers.sql')
  await sql.end()
}
