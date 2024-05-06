import zod from 'zod'

const clientSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(5, {
    message: 'La contrasena contener al menos 5 caracteres'
  }),
  tel: zod.string().length(10, {
    message: 'El numero telefonico debe contener 10 digitos'
  })
})

export function validateClient (object) {
  return clientSchema.safeParse(object)
}
