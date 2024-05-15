import { Router } from 'express'
import { RecolectorController } from '../controllers/recolectores.js'

export const recolectorRouter = Router()

recolectorRouter.post('/', RecolectorController.create)
