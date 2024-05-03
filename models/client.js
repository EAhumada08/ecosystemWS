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
  static async validate ({ user, pass }) {
    if (user && pass) {
      const [client] = await run.query('SELECT * FROM clients where email = ? && password = ?',
        [user, pass])

      if ([client].length === 0) return null
      return client[0]
    }
  }

  static async create ({ input }) {
    const {
      name,
      email,
      password,
      tel
    } = input

    const [client] = await run.query('SELECT email FROM clients WHERE email=?',
      [email]
    )
    console.log(client.length, client)

    if (client.length > 0) return false
    else {
      try {
        await run.query('INSERT INTO clients (name, email, password, tel) VALUES (?, ?, ?, ?);',
          [name, email, password, tel])
      } catch (error) {
        throw new Error('Error creating Movie')
      }
    }
  }
}
