/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/gtm.js",
        destination: "https://www.googletagmanager.com/gtm.js",
      },
      {
        source: "/gtm/ns.html",
        destination: "https://www.googletagmanager.com/ns.html",
      },
      {
        source: "/gtag/js",
        destination: "https://www.googletagmanager.com/gtag/js",
      },
    ];
  },
};

module.exports = nextConfig;
