const withAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	images: {
		domains: ['drive.google.com']
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	}
}

module.exports = withAnalyzer(nextConfig) 
