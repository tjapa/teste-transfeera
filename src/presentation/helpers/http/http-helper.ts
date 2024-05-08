import { HttpResponse } from '@/presentation/protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: 'Internal server error',
})
