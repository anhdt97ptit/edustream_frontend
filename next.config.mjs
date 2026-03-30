/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b47763af90fb44a5b47e188ed09542b1.r2.dev",
      },
    ],
  },
}

export default nextConfig
