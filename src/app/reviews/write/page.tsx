"use client";
import React, { useState } from 'react';
import { Star, Send, Gift, ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface ReviewData {
  nickname: string;
  service: string;
  rating: number;
  title: string;
  content: string;
  usageDate: string;
  location: string;
  wouldRecommend: boolean;
  
  // 혜택 관련 (선택)
  wantsCoupon: boolean;
  email: string;
  phone: string;
}

export default function SimpleReviewForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReviewData>({
    nickname: '',
    service: '',
    rating: 0,
    title: '',
    content: '',
    usageDate: '',
    location: '',
    wouldRecommend: true,
    wantsCoupon: false,
    email: '',
    phone: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { value: 'camping', label: '🏕️ 캠핑장 예약' },
    { value: 'concert', label: '🎵 콘서트 티켓팅' },
    { value: 'medical', label: '🏥 병원 예약' },
    { value: 'education', label: '📚 교육 신청' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // API 호출
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          service: formData.service,
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
          usageDate: formData.usageDate || undefined,
          location: formData.location || undefined,
          wouldRecommend: formData.wouldRecommend,
          wantsCoupon: formData.wantsCoupon,
          email: formData.wantsCoupon ? formData.email : undefined,
          phone: formData.wantsCoupon ? formData.phone : undefined,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '후기 제출에 실패했습니다');
      }

      console.log('Review submitted successfully:', result.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : '후기 제출에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.nickname && formData.service && formData.rating > 0;
  const isStep2Valid = formData.title && formData.content.length >= 20;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-green-200">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            후기 작성 완료! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            소중한 후기를 남겨주셔서 감사합니다.<br />
            검토 후 공개될 예정입니다.
          </p>
          {formData.wantsCoupon && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className="text-sm text-blue-800">
                🎁 10% 할인쿠폰이 이메일로 발송됩니다!
              </p>
            </div>
          )}
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
              setFormData({
                nickname: '', service: '', rating: 0, title: '', content: '',
                usageDate: '', location: '', wouldRecommend: true,
                wantsCoupon: false, email: '', phone: ''
              });
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            새 후기 작성하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* 깔끔한 헤더 */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600 font-bold">간편 후기 작성</span>
          </h1>
          <p className="text-gray-600 text-lg">
            3단계로 간편하게 후기를 남겨보세요
          </p>
        </div>

        {/* 깔끔한 진행 표시기 */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= stepNum 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 깔끔한 폼 컨테이너 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          {/* Step 1: 기본 정보 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  기본 정보를 알려주세요
                </h2>
                <p className="text-gray-600 text-sm">
                  개인정보가 아닌 간단한 정보만 입력하세요
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  닉네임 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-600"
                  placeholder="예: 캠핑러버, 음악애호가 등"
                  maxLength={20}
                />
                <p className="text-xs text-gray-500 mt-1">
                  실명이 아닌 원하는 닉네임을 입력하세요
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이용 서비스 <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-600"
                >
                  <option value="">서비스를 선택해주세요</option>
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  전체적인 만족도 <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-center space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none transform hover:scale-110 transition-transform"
                    >
                      <Star
                        size={40}
                        className={`${
                          star <= (hoverRating || formData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  {formData.rating > 0 && `${formData.rating}점 선택됨`}
                </p>
              </div>

              {/* 선택사항 */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  선택사항 (더 도움되는 후기를 위해)
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      이용 날짜
                    </label>
                    <input
                      type="date"
                      name="usageDate"
                      value={formData.usageDate}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors text-gray-900 placeholder-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      지역
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors text-gray-900 placeholder-gray-600"
                      placeholder="예: 서울, 부산"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                className={`w-full flex items-center justify-center py-3 rounded-lg font-semibold transition-colors shadow-lg ${
                  isStep1Valid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                다음 단계
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          )}

          {/* Step 2: 후기 작성 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  후기를 작성해주세요
                </h2>
                <p className="text-gray-600 text-sm">
                  솔직한 경험을 공유해주세요
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  후기 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-600"
                  placeholder="예: 빠르고 정확한 예약 서비스!"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.title.length}/50자
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  상세 후기 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical transition-colors text-gray-900 placeholder-gray-600"
                  placeholder="서비스 이용 경험을 자유롭게 작성해주세요.&#10;&#10;- 어떤 점이 좋았나요?&#10;- 개선되었으면 하는 점이 있나요?&#10;- 다른 분들께 도움이 될 팁이 있나요?"
                  maxLength={500}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>최소 20자 이상 작성해주세요</span>
                  <span>{formData.content.length}/500자</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  다른 분들께 추천하시겠어요?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      checked={formData.wouldRecommend === true}
                      onChange={() => setFormData(prev => ({ ...prev, wouldRecommend: true }))}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">👍 추천해요</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      checked={formData.wouldRecommend === false}
                      onChange={() => setFormData(prev => ({ ...prev, wouldRecommend: false }))}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">👎 추천하지 않아요</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  이전
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className={`flex-1 flex items-center justify-center py-3 rounded-lg font-semibold transition-colors shadow-lg ${
                    isStep2Valid
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음 단계
                  <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 혜택 및 완료 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  혜택을 받고 싶으신가요?
                </h2>
                <p className="text-gray-600 text-sm">
                  선택사항입니다. 원하지 않으시면 바로 제출하세요
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="wantsCoupon"
                    checked={formData.wantsCoupon}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Gift className="text-blue-600 mr-2" size={20} />
                      <h3 className="font-semibold text-gray-900">
                        10% 할인쿠폰 받기
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      다음 서비스 이용 시 사용할 수 있는 할인쿠폰을 받아보세요
                    </p>
                    
                    {formData.wantsCoupon && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            이메일 주소
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors text-gray-900 placeholder-gray-600"
                            placeholder="coupon@example.com"
                          />
                          <p className="text-xs text-blue-600 mt-1 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            쿠폰 발송 후 즉시 삭제되며 저장되지 않습니다
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            휴대폰 번호 (SMS 알림용, 선택)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors text-gray-900 placeholder-gray-600"
                            placeholder="010-1234-5678"
                          />
                          <p className="text-xs text-blue-600 mt-1 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            알림 발송 후 즉시 삭제되며 저장되지 않습니다
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📋 후기 내용 미리보기
                </h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>닉네임:</strong> {formData.nickname}</p>
                  <p><strong>서비스:</strong> {serviceOptions.find(s => s.value === formData.service)?.label}</p>
                  <p><strong>평점:</strong> {'⭐'.repeat(formData.rating)}</p>
                  <p><strong>제목:</strong> {formData.title}</p>
                  <p><strong>추천:</strong> {formData.wouldRecommend ? '👍 추천' : '👎 비추천'}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  이전
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Send className="mr-2" size={20} />
                  후기 제출하기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 안내 메시지 */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            🔒 개인정보는 안전하게 보호되며, 후기 작성을 위한 최소한의 정보만 수집합니다
          </p>
        </div>
      </div>
    </div>
  );
}