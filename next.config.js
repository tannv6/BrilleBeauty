/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5500",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
