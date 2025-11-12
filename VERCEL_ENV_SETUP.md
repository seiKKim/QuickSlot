# Vercel 환경 변수 설정 가이드

## 네이버 서치어드바이저 인증 코드 설정

### 1. Vercel 대시보드 접속
1. https://vercel.com 접속
2. 프로젝트 선택 (QuickSlot)

### 2. 환경 변수 추가
1. **Settings** → **Environment Variables** 클릭
2. **Add New** 버튼 클릭
3. 다음 정보 입력:
   - **Name:** `NEXT_PUBLIC_NAVER_VERIFICATION`
   - **Value:** `f04bc9f156ecaca62be8301ec2a8aa7bcde51e14`
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. **Save** 클릭

### 3. 재배포
환경 변수를 추가한 후:
1. **Deployments** 탭으로 이동
2. 최신 배포의 **"..."** 메뉴 클릭
3. **Redeploy** 선택
4. 또는 새로운 커밋을 푸시하여 자동 재배포

### 4. 메타 태그 확인
배포 완료 후 다음 URL에서 메타 태그 확인:
- `https://quickslot.co.kr` (또는 배포된 도메인)
- 페이지 소스 보기 (Ctrl+U 또는 Cmd+Option+U)
- `<head>` 섹션에서 다음 태그 확인:
  ```html
  <meta name="naver-site-verification" content="f04bc9f156ecaca62be8301ec2a8aa7bcde51e14" />
  ```

### 5. 네이버 서치어드바이저에서 확인
1. 네이버 서치어드바이저 → 사이트 설정
2. "소유 확인" 버튼 클릭
3. 인증 완료 확인

## 문제 해결

### 메타 태그를 찾을 수 없는 경우

1. **환경 변수 확인**
   - Vercel 대시보드에서 환경 변수가 제대로 설정되었는지 확인
   - 변수 이름이 정확한지 확인: `NEXT_PUBLIC_NAVER_VERIFICATION`

2. **재배포 확인**
   - 환경 변수 추가 후 반드시 재배포 필요
   - 배포 로그에서 환경 변수가 로드되었는지 확인

3. **사이트 접근 확인**
   - 배포된 사이트가 정상적으로 접근 가능한지 확인
   - 네이버 검색 로봇이 사이트에 접근할 수 있는지 확인

4. **메타 태그 확인**
   - 브라우저에서 페이지 소스 보기
   - `<head>` 섹션에 메타 태그가 있는지 확인
   - 환경 변수가 빈 문자열이 아닌지 확인

5. **robots.txt 확인**
   - `https://quickslot.co.kr/robots.txt` 접근 가능한지 확인
   - 네이버 봇(Yeti, NaverBot)이 허용되어 있는지 확인

## 추가 환경 변수 (구글 서치 콘솔)

구글 서치 콘솔 인증 코드를 받은 후:
- **Name:** `NEXT_PUBLIC_GOOGLE_VERIFICATION`
- **Value:** (구글에서 발급받은 코드)
- **Environment:** Production, Preview, Development

