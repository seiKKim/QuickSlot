import { z } from 'zod'

// 후기 작성 스키마
export const createReviewSchema = z.object({
  nickname: z.string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(20, '닉네임은 20자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, '닉네임에는 특수문자를 사용할 수 없습니다'),
  
  // 방법 1: message 옵션 사용
  service: z.enum(['camping', 'concert', 'medical', 'education'], {
    message: '올바른 서비스를 선택해주세요'
  }),
  
  rating: z.number()
    .min(1, '평점을 선택해주세요')
    .max(5, '평점은 1-5점 사이여야 합니다'),
  
  title: z.string()
    .min(5, '제목은 5자 이상이어야 합니다')
    .max(50, '제목은 50자 이하여야 합니다'),
  
  content: z.string()
    .min(20, '후기 내용은 20자 이상이어야 합니다')
    .max(500, '후기 내용은 500자 이하여야 합니다'),
  
  usageDate: z.string().optional(),
  location: z.string().max(20, '지역은 20자 이하여야 합니다').optional(),
  wouldRecommend: z.boolean(),
  
  // 혜택 관련 (선택사항)
  wantsCoupon: z.boolean().optional(),
  email: z.union([
    z.string().email('올바른 이메일 형식이 아닙니다'),
    z.literal('')
  ]).optional(),
  phone: z.union([
    z.string().regex(/^[0-9-+\s()]*$/, '올바른 전화번호 형식이 아닙니다'),
    z.literal('')
  ]).optional()
})

// 서비스 조회 스키마
export const getServicesSchema = z.object({
  category: z.string().optional(),
  isActive: z.boolean().optional()
})

// 예약 요청 스키마
export const createReservationSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  phone: z.string().regex(/^[0-9-+\s()]+$/, '올바른 전화번호 형식이 아닙니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다').optional(),
  
  serviceId: z.string().cuid('올바른 서비스 ID가 아닙니다'),
  targetDate: z.string().optional(),
  targetLocation: z.string().optional(),
  notes: z.string().max(1000, '요청사항은 1000자 이하여야 합니다').optional(),
  urgency: z.enum(['low', 'normal', 'high']).default('normal')
})

// 문의 작성 스키마
export const createInquirySchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phone: z.string().regex(/^[0-9-+\s()]+$/, '올바른 전화번호 형식이 아닙니다'),
  
  service: z.string().optional(),
  subject: z.string().min(5, '제목은 5자 이상이어야 합니다'),
  message: z.string().min(20, '문의 내용은 20자 이상이어야 합니다'),
  urgency: z.enum(['normal', 'urgent']).default('normal').optional()
})

// TypeScript 타입 추출
export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type GetServicesInput = z.infer<typeof getServicesSchema>
export type CreateReservationInput = z.infer<typeof createReservationSchema>
export type CreateInquiryInput = z.infer<typeof createInquirySchema>