'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

function postLocalAPI(data: any) {
  return payload.create({
    collection: 'pacientes',
    data: data,
  })
}

export { postLocalAPI }
