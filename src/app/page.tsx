'use client';

import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection';
import React, { useEffect, useState, useRef } from 'react';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import RealTimeStatsSection from '@/components/sections/RealTimeStatsSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import ChatWidget from '@/components/chat/ChatWidget';
import { ChevronUp, Loader2 } from 'lucide-react';

// 스크롤 진행률 컴포넌트
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, scrollPercent));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/50 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500 ease-out shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* 진행률 텍스트 */}
      <div className="absolute top-2 right-4 text-xs text-gray-500 font-medium">
        {Math.round(scrollProgress)}%
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const mainRef = useRef<HTMLElement>(null);

  // 로딩 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // 스크롤 탑 버튼 표시/숨김
      setShowScrollTop(scrollY > 500);

      // 현재 섹션 감지
      const sections = ['hero', 'stats', 'services', 'process', 'reviews'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 탑 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 섹션으로 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // 헤더 높이
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 flex items-center justify-center relative overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="text-center relative z-10">
          {/* 로고 */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-glow">
              <span className="text-white font-bold text-3xl">Q</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-ping" />
          </div>
          
          {/* 브랜드명 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QuickSlot</h1>
          <p className="text-lg text-gray-600 mb-8">전문 예약대행 서비스</p>
          
          {/* 로딩 인디케이터 */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          
          {/* 로딩 텍스트 */}
          <div className="flex items-center space-x-2 text-gray-700">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="font-medium">전문 예약대행 시스템을 준비하고 있습니다...</span>
          </div>
          
          {/* 성과 지표 */}
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>99.2% 성공률</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>0.1초 처리시간</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>10,000+ 성공사례</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 relative overflow-hidden">
      {/* 전문적인 배경 패턴 */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {/* 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '6s' }} />
        
        {/* 신뢰감을 주는 기하학적 패턴 */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-200/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-indigo-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Header />
      
      <main ref={mainRef} className="relative z-10">
        <HeroSection />
        <StatsSection />
        <WhyChooseUsSection />
        <RealTimeStatsSection />
        <SuccessStoriesSection />
        <ServicesSection />
        <ProcessSection />
        <ReviewsSection />
        {/* <ContactSection /> */}
      </main>
      
      <Footer />

      {/* 스크롤 탑 버튼 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-3xl shadow-2xl hover:shadow-glow hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group border-2 border-white/20"
          aria-label="맨 위로 스크롤"
        >
          <ChevronUp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      )}

      {/* 진행률 표시기 */}
      <ScrollProgress />

      {/* 실시간 채팅 위젯 */}
      <ChatWidget />

      {/* 섹션 네비게이션 (모바일) */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 lg:hidden z-40">
        <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md rounded-3xl px-2 py-2 shadow-2xl border border-white/30">
          {[
            { id: 'hero', label: '홈', icon: '🏠' },
            { id: 'stats', label: '성과', icon: '📊' },
            { id: 'services', label: '서비스', icon: '⚡' },
            { id: 'process', label: '과정', icon: '🔄' },
            { id: 'reviews', label: '후기', icon: '⭐' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="text-lg mb-1">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}