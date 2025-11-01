# Vercel 배포 및 검색 엔진 등록 가이드

## ✅ 현재 완료된 SEO 설정

### 1. robots.txt
- 위치: `public/robots.txt`
- 모든 검색 엔진 허용
- 사이트맵 위치 명시

### 2. sitemap.xml
- 위치: `src/app/sitemap.ts`
- Next.js App Router 방식으로 자동 생성
- 주요 페이지 포함
- 접근 URL: `https://your-domain.com/sitemap.xml`

### 3. 메타 태그
- 제목, 설명, 키워드 설정 완료
- Open Graph 태그 (페이스북, 네이버 카페 공유용)
- Twitter 카드 설정

### 4. 구조화된 데이터 (Schema.org)
- Organization 스키마 추가
- 검색 엔진이 사이트 정보를 이해하기 쉬움

---

## 🚀 Vercel 배포 후 필수 작업

### **단계 1: Vercel에 프로젝트 배포**

#### 1.1 GitHub에 프로젝트 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

#### 1.2 Vercel에 프로젝트 연결
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. GitHub 레포지토리 선택
5. 프로젝트 설정:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (기본값)
   - Build Command: 자동 감지
   - Output Directory: `.next` (자동)
6. "Deploy" 클릭

#### 1.3 환경 변수 설정 (필요 시)
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
- 필요한 환경 변수 추가

#### 1.4 도메인 설정
- Vercel 대시보드 → 프로젝트 → Settings → Domains
- Custom Domain 추가 (예: `quickslot.co.kr`)
- 또는 Vercel 제공 도메인 사용 (예: `your-project.vercel.app`)

**⚠️ 중요**: 실제 도메인 URL을 `layout.tsx`와 `sitemap.ts`에 반영해야 합니다!

---

### **단계 2: 도메인 URL 업데이트**

배포된 실제 도메인으로 변경해야 합니다:

#### 2.1 `src/app/layout.tsx` 수정
```tsx
metadataBase: new URL('https://your-actual-domain.com'), // 실제 도메인으로 변경
url: 'https://your-actual-domain.com', // 실제 도메인으로 변경
```

#### 2.2 `src/app/sitemap.ts` 수정
```tsx
const baseUrl = 'https://your-actual-domain.com' // 실제 도메인으로 변경
```

#### 2.3 `public/robots.txt` 수정
```
Sitemap: https://your-actual-domain.com/sitemap.xml // 실제 도메인으로 변경
```

#### 2.4 `src/components/seo/StructuredData.tsx` 수정 (있는 경우)
모든 URL을 실제 도메인으로 변경

---

### **단계 3: 구글 서치 콘솔 등록**

#### 3.1 구글 서치 콘솔 접속
- https://search.google.com/search-console 접속
- Google 계정으로 로그인

#### 3.2 속성 추가
1. "속성 추가" 클릭
2. **URL 접두어** 선택
3. 사이트 URL 입력: `https://your-actual-domain.com`
4. "계속" 클릭

#### 3.3 소유권 확인
1. **HTML 태그** 방식 선택
2. 제공된 메타 태그 코드 복사
   - 예: `<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxx" />`
3. `src/app/layout.tsx` 파일에서 인증 코드 업데이트:
   ```tsx
   verification: {
     google: '복사한-인증코드', // 여기에 실제 코드 입력
   },
   ```
4. 변경사항 커밋 및 푸시
5. Vercel에서 자동 재배포 대기
6. 구글 서치 콘솔에서 "확인" 클릭

#### 3.4 사이트맵 제출
1. 구글 서치 콘솔 → 좌측 메뉴 → **색인 생성** → **Sitemaps**
2. 새 사이트맵 추가:
   ```
   https://your-actual-domain.com/sitemap.xml
   ```
3. "제출" 클릭

#### 3.5 URL 검사
1. 좌측 메뉴 → **URL 검사**
2. 주요 페이지 URL 입력하여 색인 요청
3. 색인이 완료될 때까지 대기 (보통 몇 시간~며칠 소요)

---

### **단계 4: 네이버 서치어드바이저 등록**

#### 4.1 네이버 서치어드바이저 접속
- https://searchadvisor.naver.com/ 접속
- 네이버 계정으로 로그인

#### 4.2 사이트 등록
1. **웹마스터 도구** → **사이트 등록**
2. 사이트 URL 입력: `https://your-actual-domain.com`
3. 사이트 유형 선택: **일반 웹사이트**
4. "등록" 클릭

#### 4.3 소유권 확인
1. **HTML 태그** 방식 선택
2. 제공된 메타 태그 코드 복사
   - 예: `<meta name="naver-site-verification" content="xxxxxxxxxxxxxxxxxx" />`
3. `src/app/layout.tsx` 파일에서 인증 코드 업데이트:
   ```tsx
   verification: {
     other: {
       'naver-site-verification': '복사한-인증코드', // 여기에 실제 코드 입력
     },
   },
   ```
4. 변경사항 커밋 및 푸시
5. Vercel에서 자동 재배포 대기
6. 네이버 서치어드바이저에서 "확인" 클릭

#### 4.4 사이트맵 제출
1. **웹마스터 도구** → **요청** → **사이트맵 제출**
2. 사이트맵 URL 입력:
   ```
   https://your-actual-domain.com/sitemap.xml
   ```
