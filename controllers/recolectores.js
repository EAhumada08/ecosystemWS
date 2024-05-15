import { RecolectorModel } from '../models/recolector.js'

export class RecolectorController {
  static async create (req, res) {
    const data = req.body

    const newRecolector = await RecolectorModel.create({ input: data })
    if (newRecolector === false) res.status(400).json({ message: 'Este correo ya esta registrado' })

    res.status(201).json({ message: 'Recolector registrado' })
  }
}
