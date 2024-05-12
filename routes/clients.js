import { Router } from 'express'
import { ClientController } from '../controllers/clients.js'
import { Client } from '@googlemaps/google-maps-services-js'

export const clientsRouter = Router()

clientsRouter.post('/login', ClientController.validate)

clientsRouter.post('/', ClientController.create)

clientsRouter.get('/:id', ClientController.getById)

clientsRouter.patch('/:id', ClientController.update)

// API Google Mpas
clientsRouter.get('/rutas', (req, res) => {
  const client = new Client({})

  client
    .geocode({

      params: {
        place_id: 'ChIJfVFHrM0LkkYRBzUQos_jR5w'
      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0])
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
    })
})
