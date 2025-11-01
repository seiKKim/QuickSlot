export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  isPopular: boolean;
  relatedFAQs?: number[];
}

export const faqs: FAQ[] = [
  {
    id: 1,
    category: '서비스 일반',
    question: '예약 성공률이 정말 99.2%인가요?',
    answer: '네, 전문적인 시스템과 숙련된 담당자를 통해 높은 성공률을 유지하고 있습니다. 이는 최근 6개월간의 실제 통계이며, 서비스별로 약간의 차이가 있을 수 있습니다. 캠핑장 98.5%, 교육신청 99.1%, 병원예약 96.8%, 콘서트 94.2%의 성공률을 기록하고 있습니다.',
    tags: ['성공률', '통계', '서비스품질'],
    isPopular: true,
    relatedFAQs: [2, 8]
  },
  {
    id: 2,
    category: '요금 및 결제',
    question: '대행료는 어떻게 결정되나요?',
    answer: '대행료는 예약 난이도, 소요 시간, 성공률, 플랫폼 특성 등을 종합적으로 고려하여 합리적으로 책정됩니다. 기본료는 서비스별로 2만원~8만원 사이이며, 긴급 처리나 휴일 서비스의 경우 추가 요금이 발생할 수 있습니다. 정확한 견적은 상담을 통해 안내해드립니다.',
    tags: ['요금', '가격', '견적'],
    isPopular: true,
    relatedFAQs: [3, 4]
  },
  {
    id: 3,
    category: '요금 및 결제',
    question: '실패시 정말 전액 환불되나요?',
    answer: '네, 예약에 실패할 경우 대행 수수료는 전액 환불해드립니다. 단, 고객님의 요청으로 서비스가 중단된 경우나 잘못된 정보 제공으로 인한 실패는 환불 대상에서 제외될 수 있습니다. 환불은 서비스 실패 확정 후 3-5 영업일 내에 원결제 수단으로 처리됩니다.',
    tags: ['환불', '보장', '정책'],
    isPopular: true,
    relatedFAQs: [2, 9]
  },
  {
    id: 4,
    category: '요금 및 결제',
    question: '예약금은 언제, 얼마나 결제하나요?',
    answer: '서비스 착수 전에 전체 대행료의 30%를 예약금으로 결제하시면 됩니다. 예약 성공 후 잔액 70%를 결제하시면 서비스가 완료됩니다. 결제 방법은 카드결제, 계좌이체, 카카오페이, 네이버페이를 지원합니다.',
    tags: ['예약금', '결제방법', '결제시기'],
    isPopular: false,
    relatedFAQs: [2, 3]
  },
  {
    id: 5,
    category: '서비스 이용',
    question: '어떤 캠핑장까지 예약 가능한가요?',
    answer: '국립공원 캠핑장, 각 지자체 운영 캠핑장, 민간 캠핑장까지 온라인으로 예약 가능한 모든 캠핑장을 대행합니다. 국립공원공단 통합예약시스템, 경기도 캠핑장 예약시스템 등 주요 플랫폼을 모두 지원하며, 특정 캠핑장의 예약 가능 여부는 사전 상담을 통해 확인해드립니다.',
    tags: ['캠핑장', '예약범위', '플랫폼'],
    isPopular: true,
    relatedFAQs: [6, 7]
  },
  {
    id: 6,
    category: '서비스 이용',
    question: '콘서트 티켓은 어떤 사이트를 지원하나요?',
    answer: '인터파크 티켓, 예스24 티켓, 멜론티켓, 티켓링크, 세종문화회관, 롯데콘서트홀 등 국내 주요 티켓팅 사이트를 모두 지원합니다. 각 플랫폼별 특성을 분석하여 최적의 예약 전략을 수립하고, 동시 접속 최적화 기술을 통해 높은 성공률을 보장합니다.',
    tags: ['콘서트', '티켓팅', '플랫폼'],
    isPopular: true,
    relatedFAQs: [5, 12]
  },
  {
    id: 7,
    category: '서비스 이용',
    question: '병원 예약은 어떤 병원까지 가능한가요?',
    answer: '서울대학교병원, 연세대 세브란스병원, 삼성서울병원, 서울아산병원 등 주요 대학병원과 각 지역 대학병원, 전문 클리닉까지 온라인 예약이 가능한 모든 의료기관을 지원합니다. 병원별 예약 시스템 특성을 파악하여 최적의 예약 시간을 확보해드립니다.',
    tags: ['병원', '의료기관', '예약범위'],
    isPopular: false,
    relatedFAQs: [5, 6]
  },
  {
    id: 8,
    category: '서비스 품질',
    question: '담당자는 어떻게 배정되나요?',
    answer: '각 서비스 분야별로 전문 지식과 경험을 갖춘 담당자를 1:1로 배정해드립니다. 담당자는 해당 분야의 예약 시스템과 패턴을 숙지하고 있으며, 서비스 진행 중 실시간으로 소통하여 진행상황을 공유합니다. 평균 2년 이상의 경력을 보유한 전문가들로 구성되어 있습니다.',
    tags: ['담당자', '전문성', '1대1서비스'],
    isPopular: false,
    relatedFAQs: [1, 9]
  },
  {
    id: 9,
    category: '서비스 품질',
    question: '진행상황을 실시간으로 확인할 수 있나요?',
    answer: '네, 카카오톡 또는 전화를 통해 실시간으로 진행상황을 공유해드립니다. 예약 시도 전 사전 안내, 예약 진행 중 실시간 업데이트, 결과 즉시 통보 등 모든 과정을 투명하게 공유하여 고객님이 안심하고 기다리실 수 있도록 합니다.',
    tags: ['실시간', '진행상황', '소통'],
    isPopular: true,
    relatedFAQs: [8, 10]
  },
  {
    id: 10,
    category: '고객지원',
    question: '상담 시간은 어떻게 되나요?',
    answer: '카카오톡 상담은 24시간 가능하며, 전화 상담은 평일 09:00~18:00, 토요일 10:00~15:00에 가능합니다. 급한 문의사항은 카카오톡으로 연락주시면 최대한 빠르게 답변드리겠습니다. 일요일과 공휴일에도 응급 상황 시 카카오톡으로 문의 가능합니다.',
    tags: ['상담시간', '24시간', '연락방법'],
    isPopular: true,
    relatedFAQs: [11, 9]
  },
  {
    id: 11,
    category: '고객지원',
    question: '서비스 취소는 언제까지 가능한가요?',
    answer: '예약 착수 전까지는 언제든지 취소 가능하며, 예약금은 전액 환불해드립니다. 예약 착수 후에는 서비스 특성상 취소가 어려우니 신중하게 결정해주시기 바랍니다. 취소 요청은 담당자 또는 고객센터로 연락주시면 즉시 처리해드립니다.',
    tags: ['취소', '환불', '취소시점'],
    isPopular: false,
    relatedFAQs: [3, 10]
  },
  {
    id: 12,
    category: '서비스 이용',
    question: '여러 개의 예약을 동시에 신청할 수 있나요?',
    answer: '네, 여러 개의 예약을 동시에 신청하실 수 있습니다. 다중 예약의 경우 20% 할인 혜택도 제공합니다. 단, 같은 시간대에 예약이 몰리는 경우 우선순위를 정해주셔야 하며, 각각의 예약에 대해 별도의 담당자가 배정될 수 있습니다.',
    tags: ['다중예약', '할인', '동시신청'],
    isPopular: false,
    relatedFAQs: [2, 4]
  },
  {
    id: 13,
    category: '기술 및 보안',
    question: '개인정보는 안전하게 보호되나요?',
    answer: '고객님의 개인정보는 개인정보보호법에 따라 철저히 보호됩니다. 예약에 필요한 최소한의 정보만 수집하며, 서비스 완료 후 일정 기간 경과 시 안전하게 폐기됩니다. SSL 암호화 통신을 사용하고 있으며, 개인정보 처리방침에 따라 투명하게 관리하고 있습니다.',
    tags: ['개인정보', '보안', '개인정보보호법'],
    isPopular: false,
    relatedFAQs: [14]
  },
  {
    id: 14,
    category: '기술 및 보안',
    question: '예약 시스템의 기술적 원리가 궁금해요.',
    answer: '저희는 각 플랫폼별 예약 패턴을 분석하고, 최적화된 네트워크 환경과 전용 시스템을 구축하여 높은 성공률을 달성하고 있습니다. 다만 구체적인 기술적 방법론은 서비스의 핵심 경쟁력이므로 자세한 내용은 공개하지 않는 점 양해 부탁드립니다.',
    tags: ['기술', '시스템', '방법론'],
    isPopular: false,
    relatedFAQs: [13, 1]
  },
  {
    id: 15,
    category: '특별 서비스',
    question: '긴급 예약 서비스가 있나요?',
    answer: '네, 당일 또는 익일 예약이 필요한 긴급한 경우 긴급 서비스를 제공합니다. 긴급 서비스는 기본 대행료의 50% 추가 요금이 발생하며, 가능한 한 빠른 시간 내에 처리해드립니다. 긴급 서비스 가능 여부는 사전 상담을 통해 확인해주세요.',
    tags: ['긴급서비스', '당일예약', '추가요금'],
    isPopular: false,
    relatedFAQs: [2, 4]
  }
];

// FAQ 카테고리별 분류
export const faqCategories = [
  '전체',
  '서비스 일반',
  '요금 및 결제',
  '서비스 이용',
  '서비스 품질',
  '고객지원',
  '기술 및 보안',
  '특별 서비스'
];

// 인기 FAQ 가져오기
export const getPopularFAQs = (): FAQ[] => {
  return faqs.filter(faq => faq.isPopular);
};

// 카테고리별 FAQ 가져오기
export const getFAQsByCategory = (category: string): FAQ[] => {
  if (category === '전체') return faqs;
  return faqs.filter(faq => faq.category === category);
};

// FAQ 검색 함수
export const searchFAQs = (query: string): FAQ[] => {
  const lowerQuery = query.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery) ||
    faq.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// 관련 FAQ 가져오기
export const getRelatedFAQs = (faqId: number): FAQ[] => {
  const faq = faqs.find(f => f.id === faqId);
  if (!faq || !faq.relatedFAQs) return [];
  return faqs.filter(f => faq.relatedFAQs!.includes(f.id));
};