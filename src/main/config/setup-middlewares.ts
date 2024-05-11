import { Express } from 'express'
import { bodyParser, cors, contentType, pinoLogger } from '@/main/middlewares/'

export function setupMiddlewares(app: Express): void {
  app.use(pinoLogger)
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
