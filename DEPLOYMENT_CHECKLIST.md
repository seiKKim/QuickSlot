# Vercel 배포 및 검색 엔진 등록 체크리스트

## ✅ 현재 완료된 SEO 설정

현재 프로젝트에는 다음 SEO 설정이 완료되어 있습니다:

1. ✅ **robots.txt** - 검색 엔진 크롤링 허용
2. ✅ **sitemap.xml** - 자동 생성되는 사이트맵
3. ✅ **메타 태그** - 제목, 설명, 키워드 설정
4. ✅ **구조화된 데이터** - Schema.org JSON-LD
5. ✅ **Open Graph 태그** - 소셜 미디어 공유용

---

## 🚀 Vercel 배포 후 필수 작업

### **1단계: Vercel 배포**

#### 1.1 GitHub에 프로젝트 푸시
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 1.2 Vercel에 프로젝트 연결
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. GitHub 레포지토리 선택
5. Framework: **Next.js** (자동 감지)
6. "Deploy" 클릭

#### 1.3 배포 완료 확인
- 배포된 사이트 URL 확인: `https://your-project.vercel.app`
- 또는 커스텀 도메인 설정

---

### **2단계: 실제 도메인 URL로 업데이트** ⚠️ 필수!

배포된 실제 도메인으로 모든 URL을 변경해야 합니다.

#### 2.1 `src/app/layout.tsx` 수정
```tsx
metadataBase: new URL('https://your-actual-domain.com'), // 실제 도메인으로 변경
url: 'https://your-actual-domain.com', // 실제 도메인으로 변경
```

그리고 인증 코드를 나중에 추가할 수 있도록 준비:
```tsx
verification: {
  google: 'your-google-verification-code', // 나중에 추가
  other: {
    'naver-site-verification': 'your-naver-verification-code', // 나중에 추가
  },
},
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

#### 2.5 변경사항 커밋 및 재배포
```bash
git add .
git commit -m "Update domain URLs for production"
git push
```
Vercel이 자동으로 재배포합니다.

---

### **3단계: 구글 서치 콘솔 등록** 🔍

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
2. 제공된 메타 태그에서 인증 코드 복사
   - 예: `<meta name="google-site-verification" content="AbCdEfGhIjKlMnOpQrStUvWxYz1234567890" />`
   - 여기서 `AbCdEfGhIjKlMnOpQrStUvWxYz1234567890` 부분만 복사

#### 3.4 `src/app/layout.tsx`에 인증 코드 추가
```tsx
verification: {
  google: 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890', // 복사한 코드 입력
},
```

#### 3.5 변경사항 커밋 및 재배포
```bash
git add .
git commit -m "Add Google Search Console verification"
git push
```

#### 3.6 소유권 확인
- Vercel 재배포 완료 후 (1-2분 대기)
- 구글 서치 콘솔에서 "확인" 클릭

#### 3.7 사이트맵 제출
1. 좌측 메뉴 → **색인 생성** → **Sitemaps**
2. 새 사이트맵 추가:
   ```
   https://your-actual-domain.com/sitemap.xml
   ```
3. "제출" 클릭

#### 3.8 URL 검사 (선택사항)
1. 좌측 메뉴 → **URL 검사**
2. 주요 페이지 URL 입력
3. "색인 생성 요청" 클릭

---

### **4단계: 네이버 서치어드바이저 등록** 🔍

#### 4.1 네이버 서치어드바이저 접속
- https://searchadvisor.naver.com/ 접속
- 네이버 계정으로 로그인

#### 4.2 사이트 등록
1. **웹마스터 도구** → **사이트 등록**
2. 사이트 URL 입력: `https://your-actual-domain.com`
3. 사이트 유형: **일반 웹사이트**
4. "등록" 클릭

#### 4.3 소유권 확인
1. **HTML 태그** 방식 선택
2. 제공된 메타 태그에서 인증 코드 복사
   - 예: `<meta name="naver-site-verification" content="abc123def456" />`
   - 여기서 `abc123def456` 부분만 복사

#### 4.4 `src/app/layout.tsx`에 인증 코드 추가
```tsx
verification: {
  google: 'your-google-code', // 이미 추가됨
  other: {
    'naver-site-verification': 'abc123def456', // 복사한 코드 입력
  },
},
```

#### 4.5 변경사항 커밋 및 재배포
```bash
git add .
git commit -m "Add Naver Search Advisor verification"
git push
```

#### 4.6 소유권 확인
- Vercel 재배포 완료 후 (1-2분 대기)
- 네이버 서치어드바이저에서 "확인" 클릭

#### 4.7 사이트맵 제출
1. **웹마스터 도구** → **요청** → **사이트맵 제출**
2. 사이트맵 URL 입력:
   ```
   https://your-actual-domain.com/sitemap.xml
   ```
3. "확인" 클릭하여 유효성 검사
4. "제출" 클릭

---

## ⏱️ 검색 엔진 색인 시간

### 구글
- **초기 색인**: 2-7일 소요
- **검색 결과 노출**: 1-2주 후
- **새 페이지**: 1-3일

### 네이버
- **초기 색인**: 1-2주 소요
- **검색 결과 노출**: 2-4주 후
- **새 페이지**: 3-7일

**⚠️ 참고**: 검색 엔진 최적화는 시간이 걸립니다. 즉시 노출되지는 않으며, 최소 1-2주 정도 기다려야 합니다.

---

## ✅ 배포 후 즉시 확인할 항목

### 1. 기본 페이지 접근 확인
- [ ] 메인 페이지 로드: `https://your-domain.com`
- [ ] robots.txt 접근: `https://your-domain.com/robots.txt`
- [ ] sitemap.xml 접근: `https://your-domain.com/sitemap.xml`

