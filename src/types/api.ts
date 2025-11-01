// src/types/api.ts
// API 공통 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  details?: any
}

// 페이지네이션 타입
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationResponse {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 서비스 관련 타입
export interface Service {
  id: string
  name: string
  slug: string
  description: string
  category: string
  pricing: Record<string, any>
  isActive: boolean
  createdAt: Date
}

export interface ServiceWithStats extends Service {
  averageRating: number
  reservationCount: number
  reviewCount: number
}

export interface ServiceCreateInput {
  name: string
  slug: string
  description: string
  category: string
  pricing?: Record<string, any>
  isActive?: boolean
}

// 후기 관련 타입
export interface Review {
  id: string
  title: string
  content: string
  rating: number
  pros: string[]
  cons: string[]
  usageDate: Date
  location: string
  wouldRecommend: boolean
  helpfulCount: number
  createdAt: Date
  customerName: string
  service: {
    name: string
    slug: string
  }
}

export interface ReviewCreateInput {
  nickname: string
  service: string
  rating: number
  title: string
  content: string
  usageDate?: string
  location?: string
  wouldRecommend: boolean
  wantsCoupon?: boolean
  email?: string
  phone?: string
}

export interface ReviewListResponse {
  reviews: Review[]
  pagination: PaginationResponse
}

// 예약 관련 타입
export interface Reservation {
  id: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
  targetDate?: Date
  targetLocation?: string
  notes?: string
  urgency: string
  totalAmount: number
  depositAmount: number
  depositPaid: boolean
  finalPaid: boolean
  isSuccessful?: boolean
  resultNotes?: string
  confirmationData?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  service: Service
}

export interface ReservationCreateInput {
  name: string
  phone: string
  email?: string
  serviceId: string
  targetDate?: string
  targetLocation?: string
  notes?: string
  urgency?: 'low' | 'normal' | 'high'
}

// 문의 관련 타입
export interface Inquiry {
  id: string
  status: 'PENDING' | 'RESPONDED' | 'CLOSED'
  name: string
  email: string
  phone: string
  service?: string
  subject: string
  message: string
  urgency: string
  response?: string
  respondedAt?: Date
  respondedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface InquiryCreateInput {
  name: string
  email: string
  phone: string
  service?: string
  subject: string
  message: string
  urgency?: 'low' | 'normal' | 'high'
}

// 에러 타입
export interface ApiError {
  message: string
  statusCode?: number
  details?: any
}

// 필터 타입
export interface ServiceFilter {
  category?: string
  isActive?: boolean
}

export interface ReviewFilter {
  service?: string
  rating?: number
  page?: number
  limit?: number
}

export interface ReservationFilter {
  status?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}