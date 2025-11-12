# 네이버/구글 검색 색인 가이드

## 📋 현재 설정된 SEO 항목

### ✅ 완료된 항목
1. **robots.txt** - 검색 엔진 크롤러 설정 완료
2. **sitemap.xml** - 사이트맵 자동 생성 완료
3. **메타 태그** - 기본 SEO 메타 태그 설정 완료
4. **구조화된 데이터** - Schema.org JSON-LD 설정 완료
5. **Open Graph** - 소셜 미디어 공유 최적화 완료

## 🔧 추가 설정 필요 항목

### 1. 네이버 서치어드바이저 등록

1. **네이버 서치어드바이저 접속**
   - https://searchadvisor.naver.com/ 접속
   - 네이버 계정으로 로그인

2. **사이트 등록**
   - "웹마스터 도구" → "사이트 추가"
   - 사이트 URL 입력: `https://quickslot.co.kr`
   - 사이트 소유 확인 방법 선택

3. **사이트 소유 확인**
   - HTML 태그 방식 선택
   - 발급받은 인증 코드를 환경 변수에 추가:
     ```env
     NEXT_PUBLIC_NAVER_VERIFICATION=발급받은_인증코드
     ```

4. **사이트맵 제출**
   - "요청" → "사이트맵 제출"
   - 사이트맵 URL: `https://quickslot.co.kr/sitemap.xml`

### 2. 구글 서치 콘솔 등록

1. **구글 서치 콘솔 접속**
   - https://search.google.com/search-console 접속
   - 구글 계정으로 로그인

2. **속성 추가**
   - "속성 추가" → "URL 접두어" 선택
   - 사이트 URL 입력: `https://quickslot.co.kr`

3. **소유권 확인**
   - HTML 태그 방식 선택
   - 발급받은 인증 코드를 환경 변수에 추가:
     ```env
     NEXT_PUBLIC_GOOGLE_VERIFICATION=발급받은_인증코드
     ```

4. **사이트맵 제출**
   - "색인 생성" → "Sitemaps"
   - 사이트맵 URL 입력: `https://quickslot.co.kr/sitemap.xml`

### 3. 환경 변수 설정

`.env.local` 파일에 다음 변수를 추가하세요:

```env
# 네이버 서치어드바이저 인증 코드
NEXT_PUBLIC_NAVER_VERIFICATION=your_naver_verification_code

# 구글 서치 콘솔 인증 코드
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
```

Vercel 배포 시에도 환경 변수를 추가해야 합니다:
- Vercel 대시보드 → 프로젝트 설정 → Environment Variables

## 📊 색인 확인 방법

### 네이버
1. 네이버 검색: `site:quickslot.co.kr`
2. 네이버 서치어드바이저 → "수집 현황"에서 확인

### 구글
1. 구글 검색: `site:quickslot.co.kr`
2. 구글 서치 콘솔 → "색인 생성" → "페이지"에서 확인

## 🚀 색인 속도 향상 팁

1. **정기적인 콘텐츠 업데이트**
   - 블로그, 뉴스 등 정기적인 콘텐츠 추가
   - 사이트맵이 자동으로 업데이트됨

2. **내부 링크 최적화**
   - 중요한 페이지로의 내부 링크 강화
   - 사이트 구조 명확화

3. **모바일 최적화**
   - 반응형 디자인 확인
   - 모바일 페이지 속도 최적화

4. **페이지 속도 최적화**
   - 이미지 최적화
   - 코드 분할 및 지연 로딩

5. **소셜 미디어 공유**
   - SNS를 통한 트래픽 유입
   - 검색 엔진이 사이트를 더 자주 크롤링

## 📝 추가 권장 사항

1. **구글 애널리틱스 연동**
   - 사이트 방문자 분석
   - 검색 쿼리 분석

2. **네이버 웹마스터 도구 연동**
   - 네이버 검색 트래픽 분석
   - 키워드 노출 현황 확인

3. **정기적인 모니터링**
   - 주 1회 색인 현황 확인
   - 오류 페이지 모니터링

## ⚠️ 주의사항

- 인증 코드는 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있어야 합니다
- Vercel 배포 후 환경 변수를 반드시 설정하세요

