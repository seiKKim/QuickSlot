import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: 후기 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 파싱
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const service = searchParams.get("service") || "";
    const rating = parseInt(searchParams.get("rating") || "0");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "latest";

    // 필터 조건 설정
    const where: any = {
      isPublic: true,
      isApproved: true,
    };

    if (service) {
      where.service = {
        slug: service,
      };
    }

    if (rating > 0) {
      where.rating = {
        gte: rating,
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    // 정렬 조건 설정
    let orderBy: any = {};
    switch (sortBy) {
      case "latest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "rating-high":
        orderBy = { rating: "desc" };
        break;
      case "rating-low":
        orderBy = { rating: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // 데이터 조회
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
            },
          },
          service: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.testimonial.count({ where }),
    ]);

    // 개인정보 마스킹 (null 체크 포함)
    const maskedTestimonials = testimonials.map(
      (testimonial) => ({
        ...testimonial,
        user: testimonial.user ? {
          name: maskName(testimonial.user.name)
        } : null,
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        testimonials: maskedTestimonials,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Testimonials API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: 새 후기 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 유효성 검사
    const requiredFields = [
      "customerName",
      "email",
      "phone",
      "location",
      "service",
      "usageDate",
      "rating",
      "title",
      "content",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field}는 필수 항목입니다.` },
          { status: 400 }
        );
      }
    }

    // 평점 범위 검사
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, error: "평점은 1-5 사이여야 합니다." },
        { status: 400 }
      );
    }

    // 사용자 찾기 또는 생성
    let user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: body.customerName,
          email: body.email,
          phone: body.phone,
          location: body.location,
        },
      });
    }

    // 서비스 찾기
    const service = await prisma.service.findUnique({
      where: { slug: body.service },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "존재하지 않는 서비스입니다." },
        { status: 400 }
      );
    }

    // 후기 생성
    const testimonial = await prisma.testimonial.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        title: body.title,
        content: body.content,
        rating: body.rating,
        pros: body.pros || [],
        cons: body.cons || [],
        usageDate: new Date(body.usageDate),
        location: body.location,
        wouldRecommend: body.wouldRecommend ?? true,
        isPublic: body.allowPublic ?? true,
        isVerified: false, // 관리자 승인 필요
        isApproved: false, // 관리자 승인 필요
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    // TODO: 관리자에게 새 후기 알림 전송
    // TODO: 사용자에게 확인 이메일 전송

    return NextResponse.json({
      success: true,
      message: "후기가 성공적으로 제출되었습니다. 검토 후 공개됩니다.",
      data: {
        id: testimonial.id,
        status: "pending_approval",
      },
    });
  } catch (error) {
    console.error("Testimonial Creation Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 이름 마스킹 함수 (null/undefined 체크 포함)
function maskName(name: string | null | undefined): string {
  if (!name) return "익명";
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + "○";
  return name[0] + "○".repeat(name.length - 2) + name[name.length - 1];
}