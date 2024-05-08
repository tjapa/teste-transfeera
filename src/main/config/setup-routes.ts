import { Express, Router } from 'express'
import { allRoutes } from '../routes/all-routes'

export function setupRoutes(app: Express) {
  const router = Router()
  app.use('/api', router)
  allRoutes.forEach((route) => {
    route(router)
  })
}
