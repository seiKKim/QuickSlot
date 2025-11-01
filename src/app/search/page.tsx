'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SearchResult {
  type: 'service' | 'faq' | 'review' | 'page';
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  metadata?: any;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&limit=50`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data.results);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'service': return '서비스';
      case 'faq': return 'FAQ';
      case 'review': return '후기';
      case 'page': return '페이지';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-700';
      case 'faq': return 'bg-green-100 text-green-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'page': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* 검색 바 */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              메인으로 돌아가기
            </Link>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="무엇을 찾고 계신가요?"
                className="w-full px-6 py-4 pl-14 text-lg bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-lg"
                autoFocus
              />
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-500" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                검색
              </button>
            </form>
          </div>

          {/* 검색 결과 */}
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">검색 중...</p>
              </div>
            </div>
          ) : query && results.length > 0 ? (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  &quot;{query}&quot; 검색 결과
                </h1>
                <p className="text-gray-600">
                  총 {total}개의 결과를 찾았습니다
                </p>
              </div>

              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl flex-shrink-0">{result.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {result.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {result.description}
                        </p>
                        {result.metadata && (
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                            {result.metadata.date && (
                              <span>{result.metadata.date}</span>
                            )}
                          </div>
                        )}
                        <div className="mt-3 text-sm text-blue-600 group-hover:text-blue-700">
                          {result.url} →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">검색 결과가 없습니다</h2>
              <p className="text-gray-600 mb-6">
                &quot;{query}&quot;에 대한 검색 결과를 찾을 수 없습니다
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-4">다음과 같이 시도해보세요:</p>
                <ul className="text-left max-w-md mx-auto space-y-1 text-sm text-gray-600">
                  <li>• 검색어의 철자를 확인해주세요</li>
                  <li>• 더 일반적인 검색어를 사용해보세요</li>
                  <li>• 다른 키워드로 검색해보세요</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">검색어를 입력하세요</h2>
              <p className="text-gray-600">
                원하는 정보를 검색하시면 관련 결과를 보여드립니다
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

