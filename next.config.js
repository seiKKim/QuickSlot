/** @type {import('next').NextConfig} */
const nextConfig = {
  // 실험적 기능들
  experimental: {
    // 앱 디렉토리 사용
    appDir: true,
  },
  
  // 이미지 최적화 설정
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // TypeScript 설정
  typescript: {
    // 빌드 시 타입 에러가 있어도 빌드 계속 진행 (개발 중에만)
    ignoreBuildErrors: false,
  },
  
  // ESLint 설정
  eslint: {
    // 빌드 시 ESLint 에러가 있어도 빌드 계속 진행 (개발 중에만)
    ignoreDuringBuilds: false,
  },
  
  // 환경 변수 설정
  env: {
    CUSTOM_KEY: 'my-value',
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      // 필요한 리다이렉트 규칙들
    ]
  },
  
  // 재작성 설정
  async rewrites() {
    return [
      // 필요한 재작성 규칙들
    ]
  }
}

module.exports = nextConfig