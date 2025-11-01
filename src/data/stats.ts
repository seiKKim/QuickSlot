export interface StatItem {
  number: string;
  label: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  period?: string;
}

export const mainStats: StatItem[] = [
  { 
    number: '99.2%', 
    label: '예약 성공률',
    description: '높은 성공률로 고객 만족도 최상위',
    trend: 'up',
    period: '최근 6개월'
  },
  { 
    number: '50,000+', 
    label: '누적 예약 건수',
    description: '다양한 분야의 예약 경험과 노하우',
    trend: 'up',
    period: '서비스 시작 이후'
  },
  { 
    number: '24/7', 
    label: '실시간 상담',
    description: '언제든지 문의 가능한 상담 서비스',
    trend: 'stable',
    period: '연중무휴'
  },
  { 
    number: '5년+', 
    label: '서비스 경력',
    description: '검증된 전문성과 신뢰할 수 있는 서비스',
    trend: 'up',
    period: '2019년 설립'
  }
];

// 서비스별 통계
export const serviceStats = {
  camping: {
    totalReservations: 15420,
    successRate: 98.5,
    averageWaitTime: '2.3일',
    popularSites: ['지리산국립공원', '설악산국립공원', '속초해변캠핑장']
  },
  concert: {
    totalReservations: 8930,
    successRate: 94.2,
    averageWaitTime: '즉시',
    popularEvents: ['BTS 콘서트', '아이유 콘서트', '뮤지컬 라이온킹']
  },
  medical: {
    totalReservations: 12150,
    successRate: 96.8,
    averageWaitTime: '1.5일',
    popularHospitals: ['서울대학교병원', '삼성서울병원', '세브란스병원']
  },
  education: {
    totalReservations: 13500,
    successRate: 99.1,
    averageWaitTime: '당일',
    popularCourses: ['컴퓨터활용능력', '토익', '정보처리기사']
  }
};

// 월별 성과 데이터 (차트용)
export const monthlyStats = [
  { month: '2024.07', reservations: 1200, successRate: 98.5 },
  { month: '2024.08', reservations: 1350, successRate: 99.1 },
  { month: '2024.09', reservations: 1180, successRate: 98.8 },
  { month: '2024.10', reservations: 1420, successRate: 99.3 },
  { month: '2024.11', reservations: 1380, successRate: 98.9 },
  { month: '2024.12', reservations: 1590, successRate: 99.2 },
];

// 고객 만족도 통계
export const satisfactionStats = {
  overall: 4.9,
  categories: {
    service: 4.8,
    speed: 4.9,
    communication: 4.7,
    price: 4.6
  },
  totalReviews: 1500,
  recommendationRate: 98
};

// 실시간 현황 (대시보드용)
export const realTimeStats = {
  activeReservations: 45,
  pendingRequests: 12,
  todaySuccess: 23,
  onlineConsultants: 8
};