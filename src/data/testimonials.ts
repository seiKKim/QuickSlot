export interface Testimonial {
  id: number;
  name: string;
  service: string;
  serviceId: string;
  content: string;
  rating: number;
  date: string;
  location: string;
  verified: boolean;
  avatar?: string;
  tags?: string[];
}

export const testimonials: Testimonial[] = [
  // 캠핑장 예약 후기
  {
    id: 1,
    name: '김민수',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '매번 놓치던 인기 캠핑장 예약을 성공했어요. 정말 감사합니다! 전문적인 서비스로 가족과 함께 좋은 추억을 만들 수 있었습니다. 다음에도 꼭 이용하겠어요.',
    rating: 5,
    date: '2025.01.15',
    location: '서울시 강남구',
    verified: true,
    tags: ['빠른처리', '친절한상담', '높은성공률']
  },
  {
    id: 2,
    name: '정도현',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '국립공원 캠핑장 예약이 이렇게 쉬울 줄 몰랐어요. 전문적인 시스템과 높은 성공률로 안심하고 맡길 수 있었습니다. 가격도 합리적이고 추천합니다!',
    rating: 5,
    date: '2025.02.05',
    location: '경기도 성남시',
    verified: true,
    tags: ['높은성공률', '합리적가격', '전문시스템']
  },
  {
    id: 3,
    name: '박성진',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '설악산 캠핑장 예약 정말 어려웠는데 한 번에 성공! 담당자분이 여러 옵션을 제시해주셔서 원하는 날짜에 예약할 수 있었어요.',
    rating: 5,
    date: '2025.02.20',
    location: '강원도 춘천시',
    verified: true,
    tags: ['다양한옵션', '원하는날짜', '성공적예약']
  },
  {
    id: 4,
    name: '최은지',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '한라산 캠핑장은 정말 예약이 힘든데 성공해주셔서 감사해요. 제주도 여행이 완벽했습니다!',
    rating: 5,
    date: '2025.03.02',
    location: '제주도 제주시',
    verified: true,
    tags: ['제주도', '한라산', '완벽한여행']
  },
  {
    id: 5,
    name: '이준호',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '가족 캠핑을 위해 지리산 캠핑장 예약했는데 최고였어요. 아이들이 너무 좋아했습니다.',
    rating: 4,
    date: '2025.03.15',
    location: '전남 구례군',
    verified: true,
    tags: ['가족캠핑', '지리산', '아이들만족']
  },
  {
    id: 6,
    name: '송지훈',
    service: '캠핑장 예약',
    serviceId: 'camping',
    content: '백패킹 캠핑장 예약 대행해주셔서 감사해요. 혼자 여행하기 좋은 곳으로 추천까지 해주셨네요.',
    rating: 5,
    date: '2025.03.28',
    location: '경북 봉화군',
    verified: true,
    tags: ['백패킹', '혼자여행', '추천서비스']
  },

  // 콘서트 티켓팅 후기
  {
    id: 7,
    name: '이지은',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '아이유 콘서트 티켓을 대행해주셔서 꿈만 같아요. 전문성이 느껴지고 신뢰할 수 있는 서비스였습니다. 담당자분이 실시간으로 진행상황을 알려주셔서 안심이 되었어요.',
    rating: 5,
    date: '2025.01.20',
    location: '부산시 해운대구',
    verified: true,
    tags: ['전문성', '실시간소통', '신뢰성']
  },
  {
    id: 8,
    name: '송미영',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '방탄소년단 콘서트 티켓을 성공적으로 예약해주셔서 감동이었어요. 티켓팅 오픈 5분만에 완료 메시지를 받았을 때 정말 놀랐습니다. 최고의 서비스입니다!',
    rating: 5,
    date: '2025.02.10',
    location: '광주시 서구',
    verified: true,
    tags: ['초고속처리', '감동서비스', '최고품질']
  },
  {
    id: 9,
    name: '김태현',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '세븐틴 콘서트 VIP석까지 성공! 평소에 절대 못 구하던 자리를 구해주셔서 정말 감사합니다.',
    rating: 5,
    date: '2025.02.18',
    location: '서울시 송파구',
    verified: true,
    tags: ['VIP석', '세븐틴', '감사한마음']
  },
  {
    id: 10,
    name: '박민지',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '뉴진스 콘서트 티켓팅 대행 서비스 정말 만족해요. 친구들과 함께 갈 수 있는 좌석으로 예약해주셔서 좋았어요.',
    rating: 5,
    date: '2025.02.25',
    location: '경기도 고양시',
    verified: true,
    tags: ['뉴진스', '친구들과함께', '좌석배려']
  },
  {
    id: 11,
    name: '정수민',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '임영웅 콘서트 티켓 정말 구하기 힘든데 성공해주셔서 부모님께서 너무 좋아하셨어요.',
    rating: 5,
    date: '2025.03.05',
    location: '대구시 달서구',
    verified: true,
    tags: ['임영웅', '부모님선물', '효도']
  },
  {
    id: 12,
    name: '한예린',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '블랙핑크 월드투어 서울 공연 티켓을 구해주셔서 감사해요. 꿈에도 그리던 콘서트를 볼 수 있게 되었어요!',
    rating: 5,
    date: '2025.03.12',
    location: '인천시 부평구',
    verified: true,
    tags: ['블랙핑크', '월드투어', '꿈의무대']
  },
  {
    id: 13,
    name: '윤서준',
    service: '콘서트 티켓팅',
    serviceId: 'concert',
    content: '에스파 콘서트 티켓팅 성공했어요! 여자친구 생일선물로 예약했는데 정말 좋아해서 뿌듯합니다.',
    rating: 5,
    date: '2025.03.20',
    location: '부산시 남구',
    verified: true,
    tags: ['에스파', '생일선물', '여자친구']
  },

  // 병원 예약 후기
  {
    id: 14,
    name: '박준호',
    service: '병원 예약',
    serviceId: 'medical',
    content: '예약이 어려운 유명 병원 진료를 빠르게 잡아주셔서 정말 도움이 되었습니다. 담당자분이 친절하게 안내해주셔서 믿고 맡길 수 있었어요. 추천합니다!',
    rating: 5,
    date: '2025.01.25',
    location: '대구시 중구',
    verified: true,
    tags: ['빠른예약', '친절상담', '전문서비스']
  },
  {
    id: 15,
    name: '한상우',
    service: '병원 예약',
    serviceId: 'medical',
    content: '응급하게 필요했던 병원 예약을 당일에 잡아주셔서 정말 감사했습니다. 24시간 상담 서비스 덕분에 새벽에도 도움을 받을 수 있었어요.',
    rating: 5,
    date: '2025.02.12',
    location: '울산시 남구',
    verified: true,
    tags: ['당일예약', '24시간상담', '응급처리']
  },
  {
    id: 16,
    name: '김소희',
    service: '병원 예약',
    serviceId: 'medical',
    content: '서울대병원 예약이 이렇게 빨리 될 줄 몰랐어요. 전문 담당자분이 최적의 시간까지 추천해주셨습니다.',
    rating: 5,
    date: '2025.02.28',
    location: '서울시 관악구',
    verified: true,
    tags: ['서울대병원', '빠른예약', '시간추천']
  },
  {
    id: 17,
    name: '이민호',
    service: '병원 예약',
    serviceId: 'medical',
    content: '삼성서울병원 암센터 예약 대행해주셔서 감사합니다. 가족을 위한 중요한 예약이었는데 안심할 수 있었어요.',
    rating: 5,
    date: '2025.03.08',
    location: '경기도 분당시',
    verified: true,
    tags: ['삼성서울병원', '암센터', '가족을위해']
  },
  {
    id: 18,
    name: '최유진',
    service: '병원 예약',
    serviceId: 'medical',
    content: '건강검진 예약을 여러 병원 비교해서 추천해주셔서 좋았어요. 가격과 검진 항목까지 상세히 안내받았습니다.',
    rating: 4,
    date: '2025.03.15',
    location: '대전시 서구',
    verified: true,
    tags: ['건강검진', '병원비교', '상세안내']
  },
  {
    id: 19,
    name: '장민석',
    service: '병원 예약',
    serviceId: 'medical',
    content: '성형외과 상담 예약 도움받았어요. 여러 병원 예약을 한번에 잡아주셔서 비교 상담이 가능했습니다.',
    rating: 4,
    date: '2025.03.22',
    location: '서울시 강남구',
    verified: true,
    tags: ['성형외과', '상담예약', '비교가능']
  },

  // 교육 신청 후기
  {
    id: 20,
    name: '최서연',
    service: '교육 신청',
    serviceId: 'education',
    content: '수강신청 대행 서비스 정말 만족합니다. 원하는 강의를 모두 신청해주셔서 학기 계획이 완벽해졌어요. 시간과 스트레스를 많이 절약했습니다.',
    rating: 5,
    date: '2025.02.01',
    location: '인천시 연수구',
    verified: true,
    tags: ['완벽한결과', '시간절약', '스트레스해소']
  },
  {
    id: 21,
    name: '윤지호',
    service: '교육 신청',
    serviceId: 'education',
    content: '토익 시험 접수를 대행해주셔서 편했습니다. 원하는 시험 날짜와 장소를 정확히 예약해주셔서 만족스러웠어요. 다음 시험도 부탁드릴게요.',
    rating: 4,
    date: '2025.02.15',
    location: '대전시 유성구',
    verified: true,
    tags: ['정확한예약', '편리함', '재이용의향']
  },
  {
    id: 22,
    name: '김동현',
    service: '교육 신청',
    serviceId: 'education',
    content: '토플 시험 접수 대행 받았는데 정말 편리했어요. 해외 유학 준비하느라 바쁜데 큰 도움이 되었습니다.',
    rating: 5,
    date: '2025.02.22',
    location: '서울시 마포구',
    verified: true,
    tags: ['토플', '유학준비', '편리함']
  },
  {
    id: 23,
    name: '박지연',
    service: '교육 신청',
    serviceId: 'education',
    content: '공무원 시험 접수를 대행해주셔서 감사해요. 여러 시험을 한번에 처리해주셔서 실수할 염려가 없었습니다.',
    rating: 5,
    date: '2025.03.01',
    location: '경기도 수원시',
    verified: true,
    tags: ['공무원시험', '여러시험', '실수방지']
  },
  {
    id: 24,
    name: '이상훈',
    service: '교육 신청',
    serviceId: 'education',
    content: '컴활 1급 시험 접수 도움받았어요. 인기 시험이라 자리가 금방 차는데 원하는 날짜에 성공했습니다.',
    rating: 5,
    date: '2025.03.10',
    location: '부산시 동래구',
    verified: true,
    tags: ['컴활1급', '인기시험', '원하는날짜']
  },
  {
    id: 25,
    name: '정혜진',
    service: '교육 신청',
    serviceId: 'education',
    content: '요가 강사 자격증 과정 신청 대행받았어요. 대기자가 많은 과정이었는데 성공적으로 등록해주셨습니다.',
    rating: 4,
    date: '2025.03.18',
    location: '대구시 수성구',
    verified: true,
    tags: ['요가강사', '자격증과정', '대기자많음']
  },

  // 펜션/리조트 예약 후기
  {
    id: 26,
    name: '김재훈',
    service: '펜션 예약',
    serviceId: 'pension',
    content: '강릉 오션뷰 펜션 예약 성공했어요! 바다가 보이는 방으로 잡아주셔서 가족여행이 완벽했습니다.',
    rating: 5,
    date: '2025.01.30',
    location: '강원도 강릉시',
    verified: true,
    tags: ['강릉', '오션뷰', '가족여행']
  },
  {
    id: 27,
    name: '송은경',
    service: '펜션 예약',
    serviceId: 'pension',
    content: '제주도 애월 펜션 예약 대행해주셔서 감사해요. 인스타그램에서 봤던 바로 그 펜션이었어요!',
    rating: 5,
    date: '2025.02.14',
    location: '제주도 애월읍',
    verified: true,
    tags: ['제주도', '애월', '인스타핫플']
  },
  {
    id: 28,
    name: '이현우',
    service: '펜션 예약',
    serviceId: 'pension',
    content: '가평 글램핑 펜션 예약했는데 정말 좋았어요. 반려동물과 함께 갈 수 있는 곳으로 추천해주셔서 감사합니다.',
    rating: 5,
    date: '2025.02.28',
    location: '경기도 가평군',
    verified: true,
    tags: ['가평', '글램핑', '반려동물동반']
  },
  {
    id: 29,
    name: '박소영',
    service: '펜션 예약',
    serviceId: 'pension',
    content: '경주 한옥 펜션 예약 도움받았어요. 전통 한옥에서의 하룻밤이 정말 특별한 경험이었습니다.',
    rating: 4,
    date: '2025.03.12',
    location: '경북 경주시',
    verified: true,
    tags: ['경주', '한옥펜션', '특별한경험']
  },

  // 호텔 예약 후기
  {
    id: 30,
    name: '조민준',
    service: '호텔 예약',
    serviceId: 'hotel',
    content: '롯데호텔 스위트룸 예약 성공! 기념일 이벤트로 예약했는데 완벽한 서비스였어요.',
    rating: 5,
    date: '2025.01.18',
    location: '서울시 중구',
    verified: true,
    tags: ['롯데호텔', '스위트룸', '기념일']
  },
  {
    id: 31,
    name: '황지민',
    service: '호텔 예약',
    serviceId: 'hotel',
    content: '부산 해운대 호텔 예약 대행받았어요. 오션뷰 객실로 예약해주셔서 부산 여행이 더욱 완벽했습니다.',
    rating: 5,
    date: '2025.02.08',
    location: '부산시 해운대구',
    verified: true,
    tags: ['부산', '해운대', '오션뷰']
  },
  {
    id: 32,
    name: '신재혁',
    service: '호텔 예약',
    serviceId: 'hotel',
    content: '제주 신라호텔 예약 도움받았어요. 허니문 여행지로 완벽한 선택이었습니다. 감사합니다!',
    rating: 5,
    date: '2025.02.20',
    location: '제주도 서귀포시',
    verified: true,
    tags: ['제주', '신라호텔', '허니문']
  },

  // 항공 예약 후기
  {
    id: 33,
    name: '김현정',
    service: '항공 예약',
    serviceId: 'flight',
    content: '일본 항공 예약 대행해주셔서 감사해요. 가격 비교까지 해주셔서 합리적인 항공편으로 예약할 수 있었어요.',
    rating: 5,
    date: '2025.01.22',
    location: '서울시 강서구',
    verified: true,
    tags: ['일본항공', '가격비교', '합리적']
  },
  {
    id: 34,
    name: '이동건',
    service: '항공 예약',
    serviceId: 'flight',
    content: '유럽 여행 항공 예약 정말 복잡했는데 전문적으로 처리해주셔서 편했어요. 경유지까지 세심하게 체크해주셨습니다.',
    rating: 5,
    date: '2025.02.16',
    location: '경기도 안양시',
    verified: true,
    tags: ['유럽여행', '전문처리', '경유지체크']
  },

  // 기타 예약 후기
  {
    id: 35,
    name: '문수진',
    service: '식당 예약',
    serviceId: 'restaurant',
    content: '미슐랭 레스토랑 예약 성공했어요! 특별한 날을 위해 예약했는데 정말 감동적인 하루였습니다.',
    rating: 5,
    date: '2025.02.06',
    location: '서울시 청담동',
    verified: true,
    tags: ['미슐랭', '레스토랑', '특별한날']
  },
  {
    id: 36,
    name: '강태우',
    service: '골프장 예약',
    serviceId: 'golf',
    content: '인기 골프장 주말 예약 성공! 평소에 예약하기 어려운 코스였는데 정말 감사합니다.',
    rating: 5,
    date: '2025.02.24',
    location: '경기도 여주시',
    verified: true,
    tags: ['골프장', '주말예약', '인기코스']
  },
  {
    id: 37,
    name: '오세훈',
    service: '스파 예약',
    serviceId: 'spa',
    content: '용산 드래곤힐스파 사우나 예약 도움받았어요. 가족 할인까지 적용해주셔서 좋았습니다.',
    rating: 4,
    date: '2025.03.03',
    location: '서울시 용산구',
    verified: true,
    tags: ['드래곤힐스파', '사우나', '가족할인']
  },
  {
    id: 38,
    name: '나영희',
    service: '전시회 예약',
    serviceId: 'exhibition',
    content: '모네 전시회 티켓 예약 성공했어요. 평일 할인 시간대로 예약해주셔서 경제적이었습니다.',
    rating: 4,
    date: '2025.03.14',
    location: '서울시 종로구',
    verified: true,
    tags: ['모네전시회', '평일할인', '경제적']
  },
  {
    id: 39,
    name: '임지수',
    service: '뮤지컬 예약',
    serviceId: 'musical',
    content: '라이온킹 뮤지컬 좋은 자리로 예약해주셔서 감사해요. 아이들이 정말 좋아했습니다!',
    rating: 5,
    date: '2025.03.21',
    location: '서울시 중구',
    verified: true,
    tags: ['라이온킹', '뮤지컬', '아이들']
  },
  {
    id: 40,
    name: '서준영',
    service: '기타 예약',
    serviceId: 'other',
    content: '복잡한 관공서 업무 예약을 대행해주셔서 정말 도움이 되었어요. 시간과 노력을 많이 절약했습니다.',
    rating: 5,
    date: '2025.03.25',
    location: '경기도 성남시',
    verified: true,
    tags: ['관공서업무', '시간절약', '노력절약']
  }
];

