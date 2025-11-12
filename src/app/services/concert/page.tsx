import { ArrowLeft, Award, CheckCircle, Clock, MessageCircle, Shield, Star, Users, Zap } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import React from 'react';
import { getTestimonialsByService } from '@/data/testimonials';
import { services } from '@/data/services';

export default function ConcertPage() {
  const concertService = services.concert;
  const concertReviews = getTestimonialsByService('concert');

  const popularConcerts = [
    { artist: 'BTS', venue: '잠실 올림픽 주경기장', difficulty: '매우 높음', color: 'text-red-600' },
    { artist: '아이유', venue: '서울 월드컵 경기장', difficulty: '높음', color: 'text-orange-600' },
    { artist: '뉴진스', venue: '고척 스카이돔', difficulty: '높음', color: 'text-orange-600' },
    { artist: '세븐틴', venue: '잠실 실내체육관', difficulty: '보통', color: 'text-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40">
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
              <span className="text-gray-900 font-medium">콘서트 티켓팅</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
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
                  <div className="text-blue-600 mr-4">
                    {React.createElement(concertService.icon, { className: "w-12 h-12" })}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {concertService.title}
                  </h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-6">
                  {concertService.description}
                </p>
                
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {concertService.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">성공률</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {concertService.averageTime}
                      </div>
                      <div className="text-sm text-gray-600">평균 소요시간</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-600">
                        {concertService.price.basic.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">기본 요금</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4 mb-8">
                  <div className="flex items-center">
                    <Zap className="text-blue-600 mr-2" size={20} />
                    <span className="text-blue-800 font-semibold">
                      티켓 오픈 즉시 초고속 처리! 평균 5분 내 결과 확인
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    카톡으로 상담하기
                  </button>
                </div>
              </div>

              <div className="lg:pl-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    티켓팅 전문 시스템
                  </h3>
                  <div className="space-y-4">
                    {concertService.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Award className="text-blue-600 mr-2" size={16} />
                      <span className="font-semibold text-blue-900">전문가 TIP</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      각 티켓팅 사이트별 특성을 분석한 최적화 전략으로 
                      높은 성공률을 보장합니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 인기 콘서트 현황 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                최근 티켓팅 현황
              </h2>
              <p className="text-lg text-gray-600">
                현재 가장 인기 있는 콘서트들의 예약 난이도입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularConcerts.map((concert, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {concert.artist}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {concert.venue}
                    </p>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-gray-500 block mb-1">
                        예약 난이도
                      </span>
                      <span className={`font-bold ${concert.color}`}>
                        {concert.difficulty}
                      </span>
                    </div>
                    <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      예약 상담하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 설명 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  전문 티켓팅 대행 서비스
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {concertService.details}
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    🎵 이런 분들께 추천합니다
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• 좋아하는 아티스트의 콘서트를 꼭 보고 싶으신 분</li>
                    <li>• 티켓팅 시간에 다른 일정이 있으신 분</li>
                    <li>• 여러 번 티켓팅에 실패한 경험이 있으신 분</li>
                    <li>• 확실한 예약으로 미리 계획을 세우고 싶은 분</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">⚡ 초고속 티켓팅 시스템</h4>
                  <p className="text-gray-600 text-sm">
                    독자적인 기술력으로 티켓 오픈과 동시에 접속하여 
                    최단 시간 내에 티켓을 확보합니다.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    지원 티켓팅 사이트
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {concertService.supportedPlatforms.map((platform, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">{platform}</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            지원
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
                    <h4 className="font-semibold mb-2">🏆 티켓팅 성공 비법</h4>
                    <p className="text-sm opacity-90">
                      각 사이트별 서버 특성과 대기열 시스템을 분석하여 
                      최적의 접속 전략을 수립합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 요금 안내 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                티켓팅 요금 안내
              </h2>
              <p className="text-lg text-gray-600">
                콘서트별 난이도에 따른 합리적인 가격 책정
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-blue-200 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">일반 티켓팅</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {concertService.price.basic.toLocaleString()}원
                  </div>
                  <p className="text-gray-700 font-medium">대부분의 콘서트 및 공연</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">전문 티켓팅 시스템 사용</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">실시간 진행상황 공유</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">실패시 전액 환불</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">좌석 선택권 협의</span>
                  </li>
                </ul>
                
                <a
                  href="https://open.kakao.com/o/soQDqKJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary border-blue-600 text-blue-600 hover:bg-blue-50 block text-center"
                >
                  일반 티켓팅 신청
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    고난이도 콘서트
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">프리미엄 티켓팅</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {concertService.price.premium.toLocaleString()}원
                  </div>
                  <p className="text-gray-700 font-medium">BTS, 아이유 등 초고난이도</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">일반 서비스 모든 혜택</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">다중 접속 시스템 동원</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">전담팀 24시간 대기</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-sm text-gray-800">좌석 등급별 동시 시도</span>
                  </li>
                </ul>
                
                <a
                  href="https://open.kakao.com/o/soQDqKJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary bg-blue-600 hover:bg-blue-700 block text-center"
                >
                  프리미엄 티켓팅 신청
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 고객 후기 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                티켓팅 성공 후기
              </h2>
              <p className="text-lg text-gray-600">
                꿈의 콘서트를 성공적으로 예약한 고객님들의 후기입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {concertReviews.slice(0, 4).map((review, index) => (
                <div key={review.id} className="bg-white rounded-xl p-6 shadow-lg">
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
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              놓치면 후회하는 콘서트, 지금 바로 예약하세요!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              전문 티켓팅 시스템으로 확실하게 티켓을 확보해드립니다
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
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