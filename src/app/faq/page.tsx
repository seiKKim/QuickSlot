'use client';

import { ArrowLeft, ChevronDown, ChevronUp, Filter, MessageCircle, Search, Star } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { faqCategories, faqs, getFAQsByCategory, getPopularFAQs, getRelatedFAQs, searchFAQs } from '@/data/faqs';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Link from 'next/link';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const popularFAQs = getPopularFAQs();

  // 필터링된 FAQ 목록
  const filteredFAQs = useMemo(() => {
    let result = faqs;

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      result = getFAQsByCategory(selectedCategory);
    }

    // 검색 필터
    if (searchQuery.trim()) {
      result = result.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const toggleFAQ = (faqId: number) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setExpandedFAQ(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
    setExpandedFAQ(null);
  };

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
              <span className="text-gray-900 font-medium">자주 묻는 질문</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              메인으로 돌아가기
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              XUI 예약대행 서비스에 대해 궁금한 점이 있으신가요?<br />
              자주 묻는 질문들을 통해 빠르게 답변을 확인해보세요.
            </p>

            {/* 검색 박스 */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="궁금한 내용을 검색해보세요... (예: 환불, 성공률, 요금)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 검색 결과 요약 */}
            {searchQuery && (
              <div className="mt-4 text-sm text-gray-600">
                "{searchQuery}"에 대한 검색 결과: <span className="font-semibold text-blue-600">{filteredFAQs.length}개</span>
              </div>
            )}
          </div>
        </section>

        {/* 인기 FAQ (검색 안 했을 때만 표시) */}
        {!searchQuery && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <Star className="inline text-yellow-500 mr-2" size={32} />
                  가장 많이 묻는 질문
                </h2>
                <p className="text-lg text-gray-600">
                  고객님들이 가장 궁금해하시는 질문들입니다
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularFAQs.map((faq) => (
                  <div key={faq.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => {
                      setExpandedFAQ(faq.id);
                      // 해당 FAQ로 스크롤
                      setTimeout(() => {
                        const element = document.getElementById(`faq-${faq.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {faq.question}
                      </h3>
                      <Star className="text-yellow-500 flex-shrink-0 ml-2" size={16} />
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      {faq.answer.slice(0, 80)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {faq.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 필터 및 FAQ 목록 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              {/* 사이드바 필터 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                  <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h3 className="text-lg font-semibold text-gray-900">필터</h3>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center text-blue-600"
                    >
                      <Filter size={20} className="mr-1" />
                      {showFilters ? '숨기기' : '보기'}
                    </button>
                  </div>

                  <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 hidden lg:block">
                      카테고리
                    </h3>
                    <div className="space-y-2">
                      {faqCategories.map((category) => {
                        const categoryCount = category === '전체' 
                          ? faqs.length 
                          : getFAQsByCategory(category).length;
                        
                        return (
                          <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                              selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{category}</span>
                              <span className={`text-sm ${
                                selectedCategory === category ? 'text-blue-200' : 'text-gray-500'
                              }`}>
                                {categoryCount}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* 빠른 연락처 */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">답변을 찾지 못하셨나요?</h4>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <MessageCircle size={16} className="mr-2" />
                          카톡 상담하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ 목록 */}
              <div className="lg:col-span-3 mt-8 lg:mt-0">
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCategory === '전체' ? '전체 질문' : selectedCategory}
                      </h2>
                      <span className="text-sm text-gray-500">
                        총 {filteredFAQs.length}개의 질문
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {filteredFAQs.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                          <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          검색 결과가 없습니다
                        </h3>
                        <p className="text-gray-600 mb-4">
                          다른 키워드로 검색하시거나 카테고리를 변경해보세요.
                        </p>
                        <button
                          onClick={clearSearch}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          전체 질문 보기
                        </button>
                      </div>
                    ) : (
                      filteredFAQs.map((faq, index) => (
                        <div key={faq.id} id={`faq-${faq.id}`} className="p-6">
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full text-left flex items-start justify-between hover:text-blue-600 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-3">
                                  {faq.category}
                                </span>
                                {faq.isPopular && (
                                  <Star className="text-yellow-500" size={16} />
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Q{index + 1}. {faq.question}
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              {expandedFAQ === faq.id ? (
                                <ChevronUp className="text-blue-600" size={24} />
                              ) : (
                                <ChevronDown className="text-gray-400" size={24} />
                              )}
                            </div>
                          </button>

                          {expandedFAQ === faq.id && (
                            <div className="mt-6 pl-4 border-l-4 border-blue-200">
                              <div className="bg-blue-50 rounded-lg p-6">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                  {faq.answer}
                                </p>

                                {/* 관련 FAQ */}
                                {faq.relatedFAQs && faq.relatedFAQs.length > 0 && (
                                  <div className="mt-6 pt-6 border-t border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3">
                                      관련 질문
                                    </h4>
                                    <div className="space-y-2">
                                      {getRelatedFAQs(faq.id).map((relatedFAQ) => (
                                        <button
                                          key={relatedFAQ.id}
                                          onClick={() => {
                                            setExpandedFAQ(relatedFAQ.id);
                                            setTimeout(() => {
                                              const element = document.getElementById(`faq-${relatedFAQ.id}`);
                                              if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                              }
                                            }, 100);
                                          }}
                                          className="block w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:underline"
                                        >
                                          → {relatedFAQ.question}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 추가 도움말 섹션 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                원하는 답변을 찾지 못하셨나요?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                전문 상담사가 직접 궁금한 점을 해결해드리겠습니다
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-20 rounded-xl p-6">
                  <MessageCircle className="mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-semibold mb-2">카카오톡 상담</h3>
                  <p className="text-sm opacity-90 mb-4">실시간으로 빠른 답변</p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    카톡 상담하기
                  </button>
                </div>

                <div className="bg-white bg-opacity-20 rounded-xl p-6">
                  <MessageCircle className="mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-semibold mb-2">문의하기</h3>
                  <p className="text-sm opacity-90 mb-4">상세한 문의 접수</p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    문의 작성하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}