'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Target,
  Users,
  Award,
  Clock,
  Shield,
  CheckCircle,
  Star,
  Heart,
  Zap,
  TrendingUp,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Globe,
  Building2,
  Calendar,
  ThumbsUp,
  Eye,
  Lock,
  RefreshCw,
} from "lucide-react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const values = [
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: "정확성",
      description:
        "고객의 요구사항을 정확히 파악하고 최적의 결과를 제공합니다.",
    },
    {
      icon: <Clock className="text-green-600" size={32} />,
      title: "신속성",
      description: "24시간 내 평균 처리로 빠른 예약 서비스를 제공합니다.",
    },
    {
      icon: <Shield className="text-purple-600" size={32} />,
      title: "안전성",
      description: "개인정보 보호와 안전한 결제 시스템을 보장합니다.",
    },
    {
      icon: <Heart className="text-red-600" size={32} />,
      title: "신뢰성",
      description: "약속한 서비스는 반드시 지키며, 투명한 소통을 합니다.",
    },
  ];

  const milestones = [
    {
      year: "2023.01",
      title: "QuickSlot 서비스 런칭",
      description: "캠핑장 예약 대행 서비스로 시작",
    },
    {
      year: "2023.06",
      title: "서비스 확장",
      description: "콘서트 티켓팅, 병원 예약 서비스 추가",
    },
    {
      year: "2023.12",
      title: "1만건 돌파",
      description: "누적 예약 성공 1만건 달성",
    },
    {
      year: "2024.03",
      title: "고객 만족도 4.8점",
      description: "높은 서비스 품질로 고객 신뢰 확보",
    },
    {
      year: "2024.06",
      title: "교육 신청 서비스 런칭",
      description: "다양한 교육 과정 신청 대행 서비스 시작",
    },
    {
      year: "2025.현재",
      title: "2만 5천건 돌파",
      description: "지속적인 성장과 서비스 개선",
    },
  ];

  const achievements = [
    {
      number: "25,000+",
      label: "성공한 예약",
      icon: <Award className="text-yellow-500" size={24} />,
    },
    {
      number: "98%",
      label: "평균 성공률",
      icon: <TrendingUp className="text-green-500" size={24} />,
    },
    {
      number: "4.8★",
      label: "고객 만족도",
      icon: <Star className="text-blue-500" size={24} />,
    },
    {
      number: "24시간",
      label: "평균 처리시간",
      icon: <Clock className="text-purple-500" size={24} />,
    },
  ];

  const testimonialsSummary = [
    {
      rating: 5,
      title: '"설악산 캠핑장 예약 성공!"',
      content:
        "매번 실패하던 설악산 캠핑장을 QuickSlot 덕분에 예약했어요. 담당자분이 실시간으로 진행상황을 알려주셔서 안심이 되었고, 예약 확정 후에도 상세한 안내를 해주셨습니다.",
      author: "김○○님",
      service: "캠핑장 예약",
    },
    {
      rating: 5,
      title: '"BTS 콘서트 티켓 성공!"',
      content:
        "혼자서는 절대 못했을 BTS 티켓팅을 성공했어요. 수수료가 있긴 하지만 그만한 가치가 충분했습니다. 좋은 자리로 예매해주셔서 정말 감사합니다.",
      author: "이○○님",
      service: "콘서트 티켓팅",
    },
    {
      rating: 4,
      title: '"병원 예약이 이렇게 쉽다니"',
      content:
        "직장인에게 정말 유용한 서비스예요. 원하는 의사 선생님 진료를 받을 수 있어서 만족스러웠고, 시간을 아낄 수 있어서 너무 좋았습니다.",
      author: "박○○님",
      service: "병원 예약",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        {/* 깔끔한 배경 패턴 */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        {/* 깔끔한 플로팅 요소들 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* 헤더 */}
        <div className="relative z-10 pt-20">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white shadow-lg rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 border border-blue-100 mb-12 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                홈으로 돌아가기
              </Link>

              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100">
                    <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-800">회사 소개</span>
                  </div>
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">신뢰할 수 있는 서비스</span>
                  </div>
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-500 text-white shadow-lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">25,000+ 성공사례</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  <span className="block text-3xl md:text-4xl lg:text-5xl mb-4">
                    <span className="text-blue-600 font-bold">QuickSlot 소개</span>
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700">
                    <span className="text-blue-600 font-bold">복잡한 예약</span>을
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700">
                    <span className="text-indigo-600 font-bold">간단하게</span> 만드는
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700">
                    <span className="text-blue-600 font-bold">전문 서비스</span>
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-12">
                  <span className="font-semibold text-xl md:text-2xl text-blue-600">고객의 소중한 시간</span>을 아껴드리고,<br />
                  <span className="font-medium text-gray-700 text-base md:text-lg">원하는 예약을 성공할 수 있도록</span> 끝까지 책임지겠습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/#services"
                    className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                  >
                    <Zap className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>서비스 이용하기</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl shadow-lg hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                  >
                    <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>문의하기</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* 깔끔한 성과 지표 */}
          <section className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">성과 지표</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600 font-bold">검증된 성과</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                실제 데이터로 증명된 QuickSlot의 서비스 품질
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 font-semibold text-base mb-1">{achievement.label}</div>
                    <div className="text-sm text-blue-600 font-medium">실제 검증 데이터</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 깔끔한 미션 & 비전 */}
          <section className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">미션 & 비전</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600 font-bold">우리의 미션</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                모든 사람이 원하는 예약을 쉽고 빠르게 성공할 수 있도록 돕습니다
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  왜 <span className="text-blue-600">QuickSlot</span>인가요?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                        전문가 네트워크
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        각 분야별 예약 전문가들이 최적화된 시스템으로 처리합니다. 
                        수년간의 경험을 바탕으로 높은 성공률을 보장합니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                        높은 성공률
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        평균 98%의 높은 예약 성공률을 자랑합니다. 
                        실패 시 100% 환불 보장으로 위험 부담을 최소화했습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Eye className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                        투명한 서비스
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        예약 과정을 실시간으로 공유하며 투명하게 운영합니다. 
                        진행상황을 단계별로 안내드립니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                        24시간 서비스
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        언제든지 예약 요청이 가능하며, 긴급한 경우 실시간 처리로 
                        빠르게 대응합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-blue-600 rounded-xl p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Zap className="text-white" size={40} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">빠르고 정확하게</h3>
                    <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                      더 이상 새벽에 일어나서 예약하거나, 티켓팅에 실패하는 
                      스트레스를 받지 마세요. QuickSlot이 모든 것을 해결해드립니다.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl font-bold mb-1">25,000+</div>
                        <div className="text-blue-200 font-semibold text-sm">성공한 예약</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl font-bold mb-1">4.8★</div>
                        <div className="text-blue-200 font-semibold text-sm">고객 만족도</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 깔끔한 핵심 가치 */}
          <section className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
                <Heart className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">핵심 가치</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600 font-bold">핵심 가치</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                QuickSlot이 추구하는 가치들입니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 깔끔한 회사 연혁 */}
          <section className={`mb-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-800">회사 연혁</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600 font-bold">회사 연혁</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                QuickSlot의 성장 과정을 소개합니다
              </p>
            </div>

            <div className="relative">
              {/* 중앙 라인 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full rounded-full"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      <div className="group relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                        <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3 border border-blue-200">
                          <Calendar className="w-4 h-4 mr-2" />
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* 중앙 노드 */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 깔끔한 고객 후기 요약 */}
          <section className={`mb-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-700 shadow-lg mb-6 border border-blue-200">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">고객들의 평가</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-600 font-bold">고객들의 평가</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  실제 이용 고객들의 솔직한 후기입니다
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {testimonialsSummary.map((testimonial, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 transition-all duration-300 ${
                              star <= testimonial.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-gray-600 font-semibold">
                        {testimonial.author}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {testimonial.content}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                      <Zap className="w-4 h-4 mr-2" />
                      {testimonial.service}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/reviews"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                >
                  <Star className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>더 많은 후기 보기</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </section>

          {/* 깔끔한 CTA */}
          <section className={`transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-blue-600 rounded-xl p-12 text-white text-center relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-white font-bold">QuickSlot과 함께 시작하세요</span>
                </h2>
                <p className="text-blue-100 mb-12 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  더 이상 예약 스트레스 받지 마시고, 전문가에게 맡겨보세요.
                  <br />
                  <span className="font-semibold text-white">원하는 예약을 성공할 때까지</span> 끝까지 책임지겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/#services"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    <Zap className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>서비스 이용하기</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl shadow-lg hover:bg-white hover:text-blue-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                  >
                    <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>문의하기</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
