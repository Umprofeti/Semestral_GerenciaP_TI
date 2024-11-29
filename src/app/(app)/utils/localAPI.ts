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


async function submitMedia(data) {
  const mediaData = {
      alt: data.get('alt'),
      filename: data.get('file')?.name || null,
      mimeType: data.get('file')?.type || null,
      filesize: data.get('file')?.size || null,
      updatedAt: '2024-11-28T16:59:55.212Z',
      createdAt: '2024-11-28T16:59:55.212Z',

      // Otros campos opcionales se pueden dejar como null o no incluirse si no se tienen datos
  };

  return await payload.create({
      collection: 'media',
      data: mediaData
  });
}


export { postLocalAPI,submitMedia }