"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { 
  Star, 
  Filter, 
  Search, 
  ThumbsUp, 
  Calendar, 
  MapPin, 
  User,
  ChevronDown,
  ChevronUp,
  Award,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Clock,
  CheckCircle,
  BarChart3
} from 'lucide-react';

// testimonials 데이터 import (실제로는 data/testimonials.ts에서 import)
import { testimonials, testimonialStats, Testimonial } from '@/data/testimonials';

interface Filters {
  service: string;
  rating: number;
  search: string;
  sortBy: string;
  location: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ReviewsListPage() {
  const [filteredReviews, setFilteredReviews] = useState<Testimonial[]>(testimonials);
  const [displayedReviews, setDisplayedReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    service: '',
    rating: 0,
    search: '',
    sortBy: 'latest',
    location: ''
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 8,
    total: testimonials.length,
    totalPages: Math.ceil(testimonials.length / 8)
  });
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});

  const services = [
    { value: '', label: '전체 서비스' },
    { value: 'camping', label: '🏕️ 캠핑장 예약' },
    { value: 'concert', label: '🎵 콘서트 티켓팅' },
    { value: 'medical', label: '🏥 병원 예약' },
    { value: 'education', label: '📚 교육 신청' },
    { value: 'pension', label: '🏠 펜션 예약' },
    { value: 'hotel', label: '🏨 호텔 예약' },
    { value: 'flight', label: '✈️ 항공 예약' },
    { value: 'restaurant', label: '🍽️ 식당 예약' },
    { value: 'golf', label: '⛳ 골프장 예약' },
    { value: 'spa', label: '🧖‍♀️ 스파 예약' },
    { value: 'exhibition', label: '🎨 전시회 예약' },
    { value: 'musical', label: '🎭 뮤지컬 예약' },
    { value: 'other', label: '🎯 기타 예약' }
  ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'rating-high', label: '평점 높은순' },
    { value: 'rating-low', label: '평점 낮은순' },
    { value: 'helpful', label: '도움됨 많은순' }
  ];

  // 고유한 지역 목록 추출
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(testimonials.map(t => {
      const parts = t.location.split(' ');
      return parts.length > 1 ? parts.slice(0, 2).join(' ') : parts[0];
    })));
    return [
      { value: '', label: '전체 지역' },
      ...uniqueLocations.map(loc => ({ value: loc, label: loc }))
    ];
  }, []);

  // 필터링 및 정렬 로직
  useEffect(() => {
    setLoading(true);
    
    let filtered = testimonials.filter(review => {
      // 서비스 필터
      if (filters.service && review.serviceId !== filters.service) return false;
      
      // 평점 필터
      if (filters.rating > 0 && review.rating < filters.rating) return false;
      
      // 검색 필터
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesContent = review.content.toLowerCase().includes(searchLower);
        const matchesName = review.name.toLowerCase().includes(searchLower);
        const matchesService = review.service.toLowerCase().includes(searchLower);
        const matchesTags = review.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesContent && !matchesName && !matchesService && !matchesTags) return false;
      }
      
      // 지역 필터
      if (filters.location && !review.location.includes(filters.location)) return false;
      
      return true;
    });

    // 정렬
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return (helpfulCounts[b.id] || 0) - (helpfulCounts[a.id] || 0);
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
    
    // 페이지네이션 업데이트
    const newTotalPages = Math.ceil(filtered.length / pagination.limit);
    setPagination(prev => ({
      ...prev,
      total: filtered.length,
      totalPages: newTotalPages,
      page: Math.min(prev.page, newTotalPages || 1)
    }));

    setTimeout(() => setLoading(false), 300);
  }, [filters, helpfulCounts, pagination.limit]);

  // 표시할 후기 계산
  useEffect(() => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setDisplayedReviews(filteredReviews.slice(startIndex, endIndex));
  }, [filteredReviews, pagination.page, pagination.limit]);

  // 필터 변경 처리
  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // 후기 펼치기/접기
  const toggleExpanded = (reviewId: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // 도움됨 표시
  const markHelpful = (reviewId: number) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
  };

  // 평점 표시
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // 서비스 이모지 가져오기
  const getServiceEmoji = (serviceId: string) => {
    const service = services.find(s => s.value === serviceId);
    return service ? service.label.split(' ')[0] : '🎯';
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      service: '',
      rating: 0,
      search: '',
      sortBy: 'latest',
      location: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* 깔끔한 페이지 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-blue-600 font-bold">고객 후기</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                QuickSlot 서비스를 이용하신 고객님들의 생생한 후기를 확인해보세요
              </p>
            </div>
            
            {/* 깔끔한 통계 카드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{testimonialStats.total}</div>
                    <div className="text-blue-100 text-sm">총 후기 수</div>
                  </div>
                  <MessageCircle size={28} className="text-blue-200" />
                </div>
              </div>
              <div className="bg-green-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{testimonialStats.averageRating}</div>
                    <div className="text-green-100 text-sm">평균 평점</div>
                  </div>
                  <Star size={28} className="text-green-200 fill-current" />
                </div>
              </div>
              <div className="bg-indigo-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{testimonialStats.verificationRate}%</div>
                    <div className="text-indigo-100 text-sm">인증율</div>
                  </div>
                  <CheckCircle size={28} className="text-indigo-200" />
                </div>
              </div>
              <div className="bg-purple-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{testimonialStats.ratingDistribution[5]}</div>
                    <div className="text-purple-100 text-sm">5점 후기</div>
                  </div>
                  <Award size={28} className="text-purple-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 깔끔한 필터 및 검색 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Filter className="mr-2 text-blue-600" size={24} />
              필터 및 검색
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={resetFilters}
                className="text-sm text-gray-600 hover:text-blue-600 underline transition-colors"
              >
                필터 초기화
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                <span className="ml-1">필터</span>
              </button>
            </div>
          </div>

          <div className={`grid gap-4 ${showFilters ? 'grid-cols-1' : 'hidden lg:grid'} lg:grid-cols-3 xl:grid-cols-5`}>
            {/* 검색 */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="후기 내용, 이름, 태그 검색..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* 서비스 필터 */}
            <select
              value={filters.service}
              onChange={(e) => handleFilterChange('service', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              {services.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>

            {/* 지역 필터 */}
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              {locations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>

            {/* 평점 필터 */}
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              <option value={0}>전체 평점</option>
              <option value={5}>⭐⭐⭐⭐⭐ 5점</option>
              <option value={4}>⭐⭐⭐⭐ 4점 이상</option>
              <option value={3}>⭐⭐⭐ 3점 이상</option>
              <option value={2}>⭐⭐ 2점 이상</option>
              <option value={1}>⭐ 1점 이상</option>
            </select>

            {/* 정렬 (다음 행) */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none lg:col-start-1 transition-colors"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 필터 결과 요약 */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              총 <span className="font-semibold text-blue-600">{pagination.total}</span>개의 후기가 있습니다
              {filters.search && (
                <span> • '<span className="font-medium">{filters.search}</span>' 검색 결과</span>
              )}
            </div>
            {loading && (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                필터링 중...
              </div>
            )}
          </div>
        </div>

        {/* 깔끔한 후기 목록 */}
        <div className="space-y-6">
          {displayedReviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
              <MessageCircle className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                후기가 없습니다
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                선택하신 조건에 맞는 후기가 없습니다. 다른 조건으로 검색해보시거나 필터를 초기화해보세요.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              >
                전체 후기 보기
              </button>
            </div>
          ) : (
            displayedReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* 깔끔한 후기 헤더 */}
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">
                          {getServiceEmoji(review.serviceId)}
                        </span>
                        <div>
                          <span className="text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                            {review.service}
                          </span>
                          {review.verified && (
                            <span className="ml-2 text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full flex items-center w-fit mt-1 border border-green-200">
                              <CheckCircle size={12} className="mr-1" />
                              인증됨
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-400" />
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          {review.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-lg font-bold text-gray-900">{review.rating}.0</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {review.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 깔끔한 후기 내용 */}
                <div className="p-6">
                  <div className={`text-gray-800 leading-relaxed mb-4 ${
                    expandedReviews.has(review.id) ? '' : review.content.length > 200 ? 'line-clamp-3' : ''
                  }`}>
                    "{review.content}"
                  </div>
                  
                  {review.content.length > 200 && (
                    <button
                      onClick={() => toggleExpanded(review.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mb-4 transition-colors"
                    >
                      {expandedReviews.has(review.id) ? (
                        <>
                          접기 <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          더보기 <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}

                  {/* 태그 */}
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 깔끔한 하단 액션 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <TrendingUp size={16} className="mr-1" />
                        추천해요
                      </span>
                    </div>

                    <button
                      onClick={() => markHelpful(review.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-200"
                    >
                      <ThumbsUp size={16} />
                      <span className="text-sm font-medium">
                        도움됨 {helpfulCounts[review.id] || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 개선된 페이지네이션 */}
        {pagination.totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center space-x-1 bg-white rounded-xl shadow-lg p-2 border border-gray-100">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={pagination.page === 1}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium disabled:hover:bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else {
                    const start = Math.max(1, pagination.page - 2);
                    const end = Math.min(pagination.totalPages, start + 4);
                    pageNum = start + i;
                    if (pageNum > end) return null;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        pageNum === pagination.page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium disabled:hover:bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 깔끔한 CTA */}
        <div className="mt-16 bg-blue-600 rounded-xl p-8 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            후기를 남겨주세요!
          </h2>
          <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
            QuickSlot 서비스는 어떠셨나요? 솔직한 후기를 남겨주세요.
          </p>
          <button 
            onClick={() => window.location.href = '/reviews/write'}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto shadow-lg"
          >
            후기 작성하기
            <ExternalLink size={20} className="ml-2" />
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}