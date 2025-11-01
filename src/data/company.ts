import { Award, Clock, Headphones, Mail, MapPin, MessageCircle, Shield, Users } from 'lucide-react';

// 회사 기본 정보
export const companyInfo = {
  name: 'QuickSlot 예약대행',
  fullName: '주식회사 QuickSlot',
  slogan: '한 번의 클릭으로 예약의 스트레스를 해결합니다',
  description: '압도적인 예약 시스템으로 소중한 시간의 가치를 극대화합니다',
  established: '2019년',
  employees: 25,
  headquarters: '서울특별시 강남구',
  businessNumber: '123-45-67890',
  ceoName: '김대표'
};

// 프로세스 단계
export interface ProcessStep {
  step: number;
  icon: any;
  title: string;
  description: string;
  details: string[];
  color: string;
  estimatedTime: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: MessageCircle,
    title: '상담 및 예약금',
    description: '카카오톡 상담 후 대행료의 30% 예약금 결제',
    details: [
      '무료 상담으로 서비스 상세 안내',
      '예약 가능성 및 성공률 사전 분석',
      '합리적인 대행료 책정'
    ],
    color: 'bg-blue-100 text-blue-600',
    estimatedTime: '약 10-15분'
  },
  {
    step: 2,
    icon: Users,
    title: '전문 담당자 배정',
    description: '전문 담당자 배정 후 서비스 진행 일정 확정',
    details: [
      '해당 분야 전문 담당자 1:1 배정',
      '예약 일시 및 진행 방법 협의',
      '실시간 소통 채널 개설'
    ],
    color: 'bg-green-100 text-green-600',
    estimatedTime: '약 1-2시간'
  },
  {
    step: 3,
    icon: Award,
    title: '서비스 완료',
    description: '높은 성공률로 서비스 완료 시 좋은 소식 전달 및 잔액 결제',
    details: [
      '예약 성공 즉시 고객에게 알림',
      '예약 확인서 및 상세 정보 제공',
      '잔액 결제 후 서비스 완료'
    ],
    color: 'bg-purple-100 text-purple-600',
    estimatedTime: '서비스별 상이'
  }
];

// 보장 정책
export const guarantees = [
  {
    icon: Shield,
    title: '실패시 전액 환불',
    description: '낮은 확률로 대행에 실패할 경우 대행 수수료는 전액 환불을 원칙으로 합니다',
    details: '환불 처리 기간: 3-5 영업일'
  },
  {
    icon: MessageCircle,
    title: '예약 착수 전 취소 가능',
    description: '예약 착수 전에는 대행 서비스 취소가 상시 가능합니다',
    details: '취소 수수료: 없음'
  }
];

// 연락처 정보
export interface ContactMethod {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonColor: string;
  available: string;
  href?: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: MessageCircle,
    title: '카카오톡 상담',
    subtitle: '실시간 상담 가능',
    description: '카카오톡 검색: QuickSlot 예약대행',
    buttonText: '카톡 상담하기',
    buttonColor: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
    available: '24시간 상담 가능',
    href: 'https://pf.kakao.com/_QuickSlot 예약대행'
  }
];

// 사업자 정보
export const businessInfo = [
  {
    icon: Clock,
    title: '운영시간',
    content: '평일 09:00 ~ 18:00\n토요일 10:00 ~ 15:00\n일요일 및 공휴일 휴무'
  },
  {
    icon: Mail,
    title: '이메일',
    content: 'contact@xui.co.kr\n문의사항 및 제안사항\n24시간 내 답변'
  },
  {
    icon: MapPin,
    title: '주소',
    content: '서울특별시 강남구\n테헤란로 123길 45\nXUI빌딩 7층'
  },
  {
    icon: Headphones,
    title: '고객지원',
    content: '서비스 이용 문의\n기술적 문제 해결\n불만사항 접수'
  }
];

// 푸터 섹션
export const footerSections = [
  {
    title: 'QuickSlot 예약대행',
    content: [
      '압도적인 예약 시스템으로',
      '소중한 시간의 가치를 극대화합니다.'
    ]
  },
  {
    title: '서비스',
    links: [
      { label: '캠핑장 예약', href: '/services/camping' },
      { label: '콘서트 티켓팅', href: '/services/concert' },
      { label: '병원 예약', href: '/services/medical' },
      { label: '교육 신청', href: '/services/education' }
    ]
  },
  {
    title: '고객지원',
    links: [
      { label: '이용방법', href: '/process' },
      { label: '자주묻는질문', href: '/faq' },
      { label: '고객후기', href: '/reviews' },
      { label: '공지사항', href: '/notice' }
    ]
  },
  {
    title: '연락처',
    content: [
      '카카오톡: QuickSlot 예약대행',
      '이메일: contact@xui.co.kr',
      '운영시간: 평일 09:00 ~ 18:00'
    ]
  }
];

// 소셜 미디어
export const socialMedia = [
  {
    name: 'KakaoTalk',
    url: 'https://pf.kakao.com/_QuickSlot 예약대행',
    icon: 'kakao'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/xui_reservation',
    icon: 'instagram'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@xui_reservation',
    icon: 'youtube'
  },
  {
    name: 'Blog',
    url: 'https://blog.naver.com/xui_reservation',
    icon: 'blog'
  }
];

// 법적 정보
export const legalInfo = {
  privacyPolicy: '/privacy',
  termsOfService: '/terms',
  businessLicense: '/business-license',
  copyrightNotice: `© ${new Date().getFullYear()} QuickSlot 예약대행. All rights reserved.`
};