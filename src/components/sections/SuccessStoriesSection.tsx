'use client';

import { CheckCircle, Clock, Star, TrendingUp, Users, Award, Calendar, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SuccessStoriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const successStories = [
    {
      id: 1,
      category: '캠핑장 예약',
      title: '한정 30명 캠핑장 예약 성공',
      description: '오픈 1초 만에 완료된 극한의 예약 경쟁에서 성공',
      successRate: '100%',
      time: '0.8초',
      date: '2024.01.15',
      location: '강원도 평창',
      icon: '🏕️',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 2,
      category: '콘서트 티켓팅',
      title: '인기 가수 콘서트 VIP석 확보',
      description: '수만 명이 경쟁하는 티켓팅에서 VIP석 2매 성공',
      successRate: '100%',
      time: '0.3초',
      date: '2024.01.20',
      location: '서울 올림픽공원',
      icon: '🎵',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 3,
      category: '병원 예약',
      title: '명의 진료 예약 성공',
      description: '3개월 대기 명의의 진료 예약을 단 1일 만에 성공',
      successRate: '100%',
      time: '1.2초',
      date: '2024.01.25',
      location: '서울대병원',
      icon: '🏥',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 4,
      category: '교육 신청',
      title: '인기 강의 수강신청 성공',
      description: '정원 20명 한정 강의를 0.5초 만에 신청 완료',
      successRate: '100%',
      time: '0.5초',
      date: '2024.02.01',
      location: '온라인 강의',
      icon: '🎓',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const stats = [
    { label: '총 성공 사례', value: '10,247', icon: CheckCircle, color: 'text-green-600' },
    { label: '평균 성공률', value: '99.2%', icon: TrendingUp, color: 'text-blue-600' },
    { label: '평균 처리시간', value: '0.7초', icon: Clock, color: 'text-purple-600' },
    { label: '만족도', value: '4.9/5', icon: Star, color: 'text-yellow-600' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 깔끔한 배경 장식 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">성공 사례</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">실제 성공 사례</span>로
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              검증된 예약대행 서비스
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">10,000+ 성공 사례</span>와 <span className="font-semibold text-xl md:text-2xl text-green-600">99.2% 성공률</span>로<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">전문 예약대행 서비스</span>의 실력을 증명합니다.
          </p>
        </div>

        {/* 깔끔한 통계 요약 */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100 hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 깔끔한 성공 사례 슬라이더 */}
        <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-8 relative overflow-hidden shadow-lg border border-gray-100">
            {/* 현재 사례 표시 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{successStories[currentStory].icon}</span>
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-200 mb-2">
                    {successStories[currentStory].category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {successStories[currentStory].title}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">성공률</div>
                <div className="text-2xl font-bold text-green-600">
                  {successStories[currentStory].successRate}
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {successStories[currentStory].description}
            </p>

            {/* 상세 정보 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">처리시간</div>
                  <div className="font-bold text-gray-900">{successStories[currentStory].time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-sm text-gray-500">예약일</div>
                  <div className="font-bold text-gray-900">{successStories[currentStory].date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">위치</div>
                  <div className="font-bold text-gray-900">{successStories[currentStory].location}</div>
                </div>
              </div>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 깔끔한 하단 CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600 font-bold">검증된 성공 사례</span>로<br />
              신뢰할 수 있는 예약대행 서비스를 경험하세요
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              10,000+ 성공 사례와 99.2% 성공률로 보장하는 전문 예약대행 서비스
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
              >
                <CheckCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                지금 바로 시작하기
                <Award className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
