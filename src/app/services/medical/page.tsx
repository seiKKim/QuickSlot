import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Heart, MessageCircle, Shield, Star, Users } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import React from 'react';
import { getTestimonialsByService } from '@/data/testimonials';
import { services } from '@/data/services';

export default function MedicalPage() {
  const medicalService = services.medical;
  const medicalReviews = getTestimonialsByService('medical');

  const hospitalCategories = [
    { 
      name: '대학병원', 
      description: '서울대병원, 세브란스, 삼성서울병원 등',
      difficulty: '높음',
      color: 'bg-red-50 border-red-200 text-red-800',
      examples: ['서울대학교병원', '연세대 세브란스병원', '삼성서울병원']
    },
    { 
      name: '전문병원', 
      description: '특정 분야 전문 의료기관',
      difficulty: '보통',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      examples: ['강남세브란스병원', '서울아산병원', '고려대구로병원']
    },
    { 
      name: '종합병원', 
      description: '지역 거점 종합병원',
      difficulty: '낮음',
      color: 'bg-green-50 border-green-200 text-green-800',
      examples: ['분당서울대병원', '일산백병원', '부천성모병원']
    }
  ];

  const urgentServices = [
    { title: '당일 예약', description: '긴급하게 필요한 당일 진료 예약', time: '2-4시간 내' },
    { title: '응급 예약', description: '응급실 외 일반 진료 긴급 예약', time: '1-2시간 내' },
    { title: '특진 예약', description: '유명 의료진 특별 진료 예약', time: '당일-3일' }
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
              <Link href="/#services" className="hover:text-blue-600">서비스</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">병원 예약</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link 
                  href="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  메인으로 돌아가기
                </Link>
                
                <div className="flex items-center mb-4">
                  <div className="text-teal-600 mr-4">
                    {React.createElement(medicalService.icon, { className: "w-12 h-12" })}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {medicalService.title}
                  </h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-6">
                  {medicalService.description}
                </p>
                
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-teal-600">
                        {medicalService.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">성공률</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {medicalService.averageTime}
                      </div>
                      <div className="text-sm text-gray-600">평균 소요시간</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {medicalService.price.basic.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">기본 요금</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg p-4 mb-8">
                  <div className="flex items-center">
                    <Heart className="text-teal-600 mr-2" size={20} />
                    <span className="text-teal-800 font-semibold">
                      건강한 삶을 위한 첫걸음, 확실한 병원 예약으로 시작하세요
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary text-lg px-8 py-4 bg-teal-600 hover:bg-teal-700">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    카톡으로 상담하기
                  </button>
                </div>
              </div>

              <div className="lg:pl-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    의료진 맞춤 예약 시스템
                  </h3>
                  <div className="space-y-4">
                    {medicalService.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="text-teal-600 mr-2" size={16} />
                      <span className="font-semibold text-teal-900">의료진 정보 분석</span>
                    </div>
                    <p className="text-sm text-teal-700">
                      각 병원의 의료진 스케줄과 전문 분야를 분석하여 
                      최적의 예약 시간을 확보해드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 병원 카테고리 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                병원별 예약 현황
              </h2>
              <p className="text-lg text-gray-600">
                병원 유형별 예약 난이도와 대표 병원들입니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {hospitalCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${category.color}`}>
                      예약 난이도: {category.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {category.examples.map((hospital, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                          {hospital}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-teal-100 text-teal-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-teal-200 transition-colors">
                    예약 상담하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 긴급 예약 서비스 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                긴급 예약 서비스
              </h2>
              <p className="text-lg text-gray-600">
                응급한 상황에서도 빠르게 병원 예약을 도와드립니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {urgentServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Clock className="text-red-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <span className="text-red-800 font-semibold text-sm">
                        ⏱️ 처리 시간: {service.time}
                      </span>
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                      긴급 예약 신청
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">🚨 응급 상황 24시간 지원</h3>
              <p className="text-lg opacity-90 mb-6">
                응급한 병원 예약이 필요한 경우 24시간 언제든지 연락주세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  응급 상담하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 상세 설명 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  전문 병원 예약 대행 서비스
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {medicalService.details}
                </p>

                <div className="bg-teal-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-teal-900 mb-4">
                    🏥 이런 분들께 추천합니다
                  </h3>
                  <ul className="space-y-2 text-teal-700">
                    <li>• 유명 대학병원 진료를 받고 싶으신 분</li>
                    <li>• 특정 의료진의 진료가 필요하신 분</li>
                    <li>• 예약이 어려운 전문 클리닉을 이용하고 싶은 분</li>
                    <li>• 응급하게 병원 예약이 필요한 분</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-l-4 border-teal-500 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">🔍 의료진 전문성 분석</h4>
                  <p className="text-gray-600 text-sm">
                    각 의료진의 전문 분야와 진료 스케줄을 분석하여 
                    환자의 증상에 가장 적합한 의료진을 매칭해드립니다.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    지원 의료기관
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {medicalService.supportedPlatforms.map((platform, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-teal-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">{platform}</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            예약 가능
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg text-white">
                    <h4 className="font-semibold mb-2">💡 예약 성공 비법</h4>
                    <p className="text-sm opacity-90">
                      각 병원의 예약 시스템과 의료진 스케줄을 실시간으로 모니터링하여 
                      최적의 예약 시간을 찾아드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 요금 안내 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                병원 예약 요금 안내
              </h2>
              <p className="text-lg text-gray-600">
                병원 유형과 긴급도에 따른 합리적인 요금 체계
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-teal-200 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">일반 예약</h3>
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {medicalService.price.basic.toLocaleString()}원
                  </div>
                  <p className="text-gray-600">일반 병원 및 클리닉</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">전문 담당자 1:1 상담</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">의료진 스케줄 분석</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">실패시 전액 환불</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">예약 확정시 안내</span>
                  </li>
                </ul>
                
                <button className="w-full btn-secondary border-teal-600 text-teal-600 hover:bg-teal-50">
                  일반 예약 신청
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    긴급 예약
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">프리미엄 예약</h3>
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {medicalService.price.premium.toLocaleString()}원
                  </div>
                  <p className="text-gray-600">대학병원, 응급 예약</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">일반 서비스 모든 혜택</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">당일/응급 예약 처리</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">24시간 전담 상담</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">특진 의료진 예약</span>
                  </li>
                </ul>
                
                <button className="w-full btn-primary bg-red-600 hover:bg-red-700">
                  긴급 예약 신청
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 고객 후기 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                병원 예약 성공 후기
              </h2>
              <p className="text-lg text-gray-600">
                건강한 치료의 시작, 성공적인 병원 예약 후기입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {medicalReviews.slice(0, 4).map((review, index) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current w-4 h-4" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">"{review.content}"</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                    {review.verified && (
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                        인증된 후기
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              건강한 삶의 시작, 지금 바로 병원 예약하세요!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              전문가가 최적의 의료진과 시간을 찾아서 예약해드립니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                <MessageCircle className="w-5 h-5 mr-2 inline" />
                카카오톡 상담하기
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}