import express, { json } from 'express'
import { clientsRouter } from './routes/clients.js'
import { desechosRouter } from './routes/desechos.js'
import { recolectorRouter } from './routes/recolectores.js'
import { corsMiddleware } from './middlewares/cors.js'
import { recoverPassword } from './routes/recoverPassword.js'
import { Client } from '@googlemaps/google-maps-services-js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.post('/', (req, res) => {
  const clientes = req.body
  const direcciones = clientes.map((cliente) => {
    const direccion = `${cliente.calle} ${cliente.extN}, ${cliente.col},  ${cliente.cp}, ${cliente.city}, ${cliente.state}`
    return direccion
  })
  console.log(direcciones)

  const client = new Client({})

  client
    .geocode({
      params: {
        address: '16 de Septiembre 410, Vista Hermosa, 79010, Vista Hermosa, 79010 Cdad. Valles, S.L.P.',
        key: ''

      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0].geometry.location)
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
    })
})

app.use('/clients', clientsRouter)

app.use('/desechos', desechosRouter)

app.use('/recolectores', recolectorRouter)

app.use('/send_recovery_email', recoverPassword)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
