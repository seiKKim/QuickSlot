import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuickSlot 예약대행 - 한 번의 클릭으로 예약의 스트레스를 해결합니다',
  description: '캠핑장, 콘서트, 병원 예약까지 - 모든 선착순 예약을 완벽하게 대행합니다. 99.2% 성공률과 전문적인 서비스로 소중한 시간을 절약하세요.',
  keywords: '예약대행, 캠핑장예약, 콘서트티켓팅, 병원예약, 온라인예약, 선착순예약, 예약대행서비스, 티켓팅대행, 병원예약대행',
  authors: [{ name: 'QuickSlot 예약대행' }],
  creator: 'QuickSlot 예약대행',
  publisher: 'QuickSlot 예약대행',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quick-slot-ochre.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'QuickSlot 예약대행 - 전문 예약 대행 서비스',
    description: '압도적인 예약 시스템으로 소중한 시간의 가치를 극대화합니다. 99.2% 성공률 보장!',
    url: 'https://quick-slot-ochre.vercel.app',
    siteName: 'QuickSlot 예약대행',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QuickSlot 예약대행 - 전문 예약 대행 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickSlot 예약대행 - 전문 예약 대행 서비스',
    description: '압도적인 예약 시스템으로 소중한 시간의 가치를 극대화합니다. 99.2% 성공률 보장!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 구글 사이트 인증 코드 (Google Search Console에서 발급받은 코드로 교체 필요)
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  other: {
    // 네이버 서치어드바이저 인증 코드
    'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 구조화된 데이터 (Schema.org JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QuickSlot 예약대행',
    description: '전문 예약 대행 서비스 - 캠핑장, 콘서트, 교육 신청까지 모든 선착순 예약을 완벽하게 대행합니다',
    url: 'https://quick-slot-ochre.vercel.app',
    logo: 'https://quick-slot-ochre.vercel.app/icons/logo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '1588-0000',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: 'Korean'
    },
    sameAs: [
      'https://open.kakao.com/o/soQDqKJh'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247'
    }
  };

  // 웹사이트 구조화된 데이터
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QuickSlot 예약대행',
    url: 'https://quick-slot-ochre.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://quick-slot-ochre.vercel.app/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="ko">
      <head>
        {/* 구조화된 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}