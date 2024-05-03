import { Router } from 'express'
import { ClientController } from '../controllers/clients.js'

export const clientsRouter = Router()

clientsRouter.get('/', ClientController.validate)

clientsRouter.post('/', ClientController.create)