### 2. 메타 태그 확인
1. 브라우저에서 페이지 소스 보기 (Ctrl+U 또는 Cmd+Option+U)
2. 다음 태그들이 있는지 확인:
   - `<title>...</title>`
   - `<meta name="description" ...>`
   - `<meta property="og:title" ...>`
   - Schema.org JSON-LD (`<script type="application/ld+json">`)

### 3. 모바일 친화성 확인
- 구글 서치 콘솔 → **모바일 사용성 테스트** 사용
- 또는: https://search.google.com/test/mobile-friendly

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
3. 색인이 완료되면 검색 결과에 표시됩니다.

### 네이버에서 확인
1. 네이버 검색창에서:
   ```
   site:your-actual-domain.com
   ```
2. 또는:
   ```
   "QuickSlot 예약대행"
   ```
3. 색인이 완료되면 검색 결과에 표시됩니다.

---

## 📊 검색 엔진 등록 상태 확인

### 구글 서치 콘솔
1. https://search.google.com/search-console 접속
2. 속성 선택
3. **색인 생성** → **사이트맵** 확인
4. **색인 생성** → **URL 검사**로 개별 페이지 확인

### 네이버 서치어드바이저
1. https://searchadvisor.naver.com/ 접속
2. 웹마스터 도구 선택
3. **요청** → **사이트맵 제출 현황** 확인
4. **요청** → **수집 요청**으로 개별 페이지 확인

---

## 🎯 빠른 시작 가이드

### 배포 전 체크리스트
1. ✅ 모든 코드 커밋 및 푸시
2. ✅ 환경 변수 확인 (필요시)

### 배포 직후 (즉시)
1. ✅ 사이트 정상 작동 확인
2. ✅ robots.txt 접근 확인
3. ✅ sitemap.xml 접근 확인
4. ⚠️ **도메인 URL 실제 값으로 변경**
5. ⚠️ **변경사항 재배포**

### 배포 후 1일 이내
1. ✅ 구글 서치 콘솔 등록
2. ✅ 네이버 서치어드바이저 등록
3. ✅ 인증 코드 설정
4. ✅ 사이트맵 제출

### 배포 후 1주일 이내
1. ✅ URL 검사 실행
2. ✅ 색인 상태 확인
3. ✅ 필요한 경우 추가 페이지 색인 요청

---

## ⚠️ 주의사항

### 1. 인증 코드는 반드시 실제 코드로 변경
현재 `layout.tsx`에 있는 `your-google-verification-code`와 `your-naver-verification-code`는 **플레이스홀더**입니다.
**반드시 실제 인증 코드로 변경해야 검색 엔진 등록이 가능합니다!**

### 2. 도메인 URL 일관성
모든 파일에서 도메인 URL이 **일관되게** 설정되어 있는지 확인하세요:
- `layout.tsx`의 `metadataBase`와 `url`
- `sitemap.ts`의 `baseUrl`
- `robots.txt`의 `Sitemap` URL
- `StructuredData.tsx`의 모든 URL

### 3. HTTPS 필수
검색 엔진은 HTTPS 사이트를 선호합니다. Vercel은 기본적으로 HTTPS를 제공합니다.

### 4. 검색 결과 노출은 시간이 걸립니다
- 즉시 노출되지 않음 (최소 1-2주 소요)
- 정기적인 콘텐츠 업데이트가 중요
- 인내심을 가지고 기다려야 함

---

## 💡 추가 최적화 팁

### 1. 콘텐츠 품질
- 고품질 콘텐츠 작성 (500자 이상 권장)
- 자연스러운 키워드 사용
- 사용자 질문에 답하는 콘텐츠

### 2. 페이지별 메타 태그
각 페이지에 고유한 메타 태그 추가:
- `/about/page.tsx`
- `/reviews/page.tsx`
- `/contact/page.tsx`
등

### 3. 내부 링크 구조
- 중요한 페이지는 홈에서 바로 접근 가능
- 관련 페이지로 자연스러운 링크 연결

### 4. 이미지 최적화
- Alt 텍스트 추가
- 적절한 이미지 크기
- WebP 형식 사용 (이미 설정됨)

### 5. 성능 최적화
- 페이지 로딩 속도 최적화
- Core Web Vitals 점수 개선
- 모바일 최적화 (이미 완료)

---

## 📞 문제 해결

### 사이트맵이 보이지 않는 경우
1. Vercel 재배포 확인
2. 브라우저에서 직접 접근: `https://your-domain.com/sitemap.xml`
3. Next.js 빌드 로그 확인

### 인증 코드가 작동하지 않는 경우
1. 페이지 소스 보기로 메타 태그 확인
2. 배포 후 충분한 시간 대기 (몇 분)
3. 코드 정확성 확인 (앞뒤 공백 없이)

### 검색 결과에 나타나지 않는 경우
1. **최소 1-2주 대기 필요**
2. 검색 엔진 등록 확인
3. 사이트맵 제출 확인
4. 콘텐츠 품질 확인
5. 구글 서치 콘솔의 색인 상태 확인

---

## 🎉 결론

**네, Vercel에 올리면 구글과 네이버에서 검색이 됩니다!**

다만, 다음 조건들이 충족되어야 합니다:

1. ✅ **기본 SEO 설정 완료** (이미 완료됨)
2. ⚠️ **실제 도메인 URL로 변경** (배포 후 필수)
3. ⚠️ **구글 서치 콘솔 등록** (필수)
4. ⚠️ **네이버 서치어드바이저 등록** (필수)
5. ⏱️ **검색 엔진 색인 대기** (1-2주 소요)

모든 설정을 완료하면 검색 엔진에 노출됩니다! 🚀

