import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createInquirySchema } from '@/lib/validations'
import { z } from 'zod'
import type { ApiResponse } from '@/types/api'

// GET /api/inquiries - 문의 목록 조회 (관리자용)
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // 필터 조건 구성
    const where: any = {}
    
    if (status) {
      where.status = status
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.inquiry.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        inquiries,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Inquiries GET error:', error)
    return NextResponse.json(
      { success: false, error: '문의 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

// POST /api/inquiries - 새 문의 작성
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()
    
    // 데이터 검증
    const validatedData = createInquirySchema.parse(body)

    // 사용자 조회 (선택적)
    let user = null
    try {
      user = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })
    } catch (error) {
      // 사용자가 없어도 문의 작성 가능
    }

    // urgency 값을 Prisma enum 형식으로 변환 (normal -> NORMAL, urgent -> URGENT)
    const urgencyValue = validatedData.urgency === 'urgent' ? 'URGENT' : 'NORMAL';

    // 문의 생성
    const inquiry = await prisma.inquiry.create({
      data: {
        userId: user?.id,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        subject: validatedData.subject,
        message: validatedData.message,
        urgency: urgencyValue,
        status: 'PENDING'
      }
    })

    // TODO: 관리자에게 새 문의 알림
    // TODO: 고객에게 접수 확인 이메일 발송

    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다',
      data: {
        id: inquiry.id,
        status: inquiry.status,
        estimatedResponse: '영업일 기준 24시간 내 답변드리겠습니다'
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: '입력 데이터가 올바르지 않습니다',
          details: error.issues
        },
        { status: 400 }
      )
    }

    console.error('Inquiry POST error:', error)
    return NextResponse.json(
      { success: false, error: '문의 접수에 실패했습니다' },
      { status: 500 }
    )
  }
}