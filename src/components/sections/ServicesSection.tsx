'use client';

import React, { useState, useEffect } from 'react';
import { serviceFeatures, services } from '@/data/services';
import { CheckCircle, ArrowRight, Star, Clock, Shield, Zap } from 'lucide-react';

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState('camping');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="services" className="section-padding bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 깔끔한 배경 장식 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">전문 서비스</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">전문 예약대행 서비스</span>로
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              모든 예약을 완벽하게 대행합니다
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">캠핑장, 콘서트, 병원, 교육 신청</span>까지<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">전문 예약대행팀</span>이 99.2% 성공률로 보장합니다.
          </p>
        </div>

        {/* 깔끔한 서비스 탭 */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(services).map(([key, service], index) => (
            <div 
              key={key}
              className={`group relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedService === key 
                  ? 'transform scale-105' 
                  : 'hover:scale-102'
              }`}
              onClick={() => setSelectedService(key)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-white rounded-xl p-6 h-full relative overflow-hidden shadow-lg border transition-all duration-300 ${
                selectedService === key 
                  ? 'border-blue-500 shadow-xl' 
                  : 'border-gray-100 hover:shadow-xl'
              }`}>
                {/* 선택된 상태 배경 */}
                {selectedService === key && (
                  <div className="absolute inset-0 bg-blue-50/50" />
                )}
                
                {/* 아이콘 */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  selectedService === key 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                }`}>
                  {React.createElement(service.icon, { className: "w-7 h-7" })}
                </div>
                
                {/* 제목 */}
                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h4>
                
                {/* 설명 */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                {/* 성공률 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {service.successRate}% 성공률
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${
                    selectedService === key ? 'text-blue-500' : ''
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 깔끔한 선택된 서비스 상세 정보 */}
        <div className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* 왼쪽: 서비스 정보 */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  {React.createElement(services[selectedService].icon, { className: "w-7 h-7 text-white" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {services[selectedService].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {services[selectedService].details}
                  </p>
                </div>
              </div>

              {/* 주요 특징 */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h4>
                {services[selectedService].features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* 가격 정보 */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">서비스 가격</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {services[selectedService].price.basic.toLocaleString()}원
                    </div>
                    <div className="text-sm text-gray-600">기본 서비스</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {services[selectedService].price.premium.toLocaleString()}원
                    </div>
                    <div className="text-sm text-gray-600">프리미엄 서비스</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 서비스 특징 및 통계 */}
            <div className="space-y-6">
              {/* 서비스 특징 */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  서비스 특징
                </h4>
                <div className="space-y-3">
                  {serviceFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-gray-700 font-medium text-sm">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 성공률 및 시간 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {services[selectedService].successRate}%
                  </div>
                  <div className="text-xs text-gray-600">성공률</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {services[selectedService].averageTime}
                  </div>
                  <div className="text-xs text-gray-600">평균 소요시간</div>
                </div>
              </div>

              {/* 지원 플랫폼 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">지원 플랫폼</h4>
                <div className="grid grid-cols-2 gap-2">
                  {services[selectedService].supportedPlatforms.slice(0, 4).map((platform, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
                {services[selectedService].supportedPlatforms.length > 4 && (
                  <div className="text-sm text-gray-500 mt-2">
                    +{services[selectedService].supportedPlatforms.length - 4}개 더
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;