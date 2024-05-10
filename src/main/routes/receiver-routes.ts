import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeCreateReceiverController } from '../factories/controllers/make-create-receiver-controller'
import { makeGetReceiversController } from '../factories/controllers/make-get-receivers-controller'

export function receiverRoutes(router: Router) {
  const createReceiverController = adaptRoute(makeCreateReceiverController())
  const getReceivers = adaptRoute(makeGetReceiversController())
  router.get('/receivers', getReceivers)
  router.post('/receivers', createReceiverController)
}
