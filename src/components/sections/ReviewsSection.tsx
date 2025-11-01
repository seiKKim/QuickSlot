// src/components/sections/ReviewsSection.tsx

'use client';

import { ChevronLeft, ChevronRight, Quote, Star, Heart, MessageCircle, ThumbsUp, Award, Users, TrendingUp, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { testimonialStats, testimonials } from '@/data/testimonials';

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 transition-all duration-300 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  // 최고 평점 후기들 (5점)
  const topRatedReviews = testimonials.filter(review => review.rating === 5).slice(0, 6);

  return (
    <section id="reviews" className="section-padding bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 깔끔한 메인 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      
      {/* 미니멀 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      {/* 깔끔한 플로팅 요소들 */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10">
        {/* 깔끔한 섹션 헤더 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100">
              <Heart className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-800">고객 후기</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg">
              <Star className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">4.9/5.0 평점</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white shadow-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">검증된 후기</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-3xl md:text-4xl mb-3">
              <span className="text-blue-600 font-bold">고객 후기</span>
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              <span className="text-blue-600 font-semibold">10,000+</span>명이 인정한
            </span>
            <span className="block text-2xl md:text-3xl text-gray-700">
              <span className="text-indigo-600 font-semibold">신뢰할 수 있는</span> 서비스
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-xl md:text-2xl text-blue-600">실제 이용 고객</span>들의 생생한 후기를 확인해보세요.<br />
            <span className="font-medium text-gray-700 text-base md:text-lg">높은 만족도와 신뢰성</span>을 자랑하는 서비스를 경험해보세요.
          </p>
        </div>

        {/* 깔끔한 메인 후기 슬라이더 */}
        <div className={`relative max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl p-8 relative overflow-hidden group shadow-lg border border-gray-100">
            {/* 깔끔한 배경 장식 */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-blue-100 rounded-full opacity-60" />
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-indigo-100 rounded-full opacity-60" />
            <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-200 group-hover:text-blue-300 transition-colors duration-500" />
            <Sparkles className="absolute bottom-6 left-6 w-10 h-10 text-indigo-200 group-hover:text-indigo-300 transition-colors duration-500" />
            
            <div className="relative z-10">
              {/* 평점과 검증 배지 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    {renderStars(testimonials[currentReview].rating)}
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {testimonials[currentReview].rating}.0
                  </span>
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    검증됨
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">후기 {currentReview + 1} / {testimonials.length}</div>
                </div>
              </div>
              
              {/* 후기 내용 */}
              <blockquote className="text-2xl md:text-3xl text-gray-800 mb-8 leading-relaxed font-medium relative">
                <div className="absolute -top-3 -left-3 text-4xl text-blue-300 opacity-50">"</div>
                {testimonials[currentReview].content}
                <div className="absolute -bottom-3 -right-3 text-4xl text-blue-300 opacity-50">"</div>
              </blockquote>
              
              {/* 작성자 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl shadow-lg">
                      {testimonials[currentReview].name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">
                      {testimonials[currentReview].name}
                    </p>
                    <p className="text-blue-600 font-medium text-sm mb-1">
                      {testimonials[currentReview].service}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      {testimonials[currentReview].location} • {testimonials[currentReview].date}
                    </p>
                  </div>
                </div>
                
                {/* 네비게이션 버튼 */}
                <div className="flex space-x-3">
                  <button 
                    onClick={prevReview}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    aria-label="이전 후기"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={nextReview}
                    className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                    aria-label="다음 후기"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentReview 
                    ? 'w-6 bg-blue-500 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-blue-400 hover:scale-110'
                }`}
                aria-label={`후기 ${index + 1}번으로 이동`}
              />
            ))}
          </div>
        </div>

        {/* 최고 평점 후기 그리드 */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg mb-6">
              <Star className="w-5 h-5 mr-2" />
              <span className="text-sm font-bold">최고 평점 후기</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                5점 만점의 완벽한 후기들
              </span>
            </h3>
            <p className="text-xl text-gray-600">실제 고객들이 직접 작성한 검증된 후기</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedReviews.map((review, index) => (
              <div 
                key={review.id} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 group hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-white/30 relative overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* 배경 장식 */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full opacity-50" />
                <Star className="absolute top-4 right-4 w-8 h-8 text-purple-300" />
                
                {/* 평점과 검증 배지 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {review.rating}.0
                    </span>
                  </div>
                  <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-xs font-bold">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    검증됨
                  </div>
                </div>
                
                {/* 후기 내용 */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg relative">
                  <div className="absolute -top-2 -left-2 text-3xl text-purple-300 opacity-30">"</div>
                  {review.content.slice(0, 120)}...
                  <div className="absolute -bottom-2 -right-2 text-3xl text-purple-300 opacity-30">"</div>
                </blockquote>
                
                {/* 작성자 정보 */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                    <p className="text-purple-600 font-semibold text-sm">{review.service}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      {review.date}
                    </p>
                  </div>
                </div>
                
                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>

        {/* 통계 정보 */}
        <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-16 text-center transition-all duration-1000 delay-600 shadow-2xl border border-white/30 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 배경 장식 */}
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-50" />
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full opacity-50" />
          <TrendingUp className="absolute top-8 right-8 w-16 h-16 text-blue-200" />
          <Award className="absolute bottom-8 left-8 w-12 h-12 text-yellow-200" />
          
          <div className="relative z-10">
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  신뢰할 수 있는 성과 지표
                </span>
              </h3>
              <p className="text-xl text-gray-600">실제 데이터로 검증된 서비스 품질</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="group relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {testimonialStats.averageRating.toFixed(1)}
                </div>
                <div className="text-gray-600 font-bold text-lg mb-2">평균 만족도</div>
                <div className="text-sm text-purple-600 font-semibold">5점 만점 기준</div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="group relative">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {testimonialStats.total}+
                </div>
                <div className="text-gray-600 font-bold text-lg mb-2">누적 후기 수</div>
                <div className="text-sm text-emerald-600 font-semibold">실제 이용 고객</div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="group relative">
                <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ThumbsUp className="w-12 h-12 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-gray-600 font-bold text-lg mb-2">재이용 의향</div>
                <div className="text-sm text-violet-600 font-semibold">고객 만족도</div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="group relative">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {testimonialStats.verificationRate}%
                </div>
                <div className="text-gray-600 font-bold text-lg mb-2">검증된 후기</div>
                <div className="text-sm text-emerald-600 font-semibold">신뢰성 보장</div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;