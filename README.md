# 소마 AI 프론트엔드 (soma-ai-frontend)

경북소프트웨어마이스터고등학교 AI 챗봇 프론트엔드

## 📋 프로젝트 소개

Next.js 기반의 학교 정보 챗봇 웹 애플리케이션입니다.
- 반응형 디자인
- 실시간 채팅 인터페이스
- RAG 기반 AI 응답
- GitHub Pages 배포 지원

## 🛠️ 기술 스택

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **UI**: React 18
- **HTTP Client**: Axios
- **Styling**: Inline Styles (CSS-in-JS)
- **Deployment**: GitHub Pages

## 📁 프로젝트 구조

```
frontend/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 채팅 페이지
├── public/                     # 정적 파일
├── .env.example               # 환경 변수 예시
├── .env.production            # 프로덕션 환경 변수
├── .eslintrc.json             # ESLint 설정
├── next.config.js             # Next.js 설정
├── package.json               # 패키지 의존성
├── tsconfig.json              # TypeScript 설정
└── README.md                  # 프로젝트 문서
```

## 🚀 설치 및 실행

### 1. 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 2. 패키지 설치

```bash
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# .env.local 파일 수정
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

개발 서버가 실행되면 http://localhost:3000 에서 접속 가능합니다.

## 📦 빌드 및 배포

### 로컬 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm run start
```

### GitHub Pages 배포

```bash
# GitHub Pages에 배포
npm run deploy
```

배포 후 다음 주소에서 접속 가능:
- https://[username].github.io/soma-ai

## 🎨 주요 기능

### 1. 실시간 채팅

- 사용자 질문 입력
- AI 응답 실시간 표시
- 출처 정보 표시
- 로딩 상태 표시

### 2. 모델 선택

- 사용 가능한 Ollama 모델 목록
- 드롭다운으로 모델 선택
- 선택한 모델로 응답 생성

### 3. 시스템 상태

- 백엔드 연결 상태
- Ollama 서비스 상태
- 학습된 문서 개수

### 4. 반응형 디자인

- 모바일 최적화
- 태블릿 지원
- 데스크톱 레이아웃

### 5. 추천 질문

- 자주 묻는 질문 카드
- 클릭으로 질문 입력
- 사용자 경험 개선

## 🔧 설정

### Next.js 설정 (next.config.js)

```javascript
const nextConfig = {
  output: 'export',              // 정적 사이트 생성
  basePath: '/soma-ai',          // GitHub Pages 경로
  images: {
    unoptimized: true,           // 이미지 최적화 비활성화
  },
  reactStrictMode: true,
}
```

### 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `NEXT_PUBLIC_API_URL` | 백엔드 API 서버 주소 | `http://localhost:8000` |

## 🎯 API 연동

### 백엔드 API 엔드포인트

```typescript
// 헬스 체크
GET /api/health

// 모델 목록
GET /api/models

// 채팅
POST /api/chat
{
  "message": "질문 내용",
  "model": "qwen2.5:3b"
}
```

### Axios 설정

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const response = await axios.post(`${API_URL}/api/chat`, {
  message: input,
  model: selectedModel
});
```

## 🎨 스타일링

### 디자인 시스템

- **Primary Color**: `#667eea` (보라색)
- **Secondary Color**: `#764ba2` (진한 보라색)
- **Background**: 그라디언트 배경
- **Card**: 흰색 배경 + 그림자

### 컴포넌트 스타일

```typescript
// 그라디언트 배경
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// 카드 스타일
background: 'rgba(255, 255, 255, 0.95)'
borderRadius: '15px'
boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
```

## 📱 반응형 디자인

### 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 반응형 그리드

```typescript
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
```

## 🐛 트러블슈팅

### 백엔드 연결 실패

```bash
# .env.local 파일 확인
NEXT_PUBLIC_API_URL=http://localhost:8000

# 백엔드 서버 실행 확인
curl http://localhost:8000/api/health
```

### 빌드 오류

```bash
# 캐시 삭제
rm -rf .next
rm -rf out

# 재빌드
npm run build
```

### GitHub Pages 404 오류

```bash
# basePath 설정 확인 (next.config.js)
basePath: '/soma-ai'

# 저장소 이름과 일치해야 함
```

## 🔐 보안

### CORS 설정

백엔드에서 CORS 설정 필요:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://[username].github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 환경 변수

- `.env.local`은 Git에 커밋하지 않음
- `.env.example`만 커밋
- 민감한 정보는 환경 변수로 관리

## 📊 성능 최적화

### 정적 사이트 생성

```bash
# 빌드 시 정적 HTML 생성
npm run build
```

### 이미지 최적화

```javascript
// next.config.js
images: {
  unoptimized: true,  // GitHub Pages용
}
```

### 코드 스플리팅

- Next.js 자동 코드 스플리팅
- 페이지별 번들 분리
- 동적 import 지원

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📞 문의

- 프로젝트: [soma-ai](https://github.com/happy4416/soma-ai)
- 백엔드: [soma-ai-backend](https://github.com/happy4416/soma-ai-backend)
- 배포 사이트: [GitHub Pages](https://happy4416.github.io/soma-ai)

## 🔗 관련 링크

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/)
- [경북소프트웨어마이스터고](https://gbsw.hs.kr)

## 📝 개발 가이드

### 새로운 페이지 추가

```typescript
// app/about/page.tsx
export default function About() {
  return <div>About Page</div>
}
```

### API 호출 추가

```typescript
const fetchData = async () => {
  const response = await axios.get(`${API_URL}/api/endpoint`);
  return response.data;
}
```

### 스타일 수정

```typescript
// 인라인 스타일 사용
<div style={{ color: '#667eea', fontSize: '16px' }}>
  Content
</div>
```

## 🎓 학습 자료

- [Next.js 튜토리얼](https://nextjs.org/learn)
- [React 튜토리얼](https://react.dev/learn)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/handbook/intro.html)
