import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 간단한 관리자 인증 (실제 운영에서는 JWT, 세션 등 사용)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'quickslot2025', // 실제 운영에서는 환경변수 사용
  token: 'admin_token_' + Date.now()
};

const loginSchema = z.object({
  username: z.string().min(1, '사용자명을 입력하세요'),
  password: z.string().min(1, '비밀번호를 입력하세요')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    // 관리자 인증 확인
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        message: '로그인 성공',
        data: {
          token: ADMIN_CREDENTIALS.token,
          user: {
            username: ADMIN_CREDENTIALS.username,
            role: 'admin'
          }
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: '잘못된 사용자명 또는 비밀번호입니다'
    }, { status: 401 });

  } catch (error) {
    console.error('관리자 로그인 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (token === ADMIN_CREDENTIALS.token) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            username: ADMIN_CREDENTIALS.username,
            role: 'admin'
          }
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: '인증되지 않은 사용자입니다'
    }, { status: 401 });

  } catch (error) {
    console.error('관리자 인증 확인 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
