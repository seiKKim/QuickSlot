// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 유효한 서비스 목록
const VALID_SERVICES = [
  'camping',
  'concert', 
  'medical',
  'education',
  'pension',
  'hotel',
  'flight',
  'restaurant',
  'golf',
  'spa',
  'exhibition',
  'musical',
  'other'
];

// 후기 작성 스키마 검증
const createReviewSchema = z.object({
  nickname: z.string()
    .min(1, '닉네임을 입력해주세요')
    .max(20, '닉네임은 20자 이하로 입력해주세요'),
  service: z.string()
    .refine(val => VALID_SERVICES.includes(val), '유효하지 않은 서비스입니다'),
  rating: z.number()
    .min(1, '평점을 선택해주세요')
    .max(5, '평점은 1-5점 사이여야 합니다'),
  title: z.string()
    .min(1, '제목을 입력해주세요')
    .max(50, '제목은 50자 이하로 입력해주세요'),
  content: z.string()
    .min(20, '후기 내용은 최소 20자 이상 입력해주세요')
    .max(500, '후기 내용은 500자 이하로 입력해주세요'),
  usageDate: z.string().optional(),
  location: z.string().optional(),
  wouldRecommend: z.boolean(),
  wantsCoupon: z.boolean(),
  email: z.string().email('올바른 이메일 형식이 아닙니다').optional().or(z.literal('')),
  phone: z.string().optional()
});

// 서비스명 매핑
const SERVICE_NAMES: Record<string, string> = {
  camping: '캠핑장 예약',
  concert: '콘서트 티켓팅',
  medical: '병원 예약',
  education: '교육 신청',
  pension: '펜션 예약',
  hotel: '호텔 예약',
  flight: '항공 예약',
  restaurant: '식당 예약',
  golf: '골프장 예약',
  spa: '스파 예약',
  exhibition: '전시회 예약',
  musical: '뮤지컬 예약',
  other: '기타 예약'
};

// 임시 후기 저장소 (실제로는 데이터베이스 사용)
let reviewsStorage: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 데이터 검증
    const validatedData = createReviewSchema.parse(body);
    
    // 이메일이 비어있으면 제거
    if (validatedData.email === '') {
      delete validatedData.email;
    }

    // 새 후기 객체 생성
    const newReview = {
      id: Date.now(), // 실제로는 UUID 또는 DB auto-increment 사용
      ...validatedData,
      service: SERVICE_NAMES[validatedData.service], // 서비스명으로 변환
      serviceId: validatedData.service, // 원본 서비스 ID 유지
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'), // 2024.03.25 형식
      verified: false, // 초기에는 미인증 상태
      tags: generateTags(validatedData), // 자동 태그 생성
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 임시 저장소에 추가 (실제로는 데이터베이스에 저장)
    reviewsStorage.push(newReview);

    // 쿠폰 요청 시 이메일 발송 (실제로는 이메일 서비스 사용)
    if (validatedData.wantsCoupon && validatedData.email) {
      await sendCouponEmail(validatedData.email, validatedData.nickname);
    }

    console.log('새 후기 저장됨:', newReview);

    return NextResponse.json({
      success: true,
      message: '후기가 성공적으로 등록되었습니다',
      data: {
        reviewId: newReview.id,
        couponSent: validatedData.wantsCoupon && validatedData.email
      }
    });

  } catch (error) {
    console.error('후기 작성 오류:', error);

if (error instanceof z.ZodError) {
  return NextResponse.json({
    success: false,
    error: error.issues[0].message,
    details: error.issues
  }, { status: 400 });
}

    return NextResponse.json({
      success: false,
      error: '후기 작성 중 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// GET 메서드 - 후기 목록 조회
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const service = url.searchParams.get('service');
    const rating = url.searchParams.get('rating');
    const search = url.searchParams.get('search');
    const sortBy = url.searchParams.get('sortBy') || 'latest';

    // 실제로는 데이터베이스에서 조회
    // 여기서는 임시 저장소에서 조회
    let filteredReviews = [...reviewsStorage];

    // 필터링
    if (service) {
      filteredReviews = filteredReviews.filter(review => review.serviceId === service);
    }
    
    if (rating) {
      const minRating = parseInt(rating);
      filteredReviews = filteredReviews.filter(review => review.rating >= minRating);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredReviews = filteredReviews.filter(review => 
        review.content.toLowerCase().includes(searchLower) ||
        review.title.toLowerCase().includes(searchLower) ||
        review.nickname.toLowerCase().includes(searchLower)
      );
    }

    // 정렬
    filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    // 페이지네이션
    const total = filteredReviews.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedReviews = filteredReviews.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        testimonials: paginatedReviews,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('후기 조회 오류:', error);
    return NextResponse.json({
      success: false,
      error: '후기 조회 중 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// 자동 태그 생성 함수
function generateTags(reviewData: any): string[] {
  const tags: string[] = [];
  
  // 평점 기반 태그
  if (reviewData.rating === 5) {
    tags.push('최고만족');
  } else if (reviewData.rating >= 4) {
    tags.push('만족');
  }
  
  // 추천 여부 기반 태그
  if (reviewData.wouldRecommend) {
    tags.push('추천해요');
  }
  
  // 내용 기반 태그 (간단한 키워드 매칭)
  const content = reviewData.content.toLowerCase();
  const title = reviewData.title.toLowerCase();
  const text = `${content} ${title}`;
  
  if (text.includes('빠른') || text.includes('신속')) tags.push('빠른처리');
  if (text.includes('친절') || text.includes('상담')) tags.push('친절상담');
  if (text.includes('성공') || text.includes('완료')) tags.push('성공적예약');
  if (text.includes('전문') || text.includes('프로')) tags.push('전문서비스');
  if (text.includes('편리') || text.includes('쉬운')) tags.push('편리함');
  if (text.includes('만족') || text.includes('좋은')) tags.push('만족도높음');
  
  return tags.slice(0, 3); // 최대 3개 태그
}

// 쿠폰 이메일 발송 함수 (실제로는 이메일 서비스 사용)
async function sendCouponEmail(email: string, nickname: string) {
  try {
    // 실제로는 SendGrid, AWS SES 등의 이메일 서비스 사용
    console.log(`쿠폰 이메일 발송: ${email} (${nickname}님)`);
    
    // 쿠폰 코드 생성
    const couponCode = `REVIEW${Date.now().toString().slice(-6)}`;
    
    // 이메일 발송 로직
    // await emailService.send({
    //   to: email,
    //   subject: '[QuickSlot] 10% 할인쿠폰이 도착했어요! 🎁',
    //   template: 'coupon',
    //   data: {
    //     nickname,
    //     couponCode,
    //     expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일 후
    //   }
    // });
    
    return { success: true, couponCode };
  } catch (error) {
    console.error('쿠폰 이메일 발송 실패:', error);
    return { success: false, error };
  }
}