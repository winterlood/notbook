const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/blog",
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABSE_ID: process.env.NOTION_DATABSE_ID,
    NOTION_HOMEPAGE_ID: process.env.NOTION_HOMEPAGE_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_USER: process.env.GITHUB_USER,
    REPO_NAME: process.env.REPO_NAME,
    WORKFLOW_ID: process.env.WORKFLOW_ID,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    loader: 'akamai',
    path: ''
  }
};

// module.exports = withPlugins([], nextConfig);

module.exports = () => {
  const plugins = [withBundleAnalyzer];
  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
  return config;
};
