// src/components/sections/HeroSection.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Clock, Shield, Zap, Award, TrendingUp, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 깔끔한 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      
      {/* 깔끔한 그리드 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      {/* 미니멀 플로팅 요소 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 깔끔한 상단 배지들 */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 group">
            <Award className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-semibold text-gray-800">#1 예약대행 서비스</span>
          </div>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <CheckCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-semibold">99.2% 성공률</span>
          </div>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <Zap className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-semibold">0.1초 처리시간</span>
          </div>
        </div>

        {/* 깔끔한 메인 헤딩 */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-blue-600 font-bold">
              QuickSlot
            </span>
          </span>
          <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-2">
            <span className="text-blue-600 font-semibold">복잡한 예약</span>을
          </span>
          <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-2">
            <span className="text-indigo-600 font-semibold">간단하게</span> 만드는
          </span>
          <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700">
            <span className="text-blue-600 font-semibold">전문 서비스</span>
          </span>
        </h1>
        
        {/* 깔끔한 서브헤딩 */}
        <p className={`text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-semibold text-xl md:text-2xl text-blue-600">99.2% 성공률</span>과 <span className="font-semibold text-xl md:text-2xl text-indigo-600">0.1초</span> 처리시간으로<br />
          <span className="font-medium text-gray-700 text-base md:text-lg">캠핑장, 콘서트, 병원, 교육 신청</span> - 모든 선착순 예약을 완벽하게 대행합니다.
        </p>
        
        {/* 깔끔한 CTA 버튼들 */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://open.kakao.com/o/soQDqKJh"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span>카카오톡 상담받기</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          
        </div>

        {/* 깔끔한 상담 가능 표시 */}
        <div className={`inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse" />
          <span className="text-base">지금 바로 상담 가능합니다</span>
        </div>
        
        {/* 깔끔한 신뢰도 지표 */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.2%</div>
            <div className="text-gray-600 font-medium mb-1">예약 성공률</div>
            <div className="text-sm text-blue-600 font-medium">검증된 성과</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
            <div className="text-gray-600 font-medium mb-1">성공 사례</div>
            <div className="text-sm text-indigo-600 font-medium">실제 검증</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0.1초</div>
            <div className="text-gray-600 font-medium mb-1">처리시간</div>
            <div className="text-sm text-blue-600 font-medium">초고속 처리</div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600 font-medium mb-1">실시간 상담</div>
            <div className="text-sm text-indigo-600 font-medium">전문 지원</div>
          </div>
        </div>

        {/* 깔끔한 보장 정책 */}
        <div className={`mt-16 p-8 bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">100% 안전 보장</h3>
              <p className="text-gray-600 font-medium">전문 예약대행 서비스의 신뢰성</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">실패시 전액 환불</h4>
              <p className="text-sm text-gray-600">예약 실패시 100% 환불 보장</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">개인정보 보호</h4>
              <p className="text-sm text-gray-600">최고 수준의 보안 시스템</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">전문 담당자 배정</h4>
              <p className="text-sm text-gray-600">경험 풍부한 전문가 상담</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">실시간 진행상황</h4>
              <p className="text-sm text-gray-600">투명한 예약 과정 공유</p>
            </div>
          </div>
        </div>
      </div>

      {/* 깔끔한 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">스크롤하여 더 보기</span>
          <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
        </div>
      </div>

      {/* 깔끔한 섹션 구분선 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
      
      {/* 구분선 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-blue-200 rounded-full" />
    </section>
  );
};

export default HeroSection;