import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServicesSchema } from '@/lib/validations'
import { Prisma } from '@prisma/client'
import type { 
  ApiResponse, 
  ServiceWithStats, 
  ServiceCreateInput,
  ServiceFilter 
} from '@/types/api'

// GET /api/services - 서비스 목록 조회
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<ServiceWithStats[]>>> {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')

    // 필터 조건 구성
    const where: Prisma.ServiceWhereInput = {}
    
    if (category) {
      where.category = category
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    } else {
      where.isActive = true // 기본적으로 활성화된 서비스만
    }

    const services = await prisma.service.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        pricing: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            reservations: true,
            testimonials: {
              where: {
                isPublic: true,
                isApproved: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // 서비스별 평균 평점 계산
    const servicesWithRating: ServiceWithStats[] = await Promise.all(
      services.map(async (service) => {
        const avgRating = await prisma.testimonial.aggregate({
          where: {
            serviceId: service.id,
            isPublic: true,
            isApproved: true
          },
          _avg: {
            rating: true
          }
        })

        return {
          id: service.id,
          name: service.name,
          slug: service.slug,
          description: service.description,
          category: service.category,
          pricing: service.pricing as Record<string, any>,
          isActive: service.isActive,
          createdAt: service.createdAt,
          averageRating: avgRating._avg.rating || 0,
          reservationCount: service._count.reservations,
          reviewCount: service._count.testimonials
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: servicesWithRating
    })

  } catch (error) {
    console.error('Services GET error:', error)
    return NextResponse.json(
      { success: false, error: '서비스 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

// POST /api/services - 새 서비스 생성 (관리자 전용)
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // TODO: 관리자 권한 체크
    
    const body: ServiceCreateInput = await request.json()
    
    const service = await prisma.service.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        category: body.category,
        pricing: body.pricing || {},
        isActive: body.isActive ?? true
      }
    })

    return NextResponse.json({
      success: true,
      message: '서비스가 성공적으로 생성되었습니다',
      data: service
    })

  } catch (error) {
    console.error('Service POST error:', error)
    
    // Prisma 에러 타입 체크
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { success: false, error: '이미 존재하는 서비스 이름 또는 슬러그입니다' },
          { status: 400 }
        )
      }
    }

    // 일반 에러 처리
    const errorMessage = error instanceof Error ? error.message : '서비스 생성에 실패했습니다'
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}