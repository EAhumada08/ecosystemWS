import { DesechoModel } from '../models/desecho.js'

export class DesechoController {
  static async create (req, res) {
    const { idClient } = req.body
    const { data } = req.body

    const newDesecho = await DesechoModel.create({ idClient, input: data })
  }
}
