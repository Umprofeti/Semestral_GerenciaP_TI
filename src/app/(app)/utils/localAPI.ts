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


function postImageLocal(dataImage:File){

  return payload.create({
    collection:'media',
    data:{
      alt:'prueba',
    },
  })
}

export { postLocalAPI, postImageLocal}