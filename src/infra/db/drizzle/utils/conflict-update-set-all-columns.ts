import { sql } from 'drizzle-orm'
import { PgUpdateSetSource, PgTable } from 'drizzle-orm/pg-core'
import { getTableColumns } from 'drizzle-orm'
import { getTableConfig } from 'drizzle-orm/pg-core'

export function conflictUpdateSetAllColumns<TTable extends PgTable>(
  table: TTable,
): PgUpdateSetSource<TTable> {
  const columns = getTableColumns(table)
  const { name: tableName } = getTableConfig(table)
  const conflictUpdateSet = Object.entries(columns).reduce(
    (acc, [columnName, columnInfo]) => {
      if (!columnInfo.default) {
        // @ts-ignore
        acc[columnName] = sql.raw(
          `COALESCE(excluded.${columnInfo.name}, ${tableName}.${columnInfo.name})`,
        )
      }
      return acc
    },
    {},
  ) as PgUpdateSetSource<TTable>
  return conflictUpdateSet
}
