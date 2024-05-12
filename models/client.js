import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'ea_08',
  port: '3306',
  database: 'ecosystem'
}

const run = await mysql.createConnection(config)

export class ClientModel {
  static async getByID ({ id }) {
    const [client] = await run.query('SELECT firstname,lastname,email,pass,tel,calle,extN,intN,col,cp,city,state from clients WHERE id = ?; ',
      [id]
    )

    if ([client].length === 0) return null

    return client[0]
  }

  static async validate ({ user, pass }) {
    if (user && pass) {
      const [client] = await run.query('SELECT id FROM clients where email = ? && pass = ?',
        [user, pass])
      console.log(client)
      if ([client].length === 0) return null
      return client[0]
    }
  }

  static async create ({ input }) {
    const {
      name,
      lastname,
      sexo,
      email,
      password,
      tel,
      street,
      numi,
      numex,
      col,
      cp,
      municipio,
      state
    } = input

    console.log(input)
    const [client] = await run.query('SELECT email FROM clients WHERE email=?',
      [email]
    )
    console.log(client.length, client)

    if (client.length > 0) return false
    else {
      try {
        await run.query('INSERT INTO clients (firstname,lastname,sexo, email, pass, tel, calle, extN, intN,col,cp,city,state) VALUES (?, ?, ?, ?,?,?, ?, ?, ?,?,?,?,?)',
          [name, lastname, sexo, email, password, tel, street, numi, numex, col, cp, municipio, state])
      } catch (error) {
        throw new Error('Error creating client')
      }
    }
  }

  static async update ({ id, input }) {
    const {
      firstname,
      lastname,
      email,
      pass,
      tel,
      calle,
      extN,
      intN,
      col,
      cp,
      state,
      city
    } = input

    try {
      await run.query('UPDATE clients SET firstname=?, lastname=?, email=?, pass=?, tel=?, calle=?, extN=?, intN=?, col=?, cp=?, city=?, state=? WHERE id = ?; ',
        [firstname, lastname, email, pass, tel, calle, extN, intN, col, cp, state, city, id]
      )
    } catch (error) {
      throw new Error('Error updating client')
    }

    const [client] = await run.query('SELECT * from clients WHERE id=?',
      [id]
    )

    return client[0]
  }
}
