import { Router } from 'express'
import { ClientController } from '../controllers/clients.js'

export const clientsRouter = Router()

clientsRouter.post('/login', ClientController.validate)

clientsRouter.post('/', ClientController.create)

clientsRouter.get('/:id', ClientController.getById)

clientsRouter.patch('/:id', ClientController.update)