// 서비스별 후기 필터링 함수
export const getTestimonialsByService = (serviceId: string): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.serviceId === serviceId);
};

// 최신 후기 가져오기
export const getLatestTestimonials = (count: number = 6): Testimonial[] => {
  return testimonials
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

// 높은 평점 후기만 가져오기
export const getHighRatedTestimonials = (minRating: number = 5): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.rating >= minRating);
};

// 지역별 후기 가져오기
export const getTestimonialsByLocation = (location: string): Testimonial[] => {
  return testimonials.filter(testimonial => 
    testimonial.location.includes(location)
  );
};

// 랜덤 후기 가져오기
export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 후기 통계
export const testimonialStats = {
  total: testimonials.length,
  averageRating: Math.round((testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length) * 10) / 10,
  ratingDistribution: {
    5: testimonials.filter(t => t.rating === 5).length,
    4: testimonials.filter(t => t.rating === 4).length,
    3: testimonials.filter(t => t.rating === 3).length,
    2: testimonials.filter(t => t.rating === 2).length,
    1: testimonials.filter(t => t.rating === 1).length,
  },
  verifiedCount: testimonials.filter(t => t.verified).length,
  verificationRate: Math.round((testimonials.filter(t => t.verified).length / testimonials.length) * 100),
  byService: {
    camping: testimonials.filter(t => t.serviceId === 'camping').length,
    concert: testimonials.filter(t => t.serviceId === 'concert').length,
    medical: testimonials.filter(t => t.serviceId === 'medical').length,
    education: testimonials.filter(t => t.serviceId === 'education').length,
    pension: testimonials.filter(t => t.serviceId === 'pension').length,
    hotel: testimonials.filter(t => t.serviceId === 'hotel').length,
    flight: testimonials.filter(t => t.serviceId === 'flight').length,
    restaurant: testimonials.filter(t => t.serviceId === 'restaurant').length,
    golf: testimonials.filter(t => t.serviceId === 'golf').length,
    spa: testimonials.filter(t => t.serviceId === 'spa').length,
    exhibition: testimonials.filter(t => t.serviceId === 'exhibition').length,
    musical: testimonials.filter(t => t.serviceId === 'musical').length,
    other: testimonials.filter(t => t.serviceId === 'other').length,
  },
  recentActivity: {
    thisMonth: testimonials.filter(t => {
      const reviewDate = new Date(t.date.replace(/\./g, '-'));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      return reviewDate.getMonth() === currentMonth && reviewDate.getFullYear() === currentYear;
    }).length,
    thisWeek: testimonials.filter(t => {
      const reviewDate = new Date(t.date.replace(/\./g, '-'));
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return reviewDate >= oneWeekAgo;
    }).length
  },
  topServices: Object.entries({
    camping: testimonials.filter(t => t.serviceId === 'camping').length,
    concert: testimonials.filter(t => t.serviceId === 'concert').length,
    medical: testimonials.filter(t => t.serviceId === 'medical').length,
    education: testimonials.filter(t => t.serviceId === 'education').length,
    pension: testimonials.filter(t => t.serviceId === 'pension').length,
    hotel: testimonials.filter(t => t.serviceId === 'hotel').length,
    flight: testimonials.filter(t => t.serviceId === 'flight').length,
    restaurant: testimonials.filter(t => t.serviceId === 'restaurant').length,
    golf: testimonials.filter(t => t.serviceId === 'golf').length,
    spa: testimonials.filter(t => t.serviceId === 'spa').length,
    exhibition: testimonials.filter(t => t.serviceId === 'exhibition').length,
    musical: testimonials.filter(t => t.serviceId === 'musical').length,
    other: testimonials.filter(t => t.serviceId === 'other').length,
  })
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)
  .map(([service, count]) => ({ service, count }))
};