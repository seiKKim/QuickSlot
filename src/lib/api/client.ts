import axios from 'axios'
import type { 
  ApiResponse, 
  Review, 
  ReviewListResponse, 
  ReviewCreateInput,
  ServiceWithStats, 
  ServiceFilter,
  ReviewFilter,
  PaginationParams
} from '@/types/api'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API 함수들
export const reviewsApi = {
  // 후기 목록 조회
  async getReviews(params?: ReviewFilter): Promise<ReviewListResponse> {
    const { data } = await apiClient.get<ApiResponse<ReviewListResponse>>('/reviews', {
      params
    })
    
    if (!data.success) {
      throw new Error(data.error || '후기 목록 조회 실패')
    }
    
    return data.data!
  },

  // 후기 작성
  async createReview(reviewData: ReviewCreateInput): Promise<{
    id: string
    title: string
    rating: number
    createdAt: Date
    service: { name: string; slug: string }
    couponSent: boolean
  }> {
    const { data } = await apiClient.post<ApiResponse>('/reviews', reviewData)
    
    if (!data.success) {
      throw new Error(data.error || '후기 작성 실패')
    }
    
    return data.data
  },

  // 후기 도움됨 표시
  async markHelpful(reviewId: string): Promise<void> {
    const { data } = await apiClient.post<ApiResponse>(`/reviews/${reviewId}/helpful`)
    
    if (!data.success) {
      throw new Error(data.error || '도움됨 표시 실패')
    }
  }
}

export const servicesApi = {
  // 서비스 목록 조회
  async getServices(params?: ServiceFilter): Promise<ServiceWithStats[]> {
    const { data } = await apiClient.get<ApiResponse<ServiceWithStats[]>>('/services', {
      params
    })
    
    if (!data.success) {
      throw new Error(data.error || '서비스 목록 조회 실패')
    }
    
    return data.data!
  },

  // 특정 서비스 조회
  async getService(slug: string): Promise<ServiceWithStats> {
    const { data } = await apiClient.get<ApiResponse<ServiceWithStats>>(`/services/${slug}`)
    
    if (!data.success) {
      throw new Error(data.error || '서비스 조회 실패')
    }
    
    return data.data!
  }
}

export const reservationsApi = {
  // 예약 요청 생성
  async createReservation(reservationData: any): Promise<any> {
    const { data } = await apiClient.post<ApiResponse>('/reservations', reservationData)
    
    if (!data.success) {
      throw new Error(data.error || '예약 요청 실패')
    }
    
    return data.data
  },

  // 예약 목록 조회 (고객용)
  async getMyReservations(params?: PaginationParams): Promise<any> {
    const { data } = await apiClient.get<ApiResponse>('/reservations/my', {
      params
    })
    
    if (!data.success) {
      throw new Error(data.error || '예약 목록 조회 실패')
    }
    
    return data.data
  }
}

export const inquiriesApi = {
  // 문의 작성
  async createInquiry(inquiryData: any): Promise<any> {
    const { data } = await apiClient.post<ApiResponse>('/inquiries', inquiryData)
    
    if (!data.success) {
      throw new Error(data.error || '문의 작성 실패')
    }
    
    return data.data
  }
}

// 에러 처리 유틸리티
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// API 에러 핸들러
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  
  if (error.response?.status === 400) {
    return '잘못된 요청입니다'
  }
  
  if (error.response?.status === 401) {
    return '로그인이 필요합니다'
  }
  
  if (error.response?.status === 403) {
    return '권한이 없습니다'
  }
  
  if (error.response?.status === 404) {
    return '요청한 데이터를 찾을 수 없습니다'
  }
  
  if (error.response?.status >= 500) {
    return '서버 오류가 발생했습니다'
  }
  
  return error.message || '알 수 없는 오류가 발생했습니다'
}