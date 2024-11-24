// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Especialidad } from './collections/Especialidades'
import { Doctores } from './collections/Doctor'
import { Pacientes } from './collections/Pacientes'
import { Citas } from './collections/Citas'
import { Expedientes } from './collections/Expedientes'
import {s3Adapter} from '@payloadcms/plugin-cloud-storage/s3'
import {cloudStoragePlugin  } from '@payloadcms/plugin-cloud-storage'
import {nodemailerAdapter } from '@payloadcms/email-nodemailer'
import {resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


const minioAdapter = s3Adapter({
  acl: 'private',
  config:{
    endpoint: process.env.MINIO_ENDPOINT || '',
    credentials:{
      accessKeyId: process.env.MINIO_ACCESS_KEY || '',
      secretAccessKey: process.env.MINIO_SECRET_KEY || '',
    },
    forcePathStyle: true,
    region: process.env.MINIO_REGION,
  },
  bucket: process.env.MINIO_BUCKET || ''
})


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Especialidad, Doctores, Pacientes, Citas, Expedientes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: 'info@skiatel.com',
    defaultFromName: 'PayloadCMS',
    apiKey: process.env.RESEND_API_KEY,
  }),
  plugins: [
    cloudStoragePlugin({
    collections: {
      'media':{
        adapter: minioAdapter,
      }
    },
    enabled: true
  })
  ],
})
