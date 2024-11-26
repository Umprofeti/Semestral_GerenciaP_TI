'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export async function loginFetch(data: any) {
  const result = payload.login({
    collection: 'pacientes',
    data: data,
  })
}

export async function authUser() {
  const result = await payload.verifyEmail({
    collection: 'pacientes',
    token: `_verificationToken`,
  })
}
