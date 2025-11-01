// src/components/seo/StructuredData.tsx
'use client';

export default function StructuredData() {
  // 구조화된 데이터 (Schema.org JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QuickSlot 예약대행',
    description: '전문 예약 대행 서비스 - 캠핑장, 콘서트, 병원 예약까지 모든 선착순 예약을 완벽하게 대행합니다',
    url: 'https://quickslot.co.kr',
    logo: 'https://quickslot.co.kr/icons/logo.svg',
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'QuickSlot 예약대행 서비스',
    description: '캠핑장, 콘서트, 병원, 교육 신청 등 모든 예약 대행 서비스',
    provider: {
      '@type': 'Organization',
      name: 'QuickSlot 예약대행'
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Korea'
    },
    serviceType: '예약 대행 서비스',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://quickslot.co.kr',
      servicePhone: '1588-0000'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

