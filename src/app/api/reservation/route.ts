import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createReservationSchema } from '@/lib/validations'
import { z } from 'zod'
import type { ApiResponse, Reservation } from '@/types/api'

// GET /api/reservations - 예약 목록 조회 (관리자/직원용)
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const service = searchParams.get('service')

    const skip = (page - 1) * limit

    // 필터 조건 구성
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (service) {
      where.service = {
        slug: service
      }
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          service: {
            select: {
              name: true,
              slug: true,
              description: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.reservation.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        reservations,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Reservations GET error:', error)
    return NextResponse.json(
      { success: false, error: '예약 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

// POST /api/reservations - 새 예약 요청
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()
    
    // 데이터 검증
    const validatedData = createReservationSchema.parse(body)

    // 사용자 생성 또는 조회
    let user = await prisma.user.findUnique({
      where: { email: validatedData.email || validatedData.name + '@temp.com' }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email || `${validatedData.name}@temp.com`,
          phone: validatedData.phone
        }
      })
    }

    // 서비스 조회
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId }
    })

    if (!service) {
      return NextResponse.json(
        { success: false, error: '존재하지 않는 서비스입니다' },
        { status: 400 }
      )
    }

    // 예약 생성
    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        targetDate: validatedData.targetDate ? new Date(validatedData.targetDate) : null,
        targetLocation: validatedData.targetLocation,
        notes: validatedData.notes,
        urgency: validatedData.urgency || 'normal',
        totalAmount: 0, // 추후 계산
        depositAmount: 0, // 추후 계산
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        service: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    // TODO: 관리자에게 새 예약 요청 알림
    // TODO: 고객에게 접수 확인 이메일 발송

    return NextResponse.json({
      success: true,
      message: '예약 요청이 성공적으로 접수되었습니다',
      data: {
        id: reservation.id,
        status: reservation.status,
        service: reservation.service,
        estimatedResponse: '영업일 기준 1-2일 내 연락드리겠습니다'
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

    console.error('Reservation POST error:', error)
    return NextResponse.json(
      { success: false, error: '예약 요청 처리에 실패했습니다' },
      { status: 500 }
    )
  }
}