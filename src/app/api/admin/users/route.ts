import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 사용자 데이터 타입
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'banned';
  createdAt: Date;
  lastLoginAt?: Date;
  totalInquiries: number;
  totalChats: number;
  preferences: {
    notifications: boolean;
    language: string;
    theme: string;
  };
}

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용)
const users: User[] = [
  {
    id: 'user_001',
    name: '김민수',
    email: 'minsu@example.com',
    phone: '010-1234-5678',
    role: 'user',
    status: 'active',
    createdAt: new Date('2025-01-10T09:00:00'),
    lastLoginAt: new Date('2025-01-15T14:30:00'),
    totalInquiries: 3,
    totalChats: 5,
    preferences: {
      notifications: true,
      language: 'ko',
      theme: 'light'
    }
  },
  {
    id: 'user_002',
    name: '이영희',
    email: 'younghee@example.com',
    phone: '010-9876-5432',
    role: 'user',
    status: 'active',
    createdAt: new Date('2025-01-12T11:15:00'),
    lastLoginAt: new Date('2025-01-15T16:45:00'),
    totalInquiries: 1,
    totalChats: 2,
    preferences: {
      notifications: false,
      language: 'ko',
      theme: 'dark'
    }
  },
  {
    id: 'user_003',
    name: '박철수',
    email: 'chulsoo@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2025-01-08T16:20:00'),
    lastLoginAt: new Date('2025-01-13T10:15:00'),
    totalInquiries: 2,
    totalChats: 1,
    preferences: {
      notifications: true,
      language: 'ko',
      theme: 'light'
    }
  },
  {
    id: 'admin_001',
    name: '관리자',
    email: 'admin@quickslot.co.kr',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2025-01-01T00:00:00'),
    lastLoginAt: new Date('2025-01-15T17:00:00'),
    totalInquiries: 0,
    totalChats: 0,
    preferences: {
      notifications: true,
      language: 'ko',
      theme: 'light'
    }
  }
];

// 사용자 생성 스키마
const createUserSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  phone: z.string().optional(),
  role: z.enum(['user', 'admin', 'moderator']).default('user'),
  preferences: z.object({
    notifications: z.boolean().default(true),
    language: z.string().default('ko'),
    theme: z.string().default('light')
  }).optional()
});

// 사용자 업데이트 스키마
const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.enum(['user', 'admin', 'moderator']).optional(),
  status: z.enum(['active', 'inactive', 'banned']).optional(),
  preferences: z.object({
    notifications: z.boolean().optional(),
    language: z.string().optional(),
    theme: z.string().optional()
  }).optional()
});

// GET: 사용자 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    let filteredUsers = [...users];

    // 역할별 필터링
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // 상태별 필터링
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    // 검색 필터링
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.includes(search))
      );
    }

    // 정렬 (최신 가입순)
    filteredUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // 페이지네이션
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // 통계 정보
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      banned: users.filter(u => u.status === 'banned').length,
      admins: users.filter(u => u.role === 'admin').length,
      moderators: users.filter(u => u.role === 'moderator').length,
      regular_users: users.filter(u => u.role === 'user').length
    };

    return NextResponse.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          page,
          limit,
          total: filteredUsers.length,
          totalPages: Math.ceil(filteredUsers.length / limit)
        },
        stats
      }
    });

  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// POST: 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, preferences } = createUserSchema.parse(body);

    // 이메일 중복 확인
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: '이미 존재하는 이메일입니다'
      }, { status: 400 });
    }

    const newUser: User = {
      id: `user_${String(users.length + 1).padStart(3, '0')}`,
      name,
      email,
      phone,
      role: role || 'user',
      status: 'active',
      createdAt: new Date(),
      totalInquiries: 0,
      totalChats: 0,
      preferences: preferences || {
        notifications: true,
        language: 'ko',
        theme: 'light'
      }
    };

    users.push(newUser);

    return NextResponse.json({
      success: true,
      message: '사용자가 성공적으로 생성되었습니다',
      data: newUser
    });

  } catch (error) {
    console.error('사용자 생성 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// PUT: 사용자 업데이트
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: '사용자 ID가 필요합니다'
      }, { status: 400 });
    }

    const body = await request.json();
    const updateData = updateUserSchema.parse(body);

    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      }, { status: 404 });
    }

    // 이메일 중복 확인 (자신 제외)
    if (updateData.email && updateData.email !== users[userIndex].email) {
      const existingUser = users.find(user => user.email === updateData.email && user.id !== id);
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: '이미 존재하는 이메일입니다'
        }, { status: 400 });
      }
    }

    // 사용자 업데이트
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      preferences: updateData.preferences ? 
        { ...users[userIndex].preferences, ...updateData.preferences } : 
        users[userIndex].preferences
    };

    return NextResponse.json({
      success: true,
      message: '사용자가 성공적으로 업데이트되었습니다',
      data: users[userIndex]
    });

  } catch (error) {
    console.error('사용자 업데이트 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// DELETE: 사용자 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: '사용자 ID가 필요합니다'
      }, { status: 400 });
    }

    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      }, { status: 404 });
    }

    // 관리자 계정 삭제 방지
    if (users[userIndex].role === 'admin') {
      return NextResponse.json({
        success: false,
        message: '관리자 계정은 삭제할 수 없습니다'
      }, { status: 400 });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: '사용자가 성공적으로 삭제되었습니다',
      data: deletedUser
    });

  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
