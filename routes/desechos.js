import { DesechoController } from '../controllers/desechos.js'
import { Router } from 'express'

export const desechosRouter = Router()

desechosRouter.post('/', DesechoController.create)

desechosRouter.get('/', DesechoController.getAll)
