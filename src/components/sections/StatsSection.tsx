'use client';

import React, { useEffect, useState } from 'react';
import { companyInfo } from '@/data/company';
import { mainStats } from '@/data/stats';
import { TrendingUp, Users, Award, Shield, Star, Clock } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(mainStats.map(() => 0));

  useEffect(() => {
    setIsVisible(true);
    
    // 카운터 애니메이션
    const duration = 2000; // 2초
    const steps = 60;
    const stepDuration = duration / steps;
    
    mainStats.forEach((stat, index) => {
      const target = parseInt(stat.number.replace(/[^\d]/g, ''));
      const increment = target / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, stepDuration);
    });
  }, []);

  const icons = [TrendingUp, Users, Award, Shield];

  return (
    <section id="stats" className="section-padding bg-white relative overflow-hidden">
      {/* 깔끔한 배경 장식 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
            <Star className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-gray-800">신뢰성 지표</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">예약대행 서비스</span>의
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              압도적인 성과
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">99.2% 성공률</span>과 <span className="font-semibold text-xl md:text-2xl text-blue-600">10,000+</span> 성공 사례로<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">전문 예약대행 서비스</span>의 신뢰성을 증명합니다.
          </p>
        </div>

        {/* 깔끔한 통계 카드들 */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {mainStats.map((stat, index) => {
            const IconComponent = icons[index] || Star;
            return (
              <div 
                key={index} 
                className="group text-center hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-6 relative overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl">
                  {/* 배경 아이콘 */}
                  <div className="absolute top-3 right-3 w-12 h-12 bg-blue-100 rounded-full opacity-50" />
                  <IconComponent className="absolute top-4 right-4 w-6 h-6 text-blue-200" />
                  
                  {/* 메인 아이콘 */}
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* 숫자 */}
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {counters[index].toLocaleString()}
                    {stat.number.includes('%') && '%'}
                    {stat.number.includes('+') && '+'}
                  </div>
                  
                  {/* 라벨 */}
                  <div className="text-gray-900 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* 설명 */}
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 깔끔한 신뢰성 메시지 */}
        <div className={`bg-white rounded-xl p-8 text-center shadow-lg border border-gray-100 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {companyInfo.slogan}
              </h3>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              후회없는 선택, 완벽한 결과를 보장합니다. 
              뛰어난 성공률을 바탕으로 고객님의 만족을 최우선으로 하여, 
              변함없이 높은 품질의 서비스를 제공해 드리고 있습니다.
            </p>

            {/* 추가 신뢰 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">실시간 상담</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">환불 보장</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">1:1</div>
                  <div className="text-sm text-gray-600">전문 담당자</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;