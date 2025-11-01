// src/components/layout/Header.tsx
'use client';

import { 
  Menu, 
  X, 
  MessageCircle, 
  ArrowRight, 
  Search, 
  Bell, 
  ChevronDown,
  Home,
  Users,
  Star,
  HelpCircle,
  Mail,
  Info,
  BookOpen,
  FileText,
  Clock
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  type: 'service' | 'faq' | 'review' | 'page';
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  metadata?: any;
}

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUtilityVisible, setIsUtilityVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // 스크롤 시 유틸리티 바는 항상 표시
      setIsUtilityVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isServicesOpen && !target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);


  // 검색 기능
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data.results);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 검색어 변경 시 디바운스 처리
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  // 검색 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSearchOpen && !target.closest('.search-modal')) {
        setIsSearchOpen(false);
        setShowResults(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // 서비스 드롭다운 메뉴
  const services = [
    { 
      href: '/services/camping', 
      label: '캠핑장 예약', 
      icon: '🏕️',
      desc: '인기 캠핑장 실시간 예약'
    },
    { 
      href: '/services/concert', 
      label: '콘서트 티켓팅', 
      icon: '🎵',
      desc: '초고속 티켓팅 대행'
    },
    { 
      href: '/services/medical', 
      label: '병원 예약', 
      icon: '🏥',
      desc: '대형병원 빠른 예약'
    },
    { 
      href: '/services/education', 
      label: '교육 신청', 
      icon: '🎓',
      desc: '인기 강좌 수강신청'
    },
  ];

  const navItems = [
    { href: '/', label: '홈', icon: Home },
    { href: '/reviews', label: '고객후기', icon: Star },
    { href: '/contact', label: '문의하기', icon: Mail },
    { href: '/process', label: '이용절차', icon: FileText },
  ];

  // 유틸리티 메뉴
  const utilityMenu = [
    { href: '/about', label: '회사소개', icon: Info },
    { href: '/faq', label: '고객센터', icon: HelpCircle },
    { href: '/reviews', label: '후기', icon: Star },
    { href: '/process', label: '이용절차', icon: BookOpen },
  ];

  return (
    <>
      {/* 최상단 유틸리티 바 */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-sm border-b border-blue-500/30 transition-all duration-300 ${
        isUtilityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
        <div className="container">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex items-center space-x-4">
              {utilityMenu.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <IconComponent className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline text-xs font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <header className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200' 
          : 'bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white backdrop-blur-sm'
      }`}>
        <div className="container">
          <div className="flex justify-between items-center h-20">
            {/* 로고 */}
            <div className="flex items-center group">
              <a href="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-xl">Q</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    QuickSlot
                  </h1>
                  <span className="text-gray-600 text-sm font-medium">전문 예약대행</span>
                </div>
              </a>
            </div>
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group rounded-lg hover:bg-blue-50"
                  >
                    <IconComponent className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                  </a>
                );
              })}
              
              {/* 서비스 드롭다운 */}
              <div className="relative services-dropdown">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-lg hover:bg-blue-50"
                >
                  <span>서비스</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* 드롭다운 메뉴 */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-200 overflow-hidden transition-all duration-300 ${
                  isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  {services.map((service, index) => (
                    <a
                      key={service.href}
                      href={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <span className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </span>
                      <div>
                        <div className="font-medium group-hover:text-blue-600">{service.label}</div>
                        <div className="text-sm text-blue-600/70">{service.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* 우측 액션 버튼들 */}
            <div className="flex items-center space-x-3">
              {/* 검색 버튼 */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300 flex items-center justify-center group border border-blue-200"
                aria-label="검색"
              >
                <Search className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </button>

              {/* 알림 버튼 */}
              <button className="relative w-10 h-10 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300 flex items-center justify-center group border border-blue-200">
                <Bell className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-white">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>

              {/* 관리자 페이지 */}
              <a
                href="/admin"
                className="hidden sm:flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 group rounded-lg hover:bg-blue-50"
              >
                <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">관리자</span>
              </a>

              {/* 카카오톡 상담 */}
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">카톡 상담</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-12 h-12 rounded-lg bg-blue-50 backdrop-blur-sm border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                aria-label="메뉴 토글"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute top-1 left-0 w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`} />
                  <span className={`absolute top-3 left-0 w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`} />
                  <span className={`absolute top-5 left-0 w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-white via-blue-50/30 to-white backdrop-blur-md border-t border-blue-200 shadow-xl transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="container py-6">
            {/* 검색 바 */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색어를 입력하세요..."
                  className="w-full px-4 py-3 pl-12 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
              </form>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="space-y-2 mb-6">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between py-4 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      {item.label}
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                );
              })}
            </nav>

            {/* 서비스 섹션 */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">서비스</h3>
              <div className="grid grid-cols-1 gap-2">
                {services.map((service, index) => (
                  <a
                    key={service.href}
                    href={service.href}
                    className="flex items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                        {service.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {service.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* 모바일 CTA 버튼들 */}
            <div className="space-y-3">
              <a
                href="https://open.kakao.com/o/soQDqKJh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                카카오톡 상담하기
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 검색 모달 */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 search-modal">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-white via-blue-50/30 to-white rounded-2xl shadow-2xl border border-blue-200 overflow-hidden max-h-[80vh] flex flex-col">
            <form onSubmit={handleSearch} className="p-6 border-b border-blue-200">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="무엇을 찾고 계신가요?"
                  className="w-full px-6 py-4 pl-14 text-lg bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                  autoFocus
                />
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-500" />
                {isSearching && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </form>

            {/* 검색 결과 */}
            {showResults && searchResults.length > 0 && (
              <div className="flex-1 overflow-y-auto p-6">
                <h4 className="text-sm font-semibold text-blue-600 mb-4">
                  검색 결과 ({searchResults.length}개)
                </h4>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full text-left px-4 py-4 bg-white hover:bg-blue-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-md group"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl flex-shrink-0">{result.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              {result.type === 'service' ? '서비스' : 
                               result.type === 'faq' ? 'FAQ' : 
                               result.type === 'review' ? '후기' : '페이지'}
                            </span>
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                              {result.title}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                          {result.metadata && (
                            <div className="mt-2 flex items-center space-x-3 text-xs text-gray-500">
                              {result.metadata.successRate && (
                                <span>성공률: {result.metadata.successRate}%</span>
                              )}
                              {result.metadata.rating && (
                                <span className="flex items-center">
                                  {'⭐'.repeat(result.metadata.rating)}
                                </span>
                              )}
                              {result.metadata.category && (
                                <span>{result.metadata.category}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
                {searchResults.length >= 8 && (
                  <button
                    onClick={handleSearch}
                    className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                  >
                    전체 결과 보기
                  </button>
                )}
              </div>
            )}

            {/* 검색 결과 없음 */}
            {showResults && searchResults.length === 0 && !isSearching && searchQuery.trim() && (
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">검색 결과가 없습니다</p>
                  <p className="text-sm text-gray-500">다른 검색어를 시도해보세요</p>
                </div>
              </div>
            )}

            {/* 검색 제안 (결과가 없을 때) */}
            {!showResults && !isSearching && (
              <div className="flex-1 overflow-y-auto p-6">
                <h4 className="text-sm font-semibold text-blue-600 mb-3">인기 검색어</h4>
                <div className="space-y-2">
                  {['캠핑장 예약', '콘서트 티켓팅', '병원 예약', '교육 신청', 'FAQ', '후기'].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(suggestion)}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;