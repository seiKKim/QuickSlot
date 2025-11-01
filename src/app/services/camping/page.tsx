import { ArrowLeft, CheckCircle, Clock, MessageCircle, Shield, Star, Users } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import React from 'react';
import { getTestimonialsByService } from '@/data/testimonials';
import { services } from '@/data/services';

export default function CampingPage() {
  const campingService = services.camping;
  const campingReviews = getTestimonialsByService('camping');

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
              <span className="text-gray-900 font-medium">캠핑장 예약</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
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
                  <div className="text-green-600 mr-4">
                    {React.createElement(campingService.icon, { className: "w-12 h-12" })}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {campingService.title}
                  </h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-6">
                  {campingService.description}
                </p>
                
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {campingService.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">성공률</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {campingService.averageTime}
                      </div>
                      <div className="text-sm text-gray-600">평균 소요시간</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {campingService.price.basic.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">기본 요금</div>
                    </div>
                  </div>
                </div>

                {/* <div className="text-center">
                  <a
                    href="https://open.kakao.com/o/soQDqKJh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    카카오톡 상담하기
                  </a>
                </div> */}
              </div>

              <div className="lg:pl-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    서비스 특징
                  </h3>
                  <div className="space-y-4">
                    {campingService.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
                  캠핑장 예약 대행 서비스
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {campingService.details}
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    💡 이런 분들께 추천합니다
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• 인기 캠핑장 예약에 번번이 실패하신 분</li>
                    <li>• 국립공원 캠핑장을 이용하고 싶으신 분</li>
                    <li>• 예약 오픈 시간에 컴퓨터 앞에 있기 어려운 분</li>
                    <li>• 확실한 예약으로 가족 여행을 계획하고 싶은 분</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    지원 플랫폼
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {campingService.supportedPlatforms.map((platform, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">{platform}</span>
                        </div>
                      </div>
                    ))}
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
                투명한 요금 체계
              </h2>
              <p className="text-lg text-gray-600">
                합리적인 가격으로 확실한 결과를 제공합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-blue-200 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">기본 서비스</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {campingService.price.basic.toLocaleString()}원
                  </div>
                  <p className="text-gray-600">일반적인 캠핑장 예약 대행</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">전문 담당자 1:1 배정</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">실시간 진행상황 공유</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">실패시 전액 환불</span>
                  </li>
                </ul>
                
                <a
                  href="https://open.kakao.com/o/soQDqKJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary block text-center"
                >
                  기본 서비스 선택
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    추천
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">프리미엄 서비스</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {campingService.price.premium.toLocaleString()}원
                  </div>
                  <p className="text-gray-600">긴급 예약 및 우선 처리</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">기본 서비스 모든 혜택</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">당일/익일 긴급 예약 가능</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">24시간 전담 상담</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm">우선순위 처리</span>
                  </li>
                </ul>
                
                <a
                  href="https://open.kakao.com/o/soQDqKJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary block text-center"
                >
                  프리미엄 서비스 선택
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 고객 후기 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                캠핑장 예약 후기
              </h2>
              <p className="text-lg text-gray-600">
                실제 이용하신 고객님들의 생생한 후기입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {campingReviews.slice(0, 4).map((review, index) => (
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
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
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
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 캠핑장 예약을 시작하세요!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              전문가가 대신 예약해드리니 안심하고 맡겨주세요
            </p>
            
            <div className="flex justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                카카오톡 상담하기
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}