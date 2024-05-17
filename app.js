import express, { json } from 'express'
import { clientsRouter } from './routes/clients.js'
import { desechosRouter } from './routes/desechos.js'
import { recolectorRouter } from './routes/recolectores.js'
import { corsMiddleware } from './middlewares/cors.js'
import { recoverPassword } from './routes/recoverPassword.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {

})

app.use('/clients', clientsRouter)

app.use('/desechos', desechosRouter)

app.use('/recolectores', recolectorRouter)

app.use('/send_recovery_email', recoverPassword)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
