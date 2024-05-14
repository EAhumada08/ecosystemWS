import mysql from 'mysql2/promise'
import { formatoFecha } from '../functions/getDate.js'
import { getDistance } from '../services/matrixDistance.js'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'ea_08',
  port: '3306',
  database: 'ecosystem'
}

const run = await mysql.createConnection(config)

export class DesechoModel {
  static async create ({ idClient, input }) {
    const {
      color,
      numSerie,
      name,
      marca,
      model,
      peso,
      date,
      estado
    } = input

    const hoy = new Date()
    const regDate = formatoFecha(hoy, 'yy/mm/dd')
    console.log(regDate)

    const [dataDir] = await run.query('SELECT calle, extN, intN, col, cp, city, state from clients where id = ?',
      [idClient]
    )
    const [{ calle, extN, intN, col, cp, city, state }] = dataDir

    const address = `${calle}, ${extN} , ${col}, ${cp}, ${city}, ${state}`

    const distance = await getDistance(address)
    const distanceKM = distance / 1000
    console.log(distanceKM)

    /*
    try {
      run.query('INSERT INTO desecho (numSerie, name, marca, model, color, peso, acqDate, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [numSerie, name, marca, model, color, peso, date, estado])
    } catch (error) {
      console.log(error)
    } */

    /*
    try {
      run.query('INSERT INTO cliente_desecho (cliente_id, desecho_id, reg_date, kms, costo, estado, prog_date) VALUES (?,?,?,?,?,?,?)')
    } catch (error) {
      console.log(error)
    } */
  }
}
