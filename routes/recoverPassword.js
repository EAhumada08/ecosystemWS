import { Router } from 'express'
import nodemailer from 'nodemailer'

export const recoverPassword = Router()

function sendEmail ({ userEmail, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'prograweb01@gmail.com',
        pass: 'feufjocvjsjntuua'
      }
    })

    const config = {
      from: 'prograweb01@gmail.com',
      to: userEmail,
      subject: 'Recuperación de contraseña',
      html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ecosystem</a>
      </div>
      <p style="font-size:1.1em">Hola,</p>
      <p>Gracias por escoger Ecosystem. Usa el siguiente codigo para completar el proceso de recuperacion de tu contraseña. </p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Saludos,<br />Ecosystem</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`
    }
    transporter.sendMail(config, function (error, info) {
      if (error) {
        console.log(error)
        return reject(new Error('An error has occured'))
      }
      return resolve({ message: 'Email sent succesfuly' })
    })
  })
}

recoverPassword.post('/', (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})
