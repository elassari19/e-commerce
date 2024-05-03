/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com"
    ]
  }
}

module.exports = nextConfig
