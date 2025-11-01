import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/testimonials/[id]/helpful - 도움됨 표시
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // 후기 존재 확인
    const testimonial = await prisma.testimonial.findUnique({
      where: { id }
    })

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: '존재하지 않는 후기입니다' },
        { status: 404 }
      )
    }

    // 도움됨 카운트 증가
    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        helpfulCount: {
          increment: 1
        }
      },
      select: {
        id: true,
        helpfulCount: true
      }
    })

    return NextResponse.json({
      success: true,
      message: '도움됨으로 표시되었습니다',
      data: {
        id: updatedTestimonial.id,
        helpfulCount: updatedTestimonial.helpfulCount
      }
    })

  } catch (error) {
    console.error('Helpful API Error:', error)
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}