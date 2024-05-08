import { runMigrations } from './run-migrations'
import 'dotenv/config'

const postgresDbUrl =
  process.env.POSTGRES_DB_URL ??
  'postgresql://postgres:postgres@127.0.0.1:5432/postgres'

runMigrations(postgresDbUrl).then()
