import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'ea_08',
  port: '3306',
  database: 'ecosystem'
}

const run = await mysql.createConnection(config)

export class RecolectorModel {
  static async create ({ input }) {
    const {
      claveTrabajador,
      responsable,
      firstname,
      lastname,
      email,
      pass,
      confirm,
      tel,
      calle,
      extN,
      intN,
      col,
      cp,
      state,
      city
    } = input

    const [client] = await run.query('SELECT email FROM users WHERE email=?',
      [email]
    )
    if (client.length > 0) return false

    else {
      try {
        const [newClient] = await run.query('INSERT INTO users (firstname,lastname, email, pass, tel, calle, extN, intN, col, cp, city, state, rol) VALUES (?, ?, ?, ?,?,?, ?, ?, ?,?,?,?,?)',
          [firstname, lastname, email, pass, tel, calle, extN, intN, col, cp, city, state, 'recolector'])
        console.log(newClient)
        const [data] = await run.query('SELECT id FROM users WHERE email = ?', [email])
        const [{ id }] = data
        console.log(id)

        await run.query('INSERT INTO recolector (user_id, clave_trabajador, responsable) VALUES (?,?,?)',
          [id, claveTrabajador, responsable])
      } catch (error) {
        throw new Error('Error creating recolector')
      }
    }
  }
}
