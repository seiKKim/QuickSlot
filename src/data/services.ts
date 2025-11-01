import { GraduationCap, Music, Stethoscope, Tent } from 'lucide-react';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: any; // Lucide React 아이콘
  description: string;
  features: string[];
  details: string;
  price: {
    basic: number;
    premium: number;
  };
  successRate: number;
  averageTime: string;
  supportedPlatforms: string[];
}

export const services: Record<string, ServiceDetail> = {
  camping: {
    id: 'camping',
    title: '캠핑장 예약',
    icon: Tent,
    description: '인기 캠핑장의 선착순 예약을 대행해드립니다',
    features: [
      '실시간 모니터링을 통한 정확한 예약 시점 파악',
      '높은 성공률을 자랑하는 전문 예약 시스템',
      '24시간 대기 상태로 최적의 타이밍 확보'
    ],
    details: '국립공원, 지자체 운영 캠핑장 등 예약이 어려운 인기 캠핑장의 선착순 예약을 전문적으로 대행합니다. 실시간 모니터링 시스템으로 정확한 예약 오픈 시간을 파악하여 최고의 성공률을 보장합니다.',
    price: {
      basic: 30000,
      premium: 50000
    },
    successRate: 98.5,
    averageTime: '평균 2-3일',
    supportedPlatforms: [
      '국립공원공단 통합예약시스템',
      '경기도 캠핑장 예약시스템',
      '각 지자체별 캠핑장 사이트',
      '민간 캠핑장 예약 플랫폼'
    ]
  },
  concert: {
    id: 'concert',
    title: '콘서트 티켓팅',
    icon: Music,
    description: '인기 콘서트 및 공연 티켓 예약을 전문적으로 대행합니다',
    features: [
      '전문 티켓팅 시스템으로 동시 접속 최적화',
      '대기열 관리 및 우선순위 확보 전략',
      '실패시 전액환불 보장으로 안심 서비스'
    ],
    details: '인터파크, 예스24, 멜론티켓 등 주요 티켓팅 사이트의 콘서트, 뮤지컬, 연극 등 모든 공연 예약을 대행합니다. 고도화된 티켓팅 전략과 기술력으로 높은 성공률을 자랑합니다.',
    price: {
      basic: 50000,
      premium: 80000
    },
    successRate: 94.2,
    averageTime: '즉시 (오픈 당일)',
    supportedPlatforms: [
      '인터파크 티켓',
      '예스24 티켓',
      '멜론티켓',
      '티켓링크',
      '세종문화회관',
      '롯데콘서트홀'
    ]
  },
  medical: {
    id: 'medical',
    title: '병원 예약',
    icon: Stethoscope,
    description: '예약이 어려운 병원 진료 예약을 대행해드립니다',
    features: [
      '의료진 스케줄 분석을 통한 최적 예약 시간 선택',
      '응급 예약이 필요한 경우 우선 처리',
      '병원별 예약 시스템 특성을 고려한 맞춤 전략'
    ],
    details: '대학병원, 전문병원 등 예약이 어려운 의료기관의 진료 예약을 신속하고 정확하게 처리해드립니다. 각 병원의 예약 시스템과 의료진 스케줄을 분석하여 최적의 예약 시간을 확보합니다.',
    price: {
      basic: 25000,
      premium: 40000
    },
    successRate: 96.8,
    averageTime: '당일 ~ 3일',
    supportedPlatforms: [
      '서울대학교병원',
      '연세대학교 세브란스병원',
      '삼성서울병원',
      '서울아산병원',
      '각 지역 대학병원',
      '전문 클리닉'
    ]
  },
  education: {
    id: 'education',
    title: '교육 신청',
    icon: GraduationCap,
    description: '수강신청, 교육과정 등록을 신속하게 처리합니다',
    features: [
      '수강신청 알고리즘 분석을 통한 성공률 극대화',
      '동시 신청 처리로 여러 과목 한번에 등록',
      '대기열 관리 및 추가 모집 시 자동 신청'
    ],
    details: '대학교 수강신청, 평생교육원, 직업훈련기관 등 각종 교육과정 신청을 전문적으로 대행합니다. 복잡한 수강신청 시스템을 분석하여 원하는 강의를 확실하게 등록해드립니다.',
    price: {
      basic: 20000,
      premium: 35000
    },
    successRate: 99.1,
    averageTime: '수강신청 당일',
    supportedPlatforms: [
      '대학교 수강신청 시스템',
      '사이버대학교',
      '평생교육원',
      '직업능력개발원',
      '온라인 교육 플랫폼',
      '자격증 교육기관'
    ]
  }
};

// 서비스 리스트 (순서 있음)
export const servicesList = [
  services.camping,
  services.concert,
  services.medical,
  services.education
];

// 서비스별 특징
export const serviceFeatures = [
  {
    title: '전문 담당자 1:1 배정',
    description: '각 분야별 전문 지식을 갖춘 담당자가 직접 서비스를 진행합니다'
  },
  {
    title: '실패시 전액 환불 보장',
    description: '예약에 실패할 경우 대행료는 전액 환불해드립니다'
  },
  {
    title: '실시간 진행상황 공유',
    description: '예약 진행 과정을 실시간으로 확인하실 수 있습니다'
  },
  {
    title: '24시간 고객 지원',
    description: '언제든지 문의하실 수 있는 상담 서비스를 제공합니다'
  }
];

// 가격 정책
export const pricingPolicy = {
  deposit: 0.3, // 30% 예약금
  refundPolicy: '예약 실패시 100% 환불',
  paymentMethods: ['카드결제', '계좌이체', '카카오페이', '네이버페이'],
  additionalFees: {
    urgentService: 0.5, // 긴급 서비스 50% 추가
    holidayService: 0.3, // 휴일 서비스 30% 추가
    multipleReservation: 0.2 // 다중 예약 20% 할인
  }
};