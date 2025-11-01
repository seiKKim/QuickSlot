'use client';

import { AlertTriangle, ArrowLeft, CheckCircle, Clock, FileText, Mail, MessageCircle, Phone, Send, Shield, User } from 'lucide-react';
import React, { useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';

interface SimpleFormData {
  service: string;
  urgency: 'normal' | 'urgent';
  message: string;
  contactMethod: 'kakao' | 'email';
  customerEmail?: string; // 고객 이메일 추가 (선택사항)
}

export default function SafeContactPage() {
  const [formData, setFormData] = useState<SimpleFormData>({
    service: '',
    urgency: 'normal',
    message: '',
    contactMethod: 'kakao',
    customerEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { value: '', label: '서비스를 선택해주세요' },
    { value: 'camping', label: '🏕️ 캠핑장 예약' },
    { value: 'concert', label: '🎵 콘서트 티켓팅' },
    { value: 'medical', label: '🏥 병원 예약' },
    { value: 'education', label: '📚 교육 신청' },
    { value: 'pension', label: '🏠 펜션 예약' },
    { value: 'hotel', label: '🏨 호텔 예약' },
    { value: 'flight', label: '✈️ 항공 예약' },
    { value: 'restaurant', label: '🍽️ 식당 예약' },
    { value: 'golf', label: '⛳ 골프장 예약' },
    { value: 'other', label: '🎯 기타 문의' }
  ];

  // 서비스별 맞춤형 질문 템플릿
  const serviceTemplates = {
    camping: `🏕️ 캠핑장 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

📍 예약하고 싶은 캠핑장:
(예: 설악산국립공원 백담사 야영장)

📅 이용 날짜:
(예: 2024년 4월 13일 ~ 14일, 1박 2일)

👥 인원:
(예: 성인 2명, 어린이 1명)

🏕️ 사이트 선호사항:
□ 전기 사이트
□ 일반 사이트
□ 오토캠핑
□ 글램핑

🐕 기타 요청사항:
(예: 애완동물 동반, 차량 크기, 장비 대여 등)

💬 추가 문의사항:`,

    concert: `🎵 콘서트 티켓팅 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

🎤 아티스트/공연명:
(예: 아이유 2024 월드투어)

📅 공연 날짜:
(예: 2024년 4월 20일 또는 여러 날짜 중 아무나)

📍 공연 장소:
(예: 잠실실내체육관, 고척스카이돔)

🎫 희망 좌석:
□ VIP석
□ R석  
□ S석
□ A석
□ 좌석 상관없음

👥 필요 매수:
(예: 2매)

💰 예산:
(예: 매당 20만원 이하)

💬 추가 요청사항:
(예: 연석 희망, 특정 구역 선호 등)`,

    medical: `🏥 병원 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

🏥 병원명:
(예: 서울대학교병원, 삼성서울병원)

👨‍⚕️ 진료과/의료진:
(예: 내과, 정형외과, 특정 교수님)

📅 희망 날짜:
(예: 2024년 4월 15일 또는 가능한 빠른 날짜)

⏰ 희망 시간대:
□ 오전 (9시-12시)
□ 오후 (1시-5시)
□ 시간 상관없음

🩺 진료 목적:
□ 건강검진
□ 특정 증상 상담
□ 수술 상담
□ 정기 검진
□ 응급진료

💬 추가 정보:
(예: 증상, 기존 진료 이력, 특이사항 등)`,

    education: `📚 교육 신청 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

📖 교육/시험명:
(예: 토익, 토플, 공무원 시험, 자격증 시험)

📅 시험/교육 날짜:
(예: 2024년 4월 20일 또는 가장 빠른 날짜)

📍 희망 지역/장소:
(예: 서울, 부산, 온라인)

⏰ 희망 시간대:
□ 오전
□ 오후  
□ 주말
□ 평일

📝 신청 목적:
□ 취업 준비
□ 승진/이직
□ 유학 준비
□ 자기계발
□ 기타

💬 추가 요청사항:
(예: 특정 등급 목표, 재시험 여부 등)`,

    pension: `🏠 펜션 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

🏡 예약하고 싶은 펜션:
(예: 가평 글램핑 펜션, 제주 오션뷰 펜션)

📅 이용 날짜:
(예: 2024년 4월 13일 ~ 14일, 1박 2일)

👥 인원:
(예: 성인 4명, 어린이 2명)

🛏️ 객실 타입:
□ 복층형
□ 원룸형
□ 독채
□ 글램핑

🌊 선호 환경:
□ 바다 전망
□ 산 전망
□ 계곡 근처
□ 도심 접근성

💬 추가 요청사항:
(예: 바베큐 시설, 수영장, 애완동물 동반 등)`,

    hotel: `🏨 호텔 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

🏨 호텔명/지역:
(예: 롯데호텔 월드, 제주 신라호텔, 강남 지역)

📅 체크인/체크아웃:
(예: 4월 13일 체크인 ~ 4월 15일 체크아웃)

👥 숙박 인원:
(예: 성인 2명, 어린이 1명)

🛏️ 객실 타입:
□ 스탠다드룸
□ 디럭스룸
□ 스위트룸
□ 이그제큐티브

🌅 객실 뷰:
□ 시티뷰
□ 오션뷰
□ 마운틴뷰
□ 상관없음

💰 예산:
(예: 1박당 30만원 이하)

💬 특별 요청사항:
(예: 기념일, 조식 포함, 늦은 체크아웃 등)`,

    flight: `✈️ 항공 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

✈️ 출발지 → 도착지:
(예: 인천(ICN) → 도쿄(NRT))

📅 출발 날짜:
(예: 2024년 4월 20일)

📅 귀국 날짜:
(예: 2024년 4월 25일 또는 편도)

👥 탑승객:
(예: 성인 2명, 어린이 1명, 유아 1명)

💺 좌석 등급:
□ 이코노미
□ 프리미엄 이코노미
□ 비즈니스
□ 퍼스트

⏰ 선호 시간:
□ 오전 출발
□ 오후 출발
□ 심야 출발
□ 시간 상관없음

💰 예산:
(예: 1인당 50만원 이하)

💬 추가 요청사항:
(예: 직항 선호, 특정 항공사, 마일리지 적립 등)`,

    restaurant: `🍽️ 식당 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

🍽️ 식당명/지역:
(예: 미슐랭 레스토랑, 청담동 맛집, 뷔페)

📅 예약 날짜:
(예: 2024년 4월 14일)

⏰ 예약 시간:
(예: 저녁 7시, 점심 12시)

👥 인원:
(예: 4명)

🎉 방문 목적:
□ 생일/기념일
□ 비즈니스 미팅
□ 가족 모임
□ 데이트
□ 일반 식사

🍴 음식 종류:
□ 한식
□ 일식
□ 중식
□ 양식
□ 뷔페

💰 예산:
(예: 1인당 10만원 이하)

💬 특별 요청사항:
(예: 룸 예약, 케이크 준비, 알레르기 등)`,

    golf: `⛳ 골프장 예약 문의

다음 정보를 작성해주시면 더 정확한 상담이 가능합니다:

⛳ 골프장명/지역:
(예: 안양CC, 경기 남부 지역)

📅 라운딩 날짜:
(예: 2024년 4월 20일 토요일)

⏰ 선호 시간:
□ 오전 (7-10시)
□ 오후 (12-15시)
□ 시간 상관없음

👥 인원:
(예: 4명, 3명)

🏌️ 플레이어 정보:
(예: 평균 스코어, 초보자 포함 여부)

💰 예산:
(예: 1인당 15만원 이하)

🚗 부대시설:
□ 카트 포함
□ 캐디 요청
□ 식사 포함
□ 사우나/목욕탕

💬 추가 요청사항:
(예: 연습장 이용, 특정 코스 선호 등)`,

    other: `🎯 기타 문의

아래 항목들을 참고하여 문의 내용을 작성해주세요:

📝 문의 유형:
□ 새로운 서비스 요청
□ 기존 예약 변경/취소
□ 요금/결제 문의
□ 서비스 이용 방법
□ 파트너십/제휴 문의
□ 기타

📋 상세 내용:
(구체적인 문의 사항을 작성해주세요)

📅 희망 일정:
(관련된 날짜가 있다면 기재해주세요)

💬 추가 정보:
(도움이 될 만한 기타 정보)`
  };

  const getPlaceholderText = () => {
    if (!formData.service) {
      return "먼저 서비스를 선택해주시면 맞춤형 질문지가 제공됩니다.";
    }
    
    return serviceTemplates[formData.service as keyof typeof serviceTemplates] || 
           "문의 내용을 자유롭게 작성해주세요.";
  };

  const contactMethods = [
    {
      id: 'kakao',
      name: '카카오톡 상담',
      icon: MessageCircle,
      description: '실시간 빠른 상담 (추천)',
      color: 'bg-yellow-400 text-gray-900',
      available: '24시간 상담 가능'
    },
    {
      id: 'email',
      name: '이메일 문의',
      icon: Mail,
      description: '상세한 문의사항',
      color: 'bg-blue-600 text-white',
      available: '24시간 내 답변'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 서비스 선택 시 문의 내용을 템플릿으로 자동 설정
    if (name === 'service' && value && serviceTemplates[value as keyof typeof serviceTemplates]) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        message: serviceTemplates[value as keyof typeof serviceTemplates]
      }));
    }
  };

  const handleContactMethodSelect = (method: 'kakao' | 'email') => {
    setFormData(prev => ({
      ...prev,
      contactMethod: method
    }));
  };

  const generateInquiryText = () => {
    const serviceLabel = serviceOptions.find(s => s.value === formData.service)?.label || '미선택';
    const urgencyLabel = formData.urgency === 'urgent' ? '[긴급] ' : '';
    
    return `${urgencyLabel}${serviceLabel} 문의

${formData.message}

---
문의 생성 시간: ${new Date().toLocaleString('ko-KR')}
선호 연락 방법: ${contactMethods.find(c => c.id === formData.contactMethod)?.name}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service || !formData.message.trim()) {
      alert('서비스 선택과 문의 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // API로 이메일 발송
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.service,
          urgency: formData.urgency,
          message: formData.message,
          contactMethod: formData.contactMethod,
          customerEmail: formData.customerEmail || undefined
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '문의 발송에 실패했습니다');
      }

      // 성공 시 결과 페이지로 이동
      setIsSubmitted(true);
      
      console.log('문의 발송 성공:', result);
      
    } catch (error) {
      console.error('문의 발송 오류:', error);
      
      // 오류 발생 시 기존 클립보드 복사 방식으로 폴백
      try {
        const inquiryText = generateInquiryText();
        await navigator.clipboard.writeText(inquiryText);
        setIsSubmitted(true);
      } catch (clipboardError) {
        alert('문의 발송에 실패했습니다. 카카오톡으로 직접 문의해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const inquiryText = generateInquiryText();
    const selectedMethod = contactMethods.find(c => c.id === formData.contactMethod);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="bg-white rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-lg border border-gray-100">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                문의 발송 완료
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                문의가 <span className="text-blue-600">성공적으로 발송</span>되었습니다!
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                관리자에게 이메일이 발송되었으며, 빠른 시일 내에 연락드리겠습니다.<br />
                {formData.customerEmail && '확인 메일도 발송되었습니다!'}
              </p>
            </div>

            {/* 생성된 문의 내용 */}
            <div className="bg-white rounded-xl p-8 mb-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="text-blue-600" size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">문의 내용</h3>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(inquiryText)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  📋 복사하기
                </button>
              </div>
              <textarea
                value={inquiryText}
                readOnly
                rows={8}
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono resize-none"
              />
            </div>

            {/* 선택된 연락 방법 안내 */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                선택하신 연락 방법으로 문의해주세요
              </h3>
              
              <div className={`${selectedMethod?.color} rounded-xl p-8 text-center mb-6`}>
                {selectedMethod && React.createElement(selectedMethod.icon, { size: 48, className: "mx-auto mb-4" })}
                <h4 className="text-2xl font-bold mb-2">{selectedMethod?.name}</h4>
                <p className="text-lg opacity-90 mb-4">{selectedMethod?.available}</p>
                
                {formData.contactMethod === 'kakao' && (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold">카카오톡 ID: @quickslot</p>
                    <button 
                      onClick={() => window.open('https://pf.kakao.com/_quickslot', '_blank')}
                      className="bg-black bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      카카오톡으로 문의하기
                    </button>
                  </div>
                )}
                
                {formData.contactMethod === 'email' && (
                  <div className="space-y-3">
                    <p className="text-xl font-bold">📧 contact@quickslot.co.kr</p>
                    <p className="opacity-90">24시간 내 답변 드립니다</p>
                    <button 
                      onClick={() => window.open(`mailto:contact@quickslot.co.kr?subject=${encodeURIComponent(`[문의] ${serviceOptions.find(s => s.value === formData.service)?.label}`)}&body=${encodeURIComponent(inquiryText)}`)}
                      className="bg-black bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      이메일 보내기
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
                <p className="text-blue-800 text-sm">
                  💡 위의 문의 내용을 복사해서 선택하신 방법으로 전달해주시면 더 빠른 상담이 가능합니다.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 text-center">
                홈으로 돌아가기
              </Link>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    service: '',
                    urgency: 'normal',
                    message: '',
                    contactMethod: 'kakao',
                    customerEmail: ''
                  });
                }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 text-center"
              >
                새 문의 작성
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">문의하기</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              메인으로 돌아가기
            </Link>

            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white shadow-lg border border-blue-100 rounded-full text-sm font-medium text-gray-800 mb-6">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                안전한 문의 시스템
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">문의하기</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                개인정보 입력 없이 간편하게 문의하세요.<br />
                문의 내용을 작성하면 선택하신 방법으로 연락할 수 있는 안내를 제공합니다.
              </p>
            </div>

            {/* 개인정보 보호 안내 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">개인정보 보호</h3>
              </div>
              <p className="text-gray-600 text-lg">
                이 페이지에서는 개인정보를 수집하지 않습니다. 문의 내용만 작성하시면 안전하게 상담받으실 수 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">카카오톡 상담</h3>
                <p className="text-gray-600 mb-4">실시간 빠른 상담</p>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-blue-600 font-semibold">24시간 상담 가능</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">이메일 문의</h3>
                <p className="text-gray-600 mb-4">상세한 문의사항</p>
                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                  <p className="text-indigo-600 font-semibold">24시간 내 답변</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 문의 작성 섹션 */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700 mb-6">
                  <FileText className="w-4 h-4 mr-2" />
                  문의 작성
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  <span className="text-blue-600">문의 내용</span>을 작성해주세요
                </h2>
                <p className="text-lg text-gray-600">
                  서비스를 선택하시면 맞춤형 질문지가 제공됩니다
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 서비스 선택 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    문의하실 서비스를 선택해주세요 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg transition-colors"
                    required
                  >
                    {serviceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 문의 유형 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    문의 유형
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={formData.urgency === 'normal'}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">일반 문의</div>
                        <div className="text-sm text-gray-600">24시간 내 답변</div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-orange-300 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors">
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={formData.urgency === 'urgent'}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <div>
                        <div className="font-medium text-orange-900">긴급 문의</div>
                        <div className="text-sm text-orange-700">2시간 내 답변</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    문의 내용을 상세히 작성해주세요 <span className="text-red-500">*</span>
                  </label>
                  
                  {/* 서비스 선택 안내 */}
                  {!formData.service && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 text-sm flex items-center">
                        <FileText className="mr-2" size={16} />
                        위에서 서비스를 먼저 선택하시면 맞춤형 질문지가 자동으로 제공됩니다!
                      </p>
                    </div>
                  )}

                  {/* 템플릿 적용 안내 */}
                  {formData.service && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-800 text-sm flex items-center">
                        <CheckCircle className="mr-2" size={16} />
                        {serviceOptions.find(s => s.value === formData.service)?.label} 맞춤형 질문지가 적용되었습니다. 
                        필요한 부분만 작성하시면 됩니다!
                      </p>
                    </div>
                  )}

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical font-mono text-sm text-gray-900 placeholder-gray-600"
                    placeholder={getPlaceholderText()}
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      💡 체크박스(□)는 해당하는 항목에 ✓ 표시해주세요
                    </p>
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/2000자
                    </p>
                  </div>
                </div>

                {/* 선택사항: 고객 이메일 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="text-blue-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      이메일 확인 받기 (선택사항)
                    </h3>
                  </div>
                  <p className="text-blue-700 text-sm mb-4">
                    이메일 주소를 입력하시면 문의 접수 확인 메일을 보내드립니다.
                  </p>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-600"
                    placeholder="your@email.com (선택사항)"
                  />
                  <p className="text-blue-600 text-xs mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    입력하지 않아도 문의는 정상적으로 접수됩니다
                  </p>
                </div>

                {/* 연락 방법 선택 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-6">
                    선호하는 연락 방법을 선택해주세요
                  </label>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {contactMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          formData.contactMethod === method.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method.id}
                          checked={formData.contactMethod === method.id}
                          onChange={(e) => handleContactMethodSelect(e.target.value as any)}
                          className="sr-only"
                        />
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                          formData.contactMethod === method.id ? 'bg-blue-600' : 'bg-gray-100'
                        }`}>
                          <method.icon 
                            size={32} 
                            className={formData.contactMethod === method.id ? 'text-white' : 'text-gray-600'} 
                          />
                        </div>
                        <h4 className={`font-bold text-lg mb-2 ${
                          formData.contactMethod === method.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {method.name}
                        </h4>
                        <p className="text-sm text-center text-gray-600 mb-3">
                          {method.description}
                        </p>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          formData.contactMethod === method.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {method.available}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 안내 메시지 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <AlertTriangle className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3 text-lg">문의 전 확인사항</h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          개인정보는 수집하지 않으며, 문의 내용만 준비해드립니다
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          생성된 문의 내용을 복사해서 선택하신 방법으로 연락해주세요
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          상세한 정보를 제공해주실수록 정확한 상담이 가능합니다
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          긴급 문의는 카카오톡 상담을 추천드립니다
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.service || !formData.message.trim()}
                    className={`flex-1 flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 text-lg shadow-lg hover:shadow-xl ${
                      (isSubmitting || !formData.service || !formData.message.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        준비 중...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        이메일로 문의 발송하기
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        service: '',
                        urgency: 'normal',
                        message: '',
                        contactMethod: 'kakao',
                        customerEmail: ''
                      });
                    }}
                    className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    초기화
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white shadow-lg border border-blue-100 rounded-full text-sm font-medium text-gray-800 mb-6">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                자주 묻는 질문
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">FAQ</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                문의하기 전에 자주 묻는 질문을 확인해보세요
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    개인정보가 안전한가요?
                  </h3>
                </div>
                <p className="text-gray-600">
                  이 페이지에서는 개인정보를 전혀 수집하지 않습니다. 문의 내용만 작성하시면 됩니다.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    가장 빠른 상담 방법은?
                  </h3>
                </div>
                <p className="text-gray-600">
                  카카오톡 상담이 가장 빠르며, 24시간 실시간 상담이 가능합니다.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    문의 내용은 어떻게 활용되나요?
                  </h3>
                </div>
                <p className="text-gray-600">
                  작성하신 내용을 정리해서 복사 가능한 형태로 제공해드립니다.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    답변은 언제 받을 수 있나요?
                  </h3>
                </div>
                <p className="text-gray-600">
                  일반 문의는 24시간 내, 긴급 문의는 2시간 내 답변해드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}