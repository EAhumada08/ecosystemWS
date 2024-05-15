import { ClientModel } from '../models/client.js'

export class ClientController {
  static async getById (req, res) {
    const { id } = req.params

    const client = await ClientModel.getByID({ id })

    if (client) return res.json(client)
    res.status(404).json({ message: 'Not found' })
  }

  static async validate (req, res) {
    const { user, pass } = req.body
    const client = await ClientModel.validate({ user, pass })
    if (client) return res.status(200).json({ message: 'datos correctos', client })
    res.status(404).json({ message: 'Correo o contrasena incorrectos' })
  }

  static async create (req, res) {
    const result = req.body
    const newClient = await ClientModel.create({ input: result })
    if (newClient === false) res.status(400).json({ message: 'Este correo ya esta registrado' })
    else { res.status(201).json({ message: 'Cliente creado con exito' }) }
  }

  static async update (req, res) {
    const client = req.body
    const { id } = req.params

    const updateClient = await ClientModel.update({ id, input: client })

    return res.json(updateClient)
  }

  static async getDesechos (req, res) {
    const { id } = req.params

    const desechos = await ClientModel.getDesechos({ id })

    res.json(desechos)
  }
}
