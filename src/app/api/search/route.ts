import { NextRequest, NextResponse } from 'next/server';
import { services } from '@/data/services';
import { searchFAQs } from '@/data/faqs';
import { getTestimonialsByService } from '@/data/testimonials';

// 동적 렌더링 강제 (검색 쿼리 파라미터 사용)
export const dynamic = 'force-dynamic';

export interface SearchResult {
  type: 'service' | 'faq' | 'review' | 'page';
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  metadata?: any;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type'); // 'all', 'service', 'faq', 'review'
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        data: {
          results: [],
          total: 0,
          query: ''
        }
      });
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // 서비스 검색
    if (!type || type === 'all' || type === 'service') {
      Object.values(services).forEach(service => {
        const matchTitle = service.title.toLowerCase().includes(lowerQuery);
        const matchDesc = service.description.toLowerCase().includes(lowerQuery);
        const matchDetails = service.details.toLowerCase().includes(lowerQuery);
        const matchFeatures = service.features.some(f => f.toLowerCase().includes(lowerQuery));

        if (matchTitle || matchDesc || matchDetails || matchFeatures) {
          results.push({
            type: 'service',
            id: service.id,
            title: service.title,
            description: service.description,
            url: `/services/${service.id}`,
            icon: service.id === 'camping' ? '🏕️' : service.id === 'concert' ? '🎵' : service.id === 'medical' ? '🏥' : '🎓',
            metadata: {
              successRate: service.successRate,
              averageTime: service.averageTime
            }
          });
        }
      });
    }

    // FAQ 검색
    if (!type || type === 'all' || type === 'faq') {
      const faqResults = searchFAQs(query);
      faqResults.slice(0, limit).forEach(faq => {
        results.push({
          type: 'faq',
          id: `faq-${faq.id}`,
          title: faq.question,
          description: faq.answer.substring(0, 150) + (faq.answer.length > 150 ? '...' : ''),
          url: `/faq#faq-${faq.id}`,
          icon: '❓',
          metadata: {
            category: faq.category,
            tags: faq.tags
          }
        });
      });
    }

    // 리뷰 검색
    if (!type || type === 'all' || type === 'review') {
      const allServices = ['camping', 'concert', 'medical', 'education'];
      allServices.forEach(serviceId => {
        const serviceReviews = getTestimonialsByService(serviceId);
        serviceReviews.forEach(review => {
          const matchContent = review.content.toLowerCase().includes(lowerQuery);
          const matchName = review.name.toLowerCase().includes(lowerQuery);
          const matchLocation = review.location.toLowerCase().includes(lowerQuery);

          if (matchContent || matchName || matchLocation) {
            results.push({
              type: 'review',
              id: `review-${review.id}`,
              title: `${review.name}님의 후기`,
              description: review.content.substring(0, 150) + (review.content.length > 150 ? '...' : ''),
              url: `/reviews#review-${review.id}`,
              icon: '⭐',
              metadata: {
                rating: review.rating,
                date: review.date,
                service: serviceId,
                location: review.location
              }
            });
          }
        });
      });
    }

    // 페이지 검색 (고정 페이지)
    if (!type || type === 'all' || type === 'page') {
      const pages = [
        { title: '회사소개', description: 'QuickSlot 예약대행 서비스에 대한 상세 정보를 확인하세요', url: '/about', keywords: ['회사', '소개', 'about'] },
        { title: '이용절차', description: '예약 대행 서비스 이용 방법을 단계별로 안내합니다', url: '/process', keywords: ['이용', '절차', '방법', '프로세스'] },
        { title: '고객후기', description: '실제 고객들의 솔직한 후기를 확인하세요', url: '/reviews', keywords: ['후기', '리뷰', '평가', 'review'] },
        { title: '문의하기', description: '궁금한 사항을 문의하세요', url: '/contact', keywords: ['문의', '연락', 'contact', '상담'] },
        { title: 'FAQ', description: '자주 묻는 질문과 답변을 확인하세요', url: '/faq', keywords: ['FAQ', '질문', '답변', 'faq'] },
      ];

      pages.forEach(page => {
        const matchTitle = page.title.toLowerCase().includes(lowerQuery);
        const matchDesc = page.description.toLowerCase().includes(lowerQuery);
        const matchKeywords = page.keywords.some(k => k.toLowerCase().includes(lowerQuery));

        if (matchTitle || matchDesc || matchKeywords) {
          results.push({
            type: 'page',
            id: page.url.replace('/', ''),
            title: page.title,
            description: page.description,
            url: page.url,
            icon: '📄'
          });
        }
      });
    }

    // 결과 제한
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        results: limitedResults,
        total: results.length,
        query
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '검색 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

