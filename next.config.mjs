import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'s3.amazonaws.com',
        port:'',
        pathname:'/my-bucket/**'
      }
    ]
  }
}

export default withPayload(nextConfig)
