/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first (40-50% smaller than WebP), fallback WebP
    formats: ['image/avif', 'image/webp'],
    // Device breakpoints matching the site's responsive design
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Sizes for fixed-layout images (thumbnails, icons)
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year (photos don't change often)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
