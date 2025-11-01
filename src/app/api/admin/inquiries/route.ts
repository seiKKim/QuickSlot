import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 문의 데이터 타입
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  notes?: string;
}

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용)
const inquiries: Inquiry[] = [
  {
    id: 'inq_001',
    name: '김민수',
    email: 'minsu@example.com',
    phone: '010-1234-5678',
    service: '캠핑장 예약',
    subject: '강원도 캠핑장 추천',
    message: '가족 캠핑을 위해 강원도 지역의 좋은 캠핑장을 추천해주세요. 바다가 보이는 곳을 원합니다.',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date('2025-01-15T10:30:00'),
    updatedAt: new Date('2025-01-15T10:30:00')
  },
  {
    id: 'inq_002',
    name: '이영희',
    email: 'younghee@example.com',
    phone: '010-9876-5432',
    service: '콘서트 티켓팅',
    subject: '아이유 콘서트 티켓팅',
    message: '아이유 콘서트 티켓팅을 도와주세요. VIP석을 원합니다.',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2025-01-14T15:20:00'),
    updatedAt: new Date('2025-01-15T09:15:00'),
    assignedTo: 'admin',
    notes: '티켓팅 일정 확인 중'
  },
  {
    id: 'inq_003',
    name: '박철수',
    email: 'chulsoo@example.com',
    service: '병원 예약',
    subject: '정형외과 예약',
    message: '무릎 수술 후 재검진 예약을 도와주세요.',
    status: 'completed',
    priority: 'low',
    createdAt: new Date('2025-01-13T14:45:00'),
    updatedAt: new Date('2025-01-14T16:30:00'),
    assignedTo: 'admin',
    notes: '예약 완료 - 서울대병원 정형외과'
  }
];

// 문의 생성 스키마
const createInquirySchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  phone: z.string().optional(),
  service: z.string().min(1, '서비스를 선택하세요'),
  subject: z.string().min(1, '제목을 입력하세요'),
  message: z.string().min(10, '문의 내용을 10자 이상 입력하세요')
});

// 문의 업데이트 스키마
const updateInquirySchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional()
});

// GET: 문의 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredInquiries = [...inquiries];

    // 상태별 필터링
    if (status) {
      filteredInquiries = filteredInquiries.filter(inquiry => inquiry.status === status);
    }

    // 우선순위별 필터링
    if (priority) {
      filteredInquiries = filteredInquiries.filter(inquiry => inquiry.priority === priority);
    }

    // 정렬 (최신순)
    filteredInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

    // 통계 정보
    const stats = {
      total: inquiries.length,
      pending: inquiries.filter(i => i.status === 'pending').length,
      in_progress: inquiries.filter(i => i.status === 'in_progress').length,
      completed: inquiries.filter(i => i.status === 'completed').length,
      cancelled: inquiries.filter(i => i.status === 'cancelled').length,
      high_priority: inquiries.filter(i => i.priority === 'high').length
    };

    return NextResponse.json({
      success: true,
      data: {
        inquiries: paginatedInquiries,
        pagination: {
          page,
          limit,
          total: filteredInquiries.length,
          totalPages: Math.ceil(filteredInquiries.length / limit)
        },
        stats
      }
    });

  } catch (error) {
    console.error('문의 목록 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// POST: 새 문의 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, subject, message } = createInquirySchema.parse(body);

    const newInquiry: Inquiry = {
      id: `inq_${String(inquiries.length + 1).padStart(3, '0')}`,
      name,
      email,
      phone,
      service,
      subject,
      message,
      status: 'pending',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    inquiries.push(newInquiry);

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다',
      data: newInquiry
    });

  } catch (error) {
    console.error('문의 생성 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// PUT: 문의 업데이트
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: '문의 ID가 필요합니다'
      }, { status: 400 });
    }

    const body = await request.json();
    const updateData = updateInquirySchema.parse(body);

    const inquiryIndex = inquiries.findIndex(inquiry => inquiry.id === id);
    
    if (inquiryIndex === -1) {
      return NextResponse.json({
        success: false,
        message: '문의를 찾을 수 없습니다'
      }, { status: 404 });
    }

    // 문의 업데이트
    inquiries[inquiryIndex] = {
      ...inquiries[inquiryIndex],
      ...updateData,
      updatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 업데이트되었습니다',
      data: inquiries[inquiryIndex]
    });

  } catch (error) {
    console.error('문의 업데이트 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// DELETE: 문의 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: '문의 ID가 필요합니다'
      }, { status: 400 });
    }

    const inquiryIndex = inquiries.findIndex(inquiry => inquiry.id === id);
    
    if (inquiryIndex === -1) {
      return NextResponse.json({
        success: false,
        message: '문의를 찾을 수 없습니다'
      }, { status: 404 });
    }

    const deletedInquiry = inquiries.splice(inquiryIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 삭제되었습니다',
      data: deletedInquiry
    });

  } catch (error) {
    console.error('문의 삭제 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
