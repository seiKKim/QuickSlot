import { NextRequest, NextResponse } from 'next/server';

// 통계 데이터 타입
interface DashboardStats {
  overview: {
    totalUsers: number;
    totalInquiries: number;
    totalChats: number;
    activeUsers: number;
  };
  inquiries: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  chats: {
    total: number;
    active: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    averageResponseTime: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    banned: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
  };
  services: {
    camping: number;
    concert: number;
    medical: number;
    education: number;
  };
  trends: {
    dailyInquiries: Array<{ date: string; count: number }>;
    dailyChats: Array<{ date: string; count: number }>;
    dailyUsers: Array<{ date: string; count: number }>;
  };
}

// 임시 통계 데이터 (실제 운영에서는 데이터베이스에서 계산)
const generateMockStats = (): DashboardStats => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // 최근 7일간의 데이터 생성
  const dailyData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    dailyData.push({
      date: dateStr,
      inquiries: Math.floor(Math.random() * 20) + 5,
      chats: Math.floor(Math.random() * 15) + 3,
      users: Math.floor(Math.random() * 8) + 1
    });
  }

  return {
    overview: {
      totalUsers: 1247,
      totalInquiries: 3421,
      totalChats: 1893,
      activeUsers: 156
    },
    inquiries: {
      total: 3421,
      pending: 23,
      inProgress: 45,
      completed: 3320,
      cancelled: 33,
      today: 12,
      thisWeek: 89,
      thisMonth: 234
    },
    chats: {
      total: 1893,
      active: 8,
      today: 15,
      thisWeek: 67,
      thisMonth: 189,
      averageResponseTime: 2.3 // 분
    },
    users: {
      total: 1247,
      active: 1156,
      inactive: 78,
      banned: 13,
      newToday: 5,
      newThisWeek: 23,
      newThisMonth: 67
    },
    services: {
      camping: 1245,
      concert: 987,
      medical: 654,
      education: 535
    },
    trends: {
      dailyInquiries: dailyData.map(d => ({ date: d.date, count: d.inquiries })),
      dailyChats: dailyData.map(d => ({ date: d.date, count: d.chats })),
      dailyUsers: dailyData.map(d => ({ date: d.date, count: d.users }))
    }
  };
};

// GET: 대시보드 통계 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week'; // day, week, month, year
    const type = searchParams.get('type') || 'overview'; // overview, inquiries, chats, users, services, trends

    const stats = generateMockStats();

    // 기간별 필터링
    let filteredStats = stats;
    
    if (period === 'day') {
      // 오늘 데이터만
      filteredStats = {
        ...stats,
        trends: {
          dailyInquiries: stats.trends.dailyInquiries.slice(-1),
          dailyChats: stats.trends.dailyChats.slice(-1),
          dailyUsers: stats.trends.dailyUsers.slice(-1)
        }
      };
    } else if (period === 'month') {
      // 최근 30일 데이터
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      filteredStats = {
        ...stats,
        trends: {
          dailyInquiries: stats.trends.dailyInquiries.filter(d => new Date(d.date) >= thirtyDaysAgo),
          dailyChats: stats.trends.dailyChats.filter(d => new Date(d.date) >= thirtyDaysAgo),
          dailyUsers: stats.trends.dailyUsers.filter(d => new Date(d.date) >= thirtyDaysAgo)
        }
      };
    }

    // 타입별 응답
    switch (type) {
      case 'overview':
        return NextResponse.json({
          success: true,
          data: {
            overview: filteredStats.overview,
            inquiries: filteredStats.inquiries,
            chats: filteredStats.chats,
            users: filteredStats.users
          }
        });

      case 'inquiries':
        return NextResponse.json({
          success: true,
          data: filteredStats.inquiries
        });

      case 'chats':
        return NextResponse.json({
          success: true,
          data: filteredStats.chats
        });

      case 'users':
        return NextResponse.json({
          success: true,
          data: filteredStats.users
        });

      case 'services':
        return NextResponse.json({
          success: true,
          data: filteredStats.services
        });

      case 'trends':
        return NextResponse.json({
          success: true,
          data: filteredStats.trends
        });

      default:
        return NextResponse.json({
          success: true,
          data: filteredStats
        });
    }

  } catch (error) {
    console.error('대시보드 통계 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// POST: 통계 데이터 새로고침
export async function POST(request: NextRequest) {
  try {
    // 실제 운영에서는 캐시된 통계 데이터를 새로고침
    const stats = generateMockStats();

    return NextResponse.json({
      success: true,
      message: '통계 데이터가 새로고침되었습니다',
      data: stats
    });

  } catch (error) {
    console.error('통계 데이터 새로고침 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
