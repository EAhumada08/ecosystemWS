import express, { json } from 'express'
import { clientsRouter } from './routes/clients.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json('hola')
})

app.use('/clients', clientsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
