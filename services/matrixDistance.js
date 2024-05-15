import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export const getDistance = async (address) => {
  const data = await client
    .distancematrix({
      params: {
        origins: ['Carretera al Ingenio Plan de Ayala Vista Hermosa, 79010 Cdad. Valles, S.L.P.'],
        destinations: [address],
        key: 'AIzaSyDQz8J0BxeGNcIS6g1R5z7Lx6TKBbBXdBE',
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
