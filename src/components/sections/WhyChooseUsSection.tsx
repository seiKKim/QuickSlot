'use client';

import { CheckCircle, Clock, Shield, Users, Zap, Award } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Zap,
      title: '초고속 예약 시스템',
      description: 'AI 기반 자동화 시스템으로 0.1초 단위의 빠른 예약 처리',
      highlight: '0.1초'
    },
    {
      icon: Shield,
      title: '99.2% 성공률 보장',
      description: '검증된 시스템과 전문가 팀으로 높은 예약 성공률 보장',
      highlight: '99.2%'
    },
    {
      icon: Clock,
      title: '24시간 모니터링',
      description: '예약 오픈 전부터 완료까지 24시간 실시간 모니터링',
      highlight: '24시간'
    },
    {
      icon: Users,
      title: '전문 예약대행팀',
      description: '각 분야별 전문가로 구성된 경험 풍부한 예약대행팀',
      highlight: '전문팀'
    },
    {
      icon: Award,
      title: '100% 안전 보장',
      description: '개인정보 보호 및 예약 정보 보안을 위한 최고 수준의 보안',
      highlight: '100%'
    },
    {
      icon: CheckCircle,
      title: '실시간 진행상황',
      description: '예약 진행 상황을 실시간으로 확인할 수 있는 투명한 시스템',
      highlight: '실시간'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 깔끔한 배경 장식 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">왜 QuickSlot인가?</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">전문 예약대행 서비스</span>의
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              차별화된 경쟁력
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            단순한 예약 도구가 아닌, <span className="font-semibold text-gray-800">전문 예약대행 서비스</span>로<br />
            고객의 소중한 시간과 기회를 지켜드립니다.
          </p>
        </div>

        {/* 깔끔한 특징 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 shadow-lg border border-gray-100 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* 아이콘 */}
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* 하이라이트 배지 */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-3 border border-blue-200">
                  {feature.highlight}
                </div>

                {/* 제목 */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 깔끔한 하단 CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              지금 바로 <span className="text-blue-600 font-bold">전문 예약대행 서비스</span>를 시작하세요
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              복잡한 예약 과정은 우리에게 맡기고, 소중한 시간을 더 가치 있게 사용하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                무료 상담 받기
                <CheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
