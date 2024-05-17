import { Router } from 'express'
import { ClientController } from '../controllers/clients.js'

export const clientsRouter = Router()

clientsRouter.post('/login', ClientController.validate)

clientsRouter.post('/validateemail', ClientController.validateEmail)

clientsRouter.post('/', ClientController.create)

clientsRouter.get('/:id', ClientController.getById)

clientsRouter.patch('/:id', ClientController.update)

clientsRouter.patch('/resetpass/:id', ClientController.resetPassword)

clientsRouter.get('/desechos/:id', ClientController.getDesechos)
