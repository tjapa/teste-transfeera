import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeCreateReceiverController } from '../factories/controllers/make-create-receiver-controller'

export function receiverRoutes(router: Router) {
  const createReceiverController = adaptRoute(makeCreateReceiverController())
  router.post('/receivers', createReceiverController)
}
