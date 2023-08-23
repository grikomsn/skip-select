// @ts-check

let APP_URL;
if (process.env.APP_URL) {
  APP_URL = process.env.APP_URL;
} else if (process.env.VERCEL) {
  APP_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
} else {
  APP_URL = `${process.env.PROTOCOL || "http"}://${process.env.HOST || "localhost"}:${process.env.PORT || 3000}`;
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    APP_URL: APP_URL || "",
  },
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/overview",
      permanent: true,
    },
    {
      source: "/validators",
      destination: "/validators/osmosis",
      permanent: true,
    },
  ],
  rewrites: async () => [],
  swcMinify: true,
  trailingSlash: false,
  transpilePackages: [],
  webpack: (config, { dev, isServer }) => {
    return config;
  },
};

export default nextConfig;
