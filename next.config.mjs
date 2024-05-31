/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname:"asdasdasd.com"
      }
    ],
  },
};

export default nextConfig;