3. "확인" 클릭하여 사이트맵 유효성 검사
4. "제출" 클릭

#### 4.5 RSS 피드 제출 (선택사항)
- 필요시 RSS 피드 생성 및 제출 가능

---

## ⏱️ 검색 엔진 색인 시간

### 구글
- **초기 색인**: 2-7일
- **업데이트**: 1-3일
- **새 페이지**: 1-3일

### 네이버
- **초기 색인**: 1-2주
- **업데이트**: 1-3일
- **새 페이지**: 3-7일

---

## ✅ 배포 후 확인 체크리스트

### 즉시 확인할 항목
- [ ] 사이트가 정상적으로 로드되는가?
- [ ] `https://your-domain.com/robots.txt` 접근 가능한가?
- [ ] `https://your-domain.com/sitemap.xml` 접근 가능한가?
- [ ] 메타 태그가 제대로 표시되는가? (페이지 소스 보기)

### 구글 서치 콘솔
- [ ] 사이트 등록 완료
- [ ] 소유권 확인 완료
- [ ] 사이트맵 제출 완료
- [ ] URL 검사 통과

### 네이버 서치어드바이저
- [ ] 사이트 등록 완료
- [ ] 소유권 확인 완료
- [ ] 사이트맵 제출 완료

---

## 🔍 검색 엔진 등록 확인 방법

### 구글에서 확인
1. 구글 검색창에서:
   ```
   site:your-actual-domain.com
   ```
2. 또는:
   ```
   "QuickSlot 예약대행"
   ```

### 네이버에서 확인
1. 네이버 검색창에서:
   ```
   site:your-actual-domain.com
   ```
2. 또는:
   ```
   "QuickSlot 예약대행"
   ```

---

## 📊 검색 엔진 최적화 팁

### 1. 콘텐츠 최적화
- 각 페이지마다 고유한 제목과 설명
- 500자 이상의 의미 있는 콘텐츠
- 자연스러운 키워드 사용

### 2. 페이지별 메타 태그
- 각 페이지에 고유한 메타 태그 추가
- 예: `/about/page.tsx`, `/reviews/page.tsx` 등

### 3. 내부 링크 구조
- 중요한 페이지는 홈에서 바로 접근 가능
- 관련 페이지로 자연스러운 링크 연결

### 4. 이미지 최적화
- Alt 텍스트 추가
- 적절한 이미지 크기 (로딩 속도 고려)

### 5. 모바일 최적화
- 반응형 디자인 (이미 구현됨)
- 모바일 친화적 사이트 확인

---

## ⚠️ 주의사항

### 1. 인증 코드는 반드시 실제 코드로 변경
현재 `your-google-verification-code`와 `your-naver-verification-code`는 플레이스홀더입니다.
**반드시 실제 인증 코드로 변경해야 합니다!**

### 2. 도메인 URL 일관성
모든 설정 파일에서 도메인 URL이 일관되게 설정되어 있는지 확인하세요.

### 3. HTTPS 필수
검색 엔진은 HTTPS 사이트를 선호합니다. Vercel은 기본적으로 HTTPS를 제공합니다.

### 4. 검색 엔진 최적화는 시간이 걸립니다
- 초기 색인: 1-2주 소요
- 검색 결과 노출: 2-4주 소요
- 인내심을 가지고 기다려야 합니다

---

## 🎯 빠른 시작 체크리스트

### Vercel 배포 전
- [ ] `layout.tsx`의 도메인 URL 확인
- [ ] `sitemap.ts`의 도메인 URL 확인
- [ ] `robots.txt`의 도메인 URL 확인
- [ ] 모든 파일 커밋 및 푸시

### Vercel 배포 후
- [ ] 사이트 정상 작동 확인
- [ ] robots.txt 접근 확인
- [ ] sitemap.xml 접근 확인
- [ ] 실제 도메인으로 URL 업데이트
- [ ] 구글 서치 콘솔 등록
- [ ] 네이버 서치어드바이저 등록
- [ ] 인증 코드 설정
- [ ] 사이트맵 제출

---

## 📞 문제 해결

### 사이트맵이 보이지 않는 경우
1. Vercel 재배포 확인
2. 브라우저에서 직접 접근: `https://your-domain.com/sitemap.xml`
3. Next.js 빌드 로그 확인

### 검색 결과에 나타나지 않는 경우
1. 검색 엔진 등록 확인 (최소 1-2주 대기)
2. 사이트맵 제출 확인
3. 콘텐츠 품질 확인
4. 구글 서치 콘솔의 색인 상태 확인

### 인증 코드가 작동하지 않는 경우
1. 메타 태그가 올바른 위치에 있는지 확인
2. 배포 후 충분한 시간 대기 (몇 분)
3. 페이지 소스 보기로 메타 태그 확인

---

**마지막 업데이트**: 2025년 1월

---

## 💡 추가 권장사항

### 성능 최적화
- 이미지 최적화 (WebP, 압축)
- 코드 분할 및 최적화
- 캐싱 전략

### 모니터링
- Google Analytics 추가 (선택사항)
- 검색 성능 추적
- 클릭률 및 노출 수 확인

### 콘텐츠 업데이트
- 정기적인 콘텐츠 업데이트
- 새로운 페이지 추가 시 사이트맵 업데이트
- SEO 친화적인 콘텐츠 작성

