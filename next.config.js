/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Ensure trailing slash to maintain compatibility with existing URLs */
  trailingSlash: true,
  /* Configure redirects for backward compatibility */
  async redirects() {
    return [
      {
        source: '/writing/:slug.html',
        destination: '/writing/:slug',
        permanent: true,
      },
      {
        source: '/xw/:slug.html',
        destination: '/xw/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
