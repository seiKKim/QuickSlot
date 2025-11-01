import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle, Calendar, MapPin, FileText, Phone, User, Mail } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricing: {
    basic?: number;
    premium?: number;
    description?: string;
  };
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  targetDate: string;
  targetLocation: string;
  notes: string;
  urgency: 'low' | 'normal' | 'high';
}

interface BookingRequestFormProps {
  onSuccess?: () => void;
  initialServiceId?: string;
}

export default function BookingRequestForm({ onSuccess, initialServiceId }: BookingRequestFormProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    serviceId: initialServiceId || '',
    targetDate: '',
    targetLocation: '',
    notes: '',
    urgency: 'normal'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // 서비스 목록 조회
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = '서비스를 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '예약 요청에 실패했습니다');
      }

      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : '예약 요청에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.serviceId);

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          예약 요청 완료! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          예약 요청이 성공적으로 접수되었습니다.<br />
          영업일 기준 1-2일 내에 연락드리겠습니다.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📞 빠른 연락을 원하시나요?</h3>
          <p className="text-blue-700 text-sm">
            카카오톡: @quickslot<br />
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '', phone: '', email: '', serviceId: initialServiceId || '',
              targetDate: '', targetLocation: '', notes: '', urgency: 'normal'
            });
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          새 예약 요청하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        예약 요청하기
      </h2>
      <p className="text-gray-600 mb-8">
        원하시는 예약을 전문가가 대신 처리해드립니다
      </p>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="text-red-600 mr-2" size={20} />
            <span className="text-red-800">{submitError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            이메일 (선택사항)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* 서비스 선택 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            예약 서비스 <span className="text-red-500">*</span>
          </label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              errors.serviceId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">서비스를 선택해주세요</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {errors.serviceId}
            </p>
          )}
          
          {selectedService && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">{selectedService.name}</h4>
              <p className="text-blue-700 text-sm mb-2">{selectedService.description}</p>
              {selectedService.pricing?.description && (
                <p className="text-blue-600 text-sm font-medium">
                  💰 {selectedService.pricing.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 예약 상세 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              희망 날짜
            </label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              희망 장소/지역
            </label>
            <input
              type="text"
              name="targetLocation"
              value={formData.targetLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="예: 설악산 국립공원, 올림픽공원 등"
            />
          </div>
        </div>

        {/* 긴급도 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            긴급도
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="low"
                checked={formData.urgency === 'low'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">🟢 여유있음</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="normal"
                checked={formData.urgency === 'normal'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">🟡 보통</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="high"
                checked={formData.urgency === 'high'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">🔴 급함</span>
            </label>
          </div>
        </div>

        {/* 추가 요청사항 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-1" />
            추가 요청사항
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
            placeholder="특별한 요청사항이나 참고할 점이 있다면 자세히 적어주세요.&#10;&#10;예시:&#10;- 4인용 텐트 사이트 희망&#10;- R석 또는 S석 선호&#10;- 주차 가능한 곳 희망&#10;- 소아과 전문의 진료 희망"
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {formData.notes.length}/1000자
          </p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              예약 요청 중...
            </>
          ) : (
            <>
              <Send className="mr-2" size={20} />
              예약 요청하기
            </>
          )}
        </button>

        {/* 안내 메시지 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">💡 서비스 이용 안내</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 예약 성공 시에만 수수료가 발생합니다</li>
            <li>• 예약 실패 시 100% 환불해드립니다</li>
            <li>• 긴급한 경우 카카오톡(@quickslot)으로 문의해주세요</li>
            <li>• 영업시간: 평일 09:00-18:00</li>
          </ul>
        </div>
      </form>
    </div>
  );
}