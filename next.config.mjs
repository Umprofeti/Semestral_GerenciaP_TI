import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**'
      },
      {
        protocol: 'http', // localhost suele usar HTTP
        hostname: 'localhost',
        port: '3000', // Puerto por defecto para localhost en desarrollo
        pathname: '/**' // Ajusta el pathname si necesitas mayor especificidad
      }
    ]
  }
}

export default withPayload(nextConfig)
