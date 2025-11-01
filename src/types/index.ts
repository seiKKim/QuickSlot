// 공통 타입들
export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// 서비스 관련 타입들 (services.ts에서 import)
export type { ServiceDetail, ServiceFeature } from '../data/services';

// 통계 관련 타입들 (stats.ts에서 import)
export type { StatItem } from '../data/stats';

// 후기 관련 타입들 (testimonials.ts에서 import)
export type { Testimonial } from '../data/testimonials';

// FAQ 관련 타입들 (faqs.ts에서 import)
export type { FAQ } from '../data/faqs';

// 연락처 관련 타입들 (company.ts에서 import)
export type { ContactMethod, ProcessStep } from '../data/company';

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 폼 관련 타입들
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  privacyAgreed: boolean;
}

export interface ReservationFormData {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
  };
  serviceInfo: {
    serviceType: string;
    targetSite: string;
    preferredDate: string;
    urgency: 'normal' | 'urgent';
    additionalNotes: string;
  };
  agreementInfo: {
    termsAgreed: boolean;
    privacyAgreed: boolean;
    refundPolicyAgreed: boolean;
  };
}

// 네비게이션 관련 타입
export interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

// 페이지 메타데이터 타입
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

// 알림 관련 타입
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  isVisible: boolean;
}

// 모달 관련 타입
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// 버튼 관련 타입
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// 카드 관련 타입
export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

// 검색 관련 타입
export interface SearchFilters {
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  rating?: number;
  verified?: boolean;
}

// 페이지네이션 타입
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 이벤트 핸들러 타입들
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// 유틸리티 타입들
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// 환경 변수 타입
export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_KAKAO_API_KEY?: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
}