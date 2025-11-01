'use client';

import { TrendingUp, Clock, CheckCircle, Users, Zap, Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const RealTimeStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    
    // 실시간 시간 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const realTimeStats = [
    {
      icon: TrendingUp,
      label: '오늘 성공률',
      value: '99.2%',
      change: '+0.3%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Clock,
      label: '평균 처리시간',
      value: '0.1초',
      change: '-0.02초',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: CheckCircle,
      label: '오늘 완료된 예약',
      value: '1,247',
      change: '+156',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: Users,
      label: '활성 고객',
      value: '2,341',
      change: '+89',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  const recentBookings = [
    { service: '캠핑장 예약', time: '2분 전', status: '성공', success: true },
    { service: '콘서트 티켓팅', time: '5분 전', status: '성공', success: true },
    { service: '병원 예약', time: '8분 전', status: '성공', success: true },
    { service: '교육 신청', time: '12분 전', status: '성공', success: true },
    { service: '캠핑장 예약', time: '15분 전', status: '성공', success: true },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 깔끔한 배경 패턴 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">실시간 모니터링</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">예약대행 서비스</span>의
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              실시간 성과를 확인하세요
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">99.2% 성공률</span>과 <span className="font-semibold text-xl md:text-2xl text-blue-600">0.1초</span> 처리시간으로<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">전문 예약대행 서비스</span>의 실력을 실시간으로 보여드립니다.
          </p>
        </div>

        {/* 깔끔한 실시간 통계 */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {realTimeStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 group hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100 hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {stat.change}
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 깔끔한 최근 예약 현황 */}
        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 실시간 예약 현황 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">실시간 예약 현황</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
            </div>
            
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${booking.success ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <div className="font-medium text-gray-900">{booking.service}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.success 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">시스템 상태</h3>
              <div className="flex items-center text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                모든 시스템 정상
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">보안 시스템</span>
                </div>
                <span className="text-green-600 font-semibold">정상</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">예약 엔진</span>
                </div>
                <span className="text-blue-600 font-semibold">최적화</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="font-medium text-gray-900">고객 지원</span>
                </div>
                <span className="text-indigo-600 font-semibold">24시간 대기</span>
              </div>
            </div>
          </div>
        </div>

        {/* 깔끔한 하단 CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600 font-bold">실시간 모니터링</span>으로<br />
              투명한 예약대행 서비스를 경험하세요
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              모든 예약 과정을 실시간으로 확인하고, 99.2% 성공률의 전문 서비스를 신뢰하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                지금 바로 시작하기
                <CheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeStatsSection;
