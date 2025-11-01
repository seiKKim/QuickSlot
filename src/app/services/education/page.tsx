import { ArrowLeft, BookOpen, Calendar, CheckCircle, Clock, MessageCircle, Shield, Star, Trophy, Users } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import React from 'react';
import { getTestimonialsByService } from '@/data/testimonials';
import { services } from '@/data/services';

export default function EducationPage() {
  const educationService = services.education;
  const educationReviews = getTestimonialsByService('education');

  const educationTypes = [
    { 
      name: '대학교 수강신청', 
      description: '전국 대학교 수강신청 대행 (인기 1위)',
      difficulty: '높음',
      color: 'bg-red-50 border-red-200 text-red-800',
      examples: ['서울대학교', '연세대학교', '고려대학교', '성균관대학교', '한양대학교', '중앙대학교'],
      season: '매 학기 초',
      isPopular: true,
      badge: '문의 폭주',
      pricing: '1-2과목: 3만원 / 3과목 이상: 5만원'
    },
    { 
      name: '학원 레벨테스트', 
      description: '어학원/학원 레벨테스트 신청 (인기 2위)',
      difficulty: '높음',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      examples: ['YBM어학원', '파고다어학원', '해커스어학원', '시사영어학원', '정철어학원', '토마토토익'],
      season: '매월 접수',
      isPopular: true,
      badge: '높은 수요',
      pricing: '레벨테스트: 10만원'
    }
  ];

  const popularCourses = [
    { name: '대학교 수강신청', category: '학점취득', period: '학기별', popularity: '매우 높음', isHot: true, price: '3-5만원' },
    { name: '학원 레벨테스트', category: '어학/학원', period: '매월', popularity: '매우 높음', isHot: true, price: '10만원' }
  ];

  const semesterSchedule = [
    { period: '1학기', registration: '2월 중순', classes: '3월-6월', note: '봄학기' },
    { period: '여름학기', registration: '6월 중순', classes: '7월-8월', note: '계절학기' },
    { period: '2학기', registration: '8월 중순', classes: '9월-12월', note: '가을학기' },
    { period: '겨울학기', registration: '12월 중순', classes: '1월-2월', note: '계절학기' }
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
              <span className="text-gray-900 font-medium">교육 신청</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
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
                  <div className="text-indigo-600 mr-4">
                    {React.createElement(educationService.icon, { className: "w-12 h-12" })}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {educationService.title}
                  </h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-6">
                  {educationService.description}
                </p>
                
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {educationService.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">성공률</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {educationService.averageTime}
                      </div>
                      <div className="text-sm text-gray-600">평균 소요시간</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-violet-600">
                        3-10만원
                      </div>
                      <div className="text-sm text-gray-600">서비스별 요금</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 mb-8">
                  <div className="flex items-center">
                    <BookOpen className="text-indigo-600 mr-2" size={20} />
                    <span className="text-indigo-800 font-semibold">
                      배움의 기회를 놓치지 마세요! 확실한 교육 신청으로 성장하세요
                    </span>
                  </div>
                </div>

                {/* <div className="text-center">
                  <a
                    href="https://open.kakao.com/o/soQDqKJh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-lg px-8 py-4 bg-indigo-600 hover:bg-indigo-700 inline-flex items-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    카카오톡 상담하기
                  </a>
                </div> */}
              </div>

              <div className="lg:pl-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    교육 신청 전문 시스템
                  </h3>
                  <div className="space-y-4">
                    {educationService.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Trophy className="text-indigo-600 mr-2" size={16} />
                      <span className="font-semibold text-indigo-900">수강신청 알고리즘</span>
                    </div>
                    <p className="text-sm text-indigo-700">
                      각 교육기관의 신청 시스템을 분석하여 
                      최적의 신청 전략을 수립합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 교육 유형별 현황 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                주요 서비스 현황
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                대학 수강신청과 학원 레벨테스트 전문 대행 서비스
              </p>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg px-6 py-3 inline-block">
                <span className="font-bold">🔥 대학 수강신청 & 학원 레벨테스트 전문! 🔥</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {educationTypes.map((type, index) => (
                <div key={index} className={`bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow relative ${type.isPopular ? 'ring-2 ring-blue-500' : ''}`}>
                  {type.isPopular && (
                    <div className="absolute -top-3 -right-3">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔥 {type.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {type.description}
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3 mb-4">
                      <div className="text-lg font-bold">{type.pricing}</div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${type.color}`}>
                        신청 난이도: {type.difficulty}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 border-blue-200 text-blue-800">
                        {type.season}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">지원 기관</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {type.examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${type.isPopular ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                            {example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href="https://open.kakao.com/o/soQDqKJh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-colors block text-center ${
                      type.isPopular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 text-lg' 
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    지금 신청 상담하기
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 인기 교육과정 */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                인기 서비스
              </h2>
              <p className="text-lg text-gray-600">
                현재 가장 많이 문의되는 교육 신청 서비스입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {popularCourses.map((course, index) => (
                <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative ${course.isHot ? 'ring-2 ring-red-400' : ''}`}>
                  {course.isHot && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔥 HOT
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center ${course.isHot ? 'bg-red-100' : 'bg-indigo-100'}`}>
                      <BookOpen className={`w-10 h-10 ${course.isHot ? 'text-red-600' : 'text-indigo-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {course.name}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">분야:</span>
                        <span className="text-gray-900 font-medium">{course.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">접수:</span>
                        <span className="text-gray-900 font-medium">{course.period}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">요금:</span>
                        <span className="text-blue-600 font-bold">{course.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">인기도:</span>
                        <span className={`font-semibold ${
                          course.popularity === '매우 높음' ? 'text-red-600' :
                          course.popularity === '높음' ? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {course.popularity}
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://open.kakao.com/o/soQDqKJh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-4 rounded-lg font-bold transition-colors block text-center ${
                        course.isHot 
                          ? 'bg-red-600 text-white hover:bg-red-700 text-lg' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      신청 대행 요청
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* 수강신청 일정 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                대학교 수강신청 일정
              </h2>
              <p className="text-lg text-gray-600">
                연간 수강신청 일정을 미리 확인하고 준비하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {semesterSchedule.map((semester, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 shadow-lg border">
                  <div className="text-center">
                    <div className="bg-indigo-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {semester.period}
                    </h3>
                    <p className="text-sm text-indigo-600 mb-4">
                      {semester.note}
                    </p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center justify-center mb-1">
                          <Calendar className="text-indigo-600 w-4 h-4 mr-1" />
                          <span className="font-semibold text-gray-700">신청 기간</span>
                        </div>
                        <span className="text-indigo-600 font-medium">{semester.registration}</span>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="text-green-600 w-4 h-4 mr-1" />
                          <span className="font-semibold text-gray-700">수업 기간</span>
                        </div>
                        <span className="text-green-600 font-medium">{semester.classes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">📚 수강신청 미리 준비하기</h3>
              <p className="text-lg opacity-90 mb-6">
                수강신청 기간 전에 미리 상담받고 확실하게 원하는 강의를 신청하세요
              </p>
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                사전 상담 신청하기
              </a>
            </div>
          </div>
        </section>

        {/* 상세 설명 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  전문 교육 신청 대행 서비스
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {educationService.details}
                </p>

                <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                    🎓 이런 분들께 추천합니다
                  </h3>
                  <ul className="space-y-2 text-indigo-700">
                    <li>• <strong>대학교 수강신청</strong>: 원하는 강의가 항상 마감되어 수강신청에 실패하신 분</li>
                    <li>• <strong>학원 레벨테스트</strong>: 어학원/학원 레벨테스트 신청을 놓치신 분</li>
                    <li>• 신청 시간에 컴퓨터 앞에 있기 어려운 직장인/학생</li>
                    <li>• 복잡한 신청 시스템 때문에 포기하신 분</li>
                    <li>• 확실한 신청으로 교육 계획을 세우고 싶은 분</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-500 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">🚀 신청 성공률 99.1%의 비밀</h4>
                  <p className="text-gray-600 text-sm">
                    각 교육기관의 신청 시스템과 서버 특성을 분석하여 
                    최적의 신청 시점과 방법을 찾아내어 높은 성공률을 달성합니다.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    지원 교육기관
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {educationService.supportedPlatforms.map((platform, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-indigo-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">{platform}</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            신청 가능
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
                    <h4 className="font-semibold mb-2">💡 신청 성공 전략</h4>
                    <p className="text-sm opacity-90">
                      각 교육기관의 신청 오픈 시간과 서버 상황을 실시간으로 모니터링하여 
                      최적의 타이밍에 신청을 진행합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 고객 후기 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                교육 신청 성공 후기
              </h2>
              <p className="text-lg text-gray-600">
                꿈의 강의를 성공적으로 신청한 고객님들의 후기입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {educationReviews.slice(0, 4).map((review, index) => (
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
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
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
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              성장의 기회를 놓치지 마세요!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              원하는 교육과정을 확실하게 신청하고 새로운 도전을 시작하세요
            </p>
            
            <div className="flex justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
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