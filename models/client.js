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
    const [client] = await run.query('SELECT firstname,lastname,email,pass,tel,calle,extN,intN,col,cp,city,state from users WHERE id = ?; ',
      [id]
    )

    if ([client].length === 0) return null

    return client[0]
  }

  static async validate ({ user, pass }) {
    if (user && pass) {
      const [client] = await run.query('SELECT id, rol FROM users where email = ? && pass = ?',
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
    const [client] = await run.query('SELECT email FROM users WHERE email=?',
      [email]
    )
    console.log(client.length, client)

    if (client.length > 0) return false
    else {
      try {
        await run.query('INSERT INTO users (firstname,lastname,email, pass, tel, calle, extN, intN, col, cp, city, state, rol) VALUES (?, ?, ?, ?,?,?, ?, ?, ?,?,?,?,?)',
          [name, lastname, email, password, tel, street, numi, numex, col, cp, municipio, state, 'cliente'])
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
      await run.query('UPDATE users SET firstname=?, lastname=?, email=?, pass=?, tel=?, calle=?, extN=?, intN=?, col=?, cp=?, city=?, state=? WHERE id = ?; ',
        [firstname, lastname, email, pass, tel, calle, extN, intN, col, cp, state, city, id]
      )
    } catch (error) {
      throw new Error('Error updating client')
    }

    const [client] = await run.query('SELECT * from users WHERE id=?',
      [id]
    )

    return client[0]
  }

  static async getDesechos ({ id }) {
    const [desechos] = await run.query(`SELECT CD.cliente_id, CD.desecho_id, D.name AS 'producto',  CD.costo,  CD.estado, CD.prog_date   
    from cliente_desecho CD JOIN desecho D ON CD.desecho_id = D.numSerie  WHERE CD.cliente_id=?; `,
    [id]
    )
    console.log(desechos)
    return desechos
  }
}
