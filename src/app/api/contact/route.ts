// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

// 문의 데이터 검증 스키마
const contactSchema = z.object({
  service: z.string().min(1, '서비스를 선택해주세요'),
  urgency: z.enum(['normal', 'urgent']),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요'),
  contactMethod: z.enum(['kakao', 'email']),
  customerEmail: z.string().email('올바른 이메일 형식이 아닙니다').optional()
});

// 서비스명 매핑
const SERVICE_NAMES: Record<string, string> = {
  camping: '🏕️ 캠핑장 예약',
  concert: '🎵 콘서트 티켓팅',
  medical: '🏥 병원 예약',
  education: '📚 교육 신청',
  pension: '🏠 펜션 예약',
  hotel: '🏨 호텔 예약',
  flight: '✈️ 항공 예약',
  restaurant: '🍽️ 식당 예약',
  golf: '⛳ 골프장 예약',
  other: '🎯 기타 문의'
};

// Nodemailer 설정
const createTransporter = () => {
  // Gmail SMTP 설정 (환경변수에서 가져오기)
return nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

  // 또는 다른 SMTP 서비스 사용 시
  // return nodemailer.createTransporter({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS
  //   }
  // });
};

// 관리자에게 보낼 이메일 HTML 템플릿
const generateAdminEmailHTML = (data: any) => {
  const serviceName = SERVICE_NAMES[data.service] || data.service;
  const urgencyBadge = data.urgency === 'urgent' 
    ? '<span style="background-color: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">🚨 긴급</span>'
    : '<span style="background-color: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">📝 일반</span>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #667eea; }
        .message-box { background: white; padding: 20px; margin: 15px 0; border-radius: 6px; white-space: pre-wrap; font-family: monospace; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎯 QuickSlot 새 문의</h2>
          <p>새로운 고객 문의가 접수되었습니다.</p>
        </div>
        
        <div class="content">
          <div class="info-box">
            <h3>📋 문의 정보</h3>
            <p><strong>서비스:</strong> ${serviceName}</p>
            <p><strong>문의 유형:</strong> ${urgencyBadge}</p>
            <p><strong>선호 연락방법:</strong> ${data.contactMethod === 'kakao' ? '📱 카카오톡' : '📧 이메일'}</p>
            <p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
            ${data.customerEmail ? `<p><strong>고객 이메일:</strong> ${data.customerEmail}</p>` : ''}
          </div>
          
          <div class="message-box">
            <h3>💬 문의 내용</h3>
            ${data.message}
          </div>
          
          <div style="text-align: center; margin: 20px 0;">
            ${data.urgency === 'urgent' 
              ? '<p style="color: #f59e0b; font-weight: bold;">⚠️ 긴급 문의입니다. 2시간 내 답변이 필요합니다.</p>'
              : '<p style="color: #10b981;">일반 문의입니다. 24시간 내 답변 예정입니다.</p>'
            }
          </div>
        </div>
        
        <div class="footer">
          <p>QuickSlot 예약대행 서비스 | 자동 발송 메일입니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 고객에게 보낼 확인 이메일 HTML 템플릿 (고객이 이메일을 제공한 경우)
const generateCustomerEmailHTML = (data: any) => {
  const serviceName = SERVICE_NAMES[data.service] || data.service;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .success-box { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; }
        .contact-methods { display: flex; gap: 15px; margin: 20px 0; }
        .contact-card { background: white; padding: 15px; border-radius: 6px; flex: 1; text-align: center; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✅ 문의가 접수되었습니다!</h2>
          <p>QuickSlot에서 빠르게 연락드리겠습니다.</p>
        </div>
        
        <div class="content">
          <div class="success-box">
            <h3>🎉 문의 접수 완료</h3>
            <p>${serviceName} 문의가 성공적으로 접수되었습니다.</p>
            <p><strong>접수번호:</strong> QS${Date.now().toString().slice(-8)}</p>
            <p><strong>접수시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          </div>
          
          <div class="info-box">
            <h3>📞 빠른 상담 받기</h3>
            <p>더 빠른 상담을 원하시면 아래 방법으로 직접 연락해주세요:</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; text-align: center;">
                <h4>📱 카카오톡 상담</h4>
                <p>ID: @quickslot</p>
                <p style="color: #92400e; font-size: 12px;">24시간 상담 가능</p>
              </div>
              <div style="background: #dbeafe; padding: 15px; border-radius: 6px; text-align: center;">
                <h4>📧 이메일 답변</h4>
                <p>contact@quickslot.co.kr</p>
                <p style="color: #1e40af; font-size: 12px;">24시간 내 답변</p>
              </div>
            </div>
          </div>
          
          <div class="info-box">
            <h3>⏰ 답변 예정 시간</h3>
            <p>${data.urgency === 'urgent' 
              ? '🚨 긴급 문의로 분류되어 <strong>2시간 내</strong> 연락드리겠습니다.'
              : '📝 일반 문의로 분류되어 <strong>24시간 내</strong> 연락드리겠습니다.'
            }</p>
          </div>
        </div>
        
        <div class="footer">
          <p>QuickSlot 예약대행 서비스 | 문의해주셔서 감사합니다!</p>
          <p>이 메일은 자동 발송된 메일입니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 데이터 검증
    const validatedData = contactSchema.parse(body);
    
    // 이메일 전송 설정
    const transporter = createTransporter();
    
    const serviceName = SERVICE_NAMES[validatedData.service] || validatedData.service;
    const urgencyPrefix = validatedData.urgency === 'urgent' ? '[긴급] ' : '';
    
    // 관리자에게 보낼 이메일
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || 'admin@quickslot.co.kr', // 관리자 이메일
      subject: `${urgencyPrefix}${serviceName} 문의 - QuickSlot`,
      html: generateAdminEmailHTML(validatedData),
      text: `
새로운 문의가 접수되었습니다.

서비스: ${serviceName}
문의 유형: ${validatedData.urgency === 'urgent' ? '긴급' : '일반'}
선호 연락방법: ${validatedData.contactMethod === 'kakao' ? '카카오톡' : '이메일'}
접수 시간: ${new Date().toLocaleString('ko-KR')}

문의 내용:
${validatedData.message}
      `
    };

    // 관리자에게 이메일 발송
    await transporter.sendMail(adminMailOptions);
    
    let customerEmailSent = false;
    
    // 고객이 이메일을 제공한 경우 확인 메일 발송
    if (validatedData.customerEmail) {
      try {
        const customerMailOptions = {
          from: process.env.SMTP_USER,
          to: validatedData.customerEmail,
          subject: `✅ 문의 접수 완료 - ${serviceName} | QuickSlot`,
          html: generateCustomerEmailHTML(validatedData),
          text: `
QuickSlot 문의가 접수되었습니다.

서비스: ${serviceName}
접수번호: QS${Date.now().toString().slice(-8)}
접수시간: ${new Date().toLocaleString('ko-KR')}

${validatedData.urgency === 'urgent' 
  ? '긴급 문의로 분류되어 2시간 내 연락드리겠습니다.'
  : '일반 문의로 분류되어 24시간 내 연락드리겠습니다.'
}

빠른 상담을 원하시면:
- 카카오톡: @quickslot (24시간 상담)
- 이메일: contact@quickslot.co.kr

감사합니다.
QuickSlot 팀
          `
        };
        
        await transporter.sendMail(customerMailOptions);
        customerEmailSent = true;
      } catch (error) {
        console.error('고객 이메일 발송 실패:', error);
        // 고객 이메일 실패해도 관리자 이메일은 성공했으므로 계속 진행
      }
    }
    
    // 문의 정보를 데이터베이스에 저장 (선택사항)
    // await saveContactToDatabase(validatedData);
    
    return NextResponse.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다',
      data: {
        contactId: `QS${Date.now().toString().slice(-8)}`,
        adminEmailSent: true,
        customerEmailSent,
        estimatedResponseTime: validatedData.urgency === 'urgent' ? '2시간 내' : '24시간 내'
      }
    });

  } catch (error) {
    console.error('문의 처리 오류:', error);

if (error instanceof z.ZodError) {
  return NextResponse.json({
    success: false,
    error: error.issues[0].message,
    details: error.issues
  }, { status: 400 });
}

    return NextResponse.json({
      success: false,
      error: '문의 처리 중 오류가 발생했습니다. 카카오톡으로 문의해주세요.'
    }, { status: 500 });
  }
}

// 환경변수 확인 함수 (개발용)
export async function GET() {
  const requiredEnvVars = [
    'SMTP_USER',
    'SMTP_PASS', 
    'ADMIN_EMAIL'
  ];
  
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    return NextResponse.json({
      error: '필수 환경변수가 설정되지 않았습니다',
      missing
    }, { status: 500 });
  }
  
  return NextResponse.json({
    message: '이메일 API가 정상적으로 설정되었습니다',
    configured: true
  });
}