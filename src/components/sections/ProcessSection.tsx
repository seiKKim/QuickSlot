// src/components/sections/ProcessSection.tsx

'use client';

import { ArrowRight, Shield, CheckCircle, Clock, Users, Award, MessageCircle, Zap, Star, TrendingUp, FileText } from 'lucide-react';
import { guarantees, processSteps } from '@/data/company';
import React, { useEffect, useState } from 'react';

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="process" className="section-padding bg-white relative overflow-hidden -mt-16">
      {/* 깔끔한 상단 구분선과 배경 전환 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-white" />
      
      {/* 섹션 시작 표시 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
      </div>
      
      {/* 깔끔한 메인 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      {/* 미니멀 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      {/* 깔끔한 플로팅 요소들 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 pt-20">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-800">이용 과정</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">3단계 완료</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white shadow-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">99.2% 성공률</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">전문 예약대행 서비스</span>
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              간단한 <span className="text-blue-600 font-semibold">3단계</span> 이용 과정
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">3단계</span>로 완료되는 간편한 예약 대행 서비스<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">복잡한 과정 없이</span> 쉽고 빠르게 이용하세요.
          </p>
        </div>

        {/* 깔끔한 프로세스 단계 */}
        <div className={`relative mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 깔끔한 연결선 (데스크톱) */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
            <div className="flex justify-between items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full mx-4" />
              <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg" />
              <div className="flex-1 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 rounded-full mx-4" />
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="group text-center hover:scale-105 transition-all duration-500"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl p-6 relative overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  {/* 단계 번호 배지 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">{step.step}</span>
                  </div>

                  {/* 아이콘 */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="w-full h-full rounded-full border-2 border-gray-200 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(step.icon, { className: "w-8 h-8 text-blue-600" })}
                      </div>
                    </div>
                  </div>
                  
                  {/* 제목 */}
                  <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h4>
                  
                  {/* 설명 */}
                  <p className="text-gray-600 mb-4 text-base leading-relaxed">
                    {step.description}
                  </p>

                  {/* 소요 시간과 성공률 */}
                  <div className="flex justify-center gap-3 mb-4">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                      <Clock className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium text-blue-700">{step.estimatedTime}</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200">
                      <TrendingUp className="w-4 h-4 text-indigo-600 mr-1" />
                      <span className="text-sm font-medium text-indigo-700">99.2%</span>
                    </div>
                  </div>

                  {/* 상세 내용 */}
                  <div className="bg-gray-50 rounded-lg p-4 text-left border border-gray-200">
                    <div className="flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4 text-blue-600 mr-2" />
                      <h5 className="font-semibold text-gray-900">주요 내용</h5>
                    </div>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2 group/item">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 단계별 특징 */}
                  <div className="mt-4 flex justify-center">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      전문가 처리
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안심 보장 정책 */}
        <div className={`booking-card p-12 mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                100% 안심 보장 정책
              </span>
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              고객님의 안전한 서비스 이용을 위한 <span className="font-bold text-blue-600">보장 정책</span>입니다.<br />
              <span className="font-black text-gray-800 text-2xl">100% 신뢰할 수 있는</span> 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <div 
                key={index} 
                className={`bg-gray-50 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300 border border-gray-200 ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-indigo-50/50'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.createElement(guarantee.icon, { className: "w-8 h-8 text-blue-600" })}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className={`text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="booking-card p-12 max-w-5xl mx-auto">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                지금 바로 시작하세요
              </span>
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              <span className="font-black text-2xl text-blue-600">3단계</span>로 완료되는 예약 대행 서비스<br />
              <span className="font-bold text-gray-800 text-lg">높은 성공률과 전문적인 서비스</span>를 경험해보세요.
            </p>

            {/* 성과 지표 */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-700">99.2% 성공률</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-700">0.1초 처리시간</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-purple-700">10,000+ 성공사례</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl shadow-2xl hover:shadow-glow transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 overflow-hidden"
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">카카오톡 상담받기</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;