import { ValueErrorIterator } from '@sinclair/typebox/build/cjs/value'

export const getInvalidParamsFromTypeBox = (
  errors: ValueErrorIterator,
): string => {
  const invalidParams = []
  for (const error of errors) {
    invalidParams.push({ path: error.path, message: error.message })
  }
  return JSON.stringify(invalidParams)
}
