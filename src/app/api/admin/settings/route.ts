import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 설정 데이터 타입
interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    timezone: string;
    language: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    adminNotifications: boolean;
  };
  chat: {
    enabled: boolean;
    autoResponse: boolean;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
    maxConcurrentChats: number;
  };
  security: {
    requireAuth: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
  maintenance: {
    mode: boolean;
    message: string;
    allowedIPs: string[];
  };
}

// 기본 설정값
const defaultSettings: SystemSettings = {
  general: {
    siteName: 'QuickSlot',
    siteDescription: '전문 예약대행 서비스',
    contactEmail: 'contact@quickslot.co.kr',
    contactPhone: '1588-0000',
    timezone: 'Asia/Seoul',
    language: 'ko'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    adminNotifications: true
  },
  chat: {
    enabled: true,
    autoResponse: true,
    workingHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Seoul'
    },
    maxConcurrentChats: 10
  },
  security: {
    requireAuth: true,
    sessionTimeout: 30, // 분
    maxLoginAttempts: 5,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    }
  },
  maintenance: {
    mode: false,
    message: '시스템 점검 중입니다. 잠시 후 다시 이용해주세요.',
    allowedIPs: ['127.0.0.1', '::1']
  }
};

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용)
let currentSettings: SystemSettings = { ...defaultSettings };

// 설정 업데이트 스키마
const updateSettingsSchema = z.object({
  general: z.object({
    siteName: z.string().optional(),
    siteDescription: z.string().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional()
  }).optional(),
  notifications: z.object({
    emailNotifications: z.boolean().optional(),
    smsNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
    adminNotifications: z.boolean().optional()
  }).optional(),
  chat: z.object({
    enabled: z.boolean().optional(),
    autoResponse: z.boolean().optional(),
    workingHours: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
      timezone: z.string().optional()
    }).optional(),
    maxConcurrentChats: z.number().min(1).max(100).optional()
  }).optional(),
  security: z.object({
    requireAuth: z.boolean().optional(),
    sessionTimeout: z.number().min(5).max(480).optional(),
    maxLoginAttempts: z.number().min(3).max(10).optional(),
    passwordPolicy: z.object({
      minLength: z.number().min(6).max(20).optional(),
      requireUppercase: z.boolean().optional(),
      requireLowercase: z.boolean().optional(),
      requireNumbers: z.boolean().optional(),
      requireSpecialChars: z.boolean().optional()
    }).optional()
  }).optional(),
  maintenance: z.object({
    mode: z.boolean().optional(),
    message: z.string().optional(),
    allowedIPs: z.array(z.string()).optional()
  }).optional()
});

// GET: 설정 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section'); // general, notifications, chat, security, maintenance

    if (section) {
      // 특정 섹션만 반환
      if (section in currentSettings) {
        return NextResponse.json({
          success: true,
          data: {
            [section]: currentSettings[section as keyof SystemSettings]
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          message: '존재하지 않는 설정 섹션입니다'
        }, { status: 400 });
      }
    }

    // 전체 설정 반환
    return NextResponse.json({
      success: true,
      data: currentSettings
    });

  } catch (error) {
    console.error('설정 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// PUT: 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updateData = updateSettingsSchema.parse(body);

    // 설정 업데이트
    if (updateData.general) {
      currentSettings.general = { ...currentSettings.general, ...updateData.general };
    }
    if (updateData.notifications) {
      currentSettings.notifications = { ...currentSettings.notifications, ...updateData.notifications };
    }
    if (updateData.chat) {
      // workingHours를 제외하고 나머지 속성만 업데이트
      const { workingHours, ...chatUpdate } = updateData.chat;
      currentSettings.chat = { 
        ...currentSettings.chat, 
        ...chatUpdate 
      };
      
      // workingHours는 별도로 처리 (undefined 필드는 기존 값 유지)
      if (workingHours) {
        currentSettings.chat.workingHours = {
          start: workingHours.start ?? currentSettings.chat.workingHours.start,
          end: workingHours.end ?? currentSettings.chat.workingHours.end,
          timezone: workingHours.timezone ?? currentSettings.chat.workingHours.timezone,
        };
      }
    }
    if (updateData.security) {
      currentSettings.security = { ...currentSettings.security, ...updateData.security };
      if (updateData.security.passwordPolicy) {
        currentSettings.security.passwordPolicy = { ...currentSettings.security.passwordPolicy, ...updateData.security.passwordPolicy };
      }
    }
    if (updateData.maintenance) {
      currentSettings.maintenance = { ...currentSettings.maintenance, ...updateData.maintenance };
    }

    return NextResponse.json({
      success: true,
      message: '설정이 성공적으로 업데이트되었습니다',
      data: currentSettings
    });

  } catch (error) {
    console.error('설정 업데이트 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

// POST: 설정 초기화
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { confirm } = body;

    if (!confirm) {
      return NextResponse.json({
        success: false,
        message: '설정 초기화를 확인해주세요'
      }, { status: 400 });
    }

    // 설정을 기본값으로 초기화
    currentSettings = { ...defaultSettings };

    return NextResponse.json({
      success: true,
      message: '설정이 기본값으로 초기화되었습니다',
      data: currentSettings
    });

  } catch (error) {
    console.error('설정 초기화 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
