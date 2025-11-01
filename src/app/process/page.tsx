import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  MessageCircle,
  Phone,
  Shield,
  Star,
  User,
  Zap
} from 'lucide-react';
import { guarantees, processSteps } from '@/data/company';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import React from 'react';
import { services } from '@/data/services';

export default function ProcessPage() {
  const detailedSteps = [
    {
      ...processSteps[0],
      timeline: '소요시간: 10-30분',
      requirements: [
        '예약하고 싶은 서비스/장소 정보',
        '희망하는 날짜와 시간',
        '연락 가능한 전화번호',
        '이메일 주소'
      ],
      tips: [
        '구체적인 정보를 제공할수록 성공률이 높아집니다',
        '여러 날짜 옵션을 제공하시면 더 유리합니다',
        '특별한 요청사항이 있다면 미리 알려주세요'
      ]
    },
    {
      ...processSteps[1],
      timeline: '소요시간: 1-2시간',
      requirements: [
        '예약금 결제 (전체 대행료의 30%)',
        '개인정보 제공 동의',
        '서비스 이용약관 동의',
        '예약자 정보 확인'
      ],
      tips: [
        '담당자와의 소통 채널을 확인해주세요',
        '예약 진행 중 연락 가능한 시간을 알려주세요',
        '변경사항이 있으면 즉시 담당자에게 연락해주세요'
      ]
    },
    {
      ...processSteps[2],
      timeline: '서비스별 상이',
      requirements: [
        '잔액 결제 (나머지 70%)',
        '예약 확인서 수령',
        '서비스 이용 안내 확인',
        '후기 작성 (선택사항)'
      ],
      tips: [
        '예약 성공 시 즉시 연락드립니다',
        '예약 정보를 정확히 확인해주세요',
        '문제가 있으면 언제든지 연락주세요'
      ]
    }
  ];

  // 계좌이체만 지원
  const paymentMethod = {
    name: '계좌이체',
    description: '안전하고 빠른 계좌이체로 결제',
    icon: '🏦',
    details: [
      '실시간 계좌이체 지원',
      '모든 은행 계좌 이용 가능',
      '안전한 금융보안 시스템',
      '즉시 입금 확인 가능'
    ]
  };

  const serviceTimelines = [
    { service: '캠핑장 예약', time: '평균 2-3일', success: '98.5%', color: 'bg-green-500' },
    { service: '콘서트 티켓팅', time: '즉시 (오픈당일)', success: '94.2%', color: 'bg-purple-500' },
    { service: '병원 예약', time: '당일 ~ 3일', success: '96.8%', color: 'bg-blue-500' },
    { service: '교육 신청', time: '수강신청 당일', success: '99.1%', color: 'bg-indigo-500' }
  ];

  const commonQuestions = [
    {
      question: '예약금을 지불한 후 취소하고 싶다면?',
      answer: '예약 착수 전까지는 언제든지 취소가 가능하며, 예약금은 전액 환불해드립니다. 예약 착수 후에는 취소가 어려우니 신중하게 결정해주세요.'
    },
    {
      question: '예약에 실패하면 어떻게 되나요?',
      answer: '예약에 실패할 경우 대행료는 전액 환불해드립니다. 환불은 실패 확정 후 3-5 영업일 내에 원결제 수단으로 처리됩니다.'
    },
    {
      question: '진행 상황을 어떻게 확인할 수 있나요?',
      answer: '카카오톡 또는 전화를 통해 실시간으로 진행상황을 공유해드립니다. 예약 시도 전 사전 안내, 진행 중 업데이트, 결과 즉시 통보 등 모든 과정을 투명하게 공유합니다.'
    }
  ];

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
              <span className="text-gray-900 font-medium">이용방법</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              메인으로 돌아가기
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              이용방법
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              QuickSlot 예약대행 서비스 이용방법을 단계별로 자세히 안내해드립니다.<br />
              간단한 3단계로 원하는 예약을 완료하세요.
            </p>

            {/* 핵심 메시지 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 처리</h3>
                  <p className="text-gray-600 text-sm">평균 처리시간 단축으로 빠른 예약 완료</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">안전한 거래</h3>
                  <p className="text-gray-600 text-sm">투명한 결제 시스템과 환불 보장</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="text-purple-600" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">높은 성공률</h3>
                  <p className="text-gray-600 text-sm">전문 시스템으로 99% 이상 성공률 달성</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 상세 이용 과정 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                상세 이용 과정
              </h2>
              <p className="text-lg text-gray-600">
                각 단계별로 필요한 준비사항과 진행 과정을 자세히 안내해드립니다
              </p>
            </div>

            <div className="space-y-16">
              {detailedSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* 연결선 */}
                  {index < detailedSteps.length - 1 && (
                    <div className="hidden lg:block absolute left-8 top-20 w-1 h-32 bg-gray-200"></div>
                  )}

                  <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                    {/* 단계 아이콘 */}
                    <div className="lg:col-span-2 mb-6 lg:mb-0">
                      <div className="flex items-center lg:flex-col lg:items-center">
                        <div className={`${step.color} rounded-full w-16 h-16 flex items-center justify-center mr-4 lg:mr-0 lg:mb-4 relative z-10`}>
                          {React.createElement(step.icon, { className: "w-8 h-8" })}
                        </div>
                        <div className="lg:text-center">
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.step}단계
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {step.timeline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 단계 내용 */}
                    <div className="lg:col-span-10">
                      <div className="bg-gray-50 rounded-2xl p-8">
                        <div className="mb-6">
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">
                            {step.title}
                          </h4>
                          <p className="text-lg text-gray-600">
                            {step.description}
                          </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* 필요 준비사항 */}
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <FileText className="text-blue-600 mr-2" size={20} />
                              필요 준비사항
                            </h5>
                            <ul className="space-y-3">
                              {step.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-start">
                                  <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={16} />
                                  <span className="text-gray-700 text-sm">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 유용한 팁 */}
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Star className="text-yellow-500 mr-2" size={20} />
                              유용한 팁
                            </h5>
                            <ul className="space-y-3">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 결제 방법 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                결제 방법
              </h2>
              <p className="text-lg text-gray-600">
                안전하고 간편한 계좌이체로 결제하세요
              </p>
            </div>

            {/* 계좌이체 전용 카드 */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center border-2 border-blue-200">
                <div className="text-6xl mb-6">{paymentMethod.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {paymentMethod.name}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {paymentMethod.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethod.details.map((detail, index) => (
                    <div key={index} className="flex items-center text-left">
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 결제 정책 */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-6 text-center">
                💳 결제 정책
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="text-blue-600 mr-2" size={20} />
                    예약금 (30%)
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 서비스 착수 전 계좌이체</li>
                    <li>• 예약 확정을 위한 보증금</li>
                    <li>• 착수 전 취소 시 전액 환불</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={20} />
                    잔액 (70%)
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 예약 성공 후 계좌이체</li>
                    <li>• 예약 확인서 발급 후</li>
                    <li>• 실패 시 예약금까지 전액 환불</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 서비스별 소요시간 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                서비스별 처리 시간
              </h2>
              <p className="text-lg text-gray-600">
                각 서비스별 평균 처리 시간과 성공률을 확인해보세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceTimelines.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.service}
                    </h3>
                    <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">처리 시간</span>
                      <span className="font-semibold text-gray-900">{service.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">성공률</span>
                      <span className="font-semibold text-green-600">{service.success}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${service.color}`}
                        style={{ width: service.success }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                이용과정 관련 자주 묻는 질문
              </h2>
              <p className="text-lg text-gray-600">
                이용 과정에서 궁금할 수 있는 점들을 미리 확인해보세요
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {commonQuestions.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold px-2 py-1 rounded mr-3 mt-0.5">
                      Q{index + 1}
                    </span>
                    {item.question}
                  </h3>
                  <div className="ml-12">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/faq" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                더 많은 FAQ 보기
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* 보장 정책 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Shield className="text-blue-600 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  안심 보장 정책
                </h2>
                <p className="text-blue-700">
                  고객님의 안전한 서비스 이용을 위한 보장 정책입니다
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="text-blue-600 mt-1">
                        {React.createElement(guarantee.icon, { className: "w-6 h-6" })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">
                          {guarantee.title}
                        </h3>
                        <p className="text-blue-700 text-sm">
                          {guarantee.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              이제 시작해보세요!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              간단한 3단계로 원하는 예약을 완료하세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                상담 신청하기
              </a>
              <Link href="/#services" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                서비스 둘러보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}