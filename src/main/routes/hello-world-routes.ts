import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeHelloWorldController } from '../factories/controllers/make-hello-world-controller'

export function helloWorldRoutes(router: Router) {
  const helloWorldController = adaptRoute(makeHelloWorldController())
  router.get('/hello-world', helloWorldController)
}
