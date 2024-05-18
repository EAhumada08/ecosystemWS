import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export const getDistance = async (address) => {
  const data = await client
    .distancematrix({
      params: {
        origins: ['16 de Septiembre 410, Vista Hermosa, 79010, Vista Hermosa, 79010 Cdad. Valles, S.L.P.'],
        destinations: [address],
        key: '',
        mode: { TravelMode: 'driving' }
      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      return r.data.rows[0].elements[0].distance.value
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
    })

  return data
}
