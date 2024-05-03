import { ClientModel } from '../models/client.js'
import { validateClient } from '../schemas/clients.js'

export class ClientController {
  static async validate (req, res) {
    const { user, pass } = req.query
    const client = await ClientModel.validate({ user, pass })
    if (client) return res.status(200).json({ message: 'datos correctos' })
    res.status(404).json({ message: 'Usuario no existente' })
  }

  static async create (req, res) {
    const result = validateClient(req.body)
    if (result.success) {
      const newClient = await ClientModel.create({ input: result.data })
      if (newClient === false) res.status(400).json({ message: 'Este correo ya esta registrado' })
      else { res.status(201).json({ message: 'Cliente creado con exito' }) }
    } else return res.status(400).json(result.error)
  }
}
