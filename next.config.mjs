/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  // Next.js 14: keep Remotion renderer on the server side only (Node.js),
  // prevents webpack from trying to bundle native OS-specific binaries.
  experimental: {
    serverComponentsExternalPackages: ['@remotion/renderer', '@remotion/bundler'],
    outputFileTracingIncludes: {
      '/api/render': [
        './src/remotion/**/*',
        './remotion.config.ts',
        './node_modules/style-loader/**/*',
      ],
    },
  },
};

export default nextConfig;
