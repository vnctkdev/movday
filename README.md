# MovDay - 영화 이벤트 통합 플랫폼

MovDay는 CGV, 롯데시네마, 메가박스 등 주요 영화관의 이벤트 정보를 한 곳에서 확인할 수 있는 통합 플랫폼입니다.

## 🎬 주요 기능

- **이벤트 통합 검색**: 여러 영화관의 이벤트를 한 번에 검색
- **필터링**: 유형, 장르, 출처별 필터링
- **관리자 페이지**: 이벤트 추가, 수정, 삭제 기능
- **실시간 크롤링**: Python 크롤러를 통한 자동 데이터 수집
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 🚀 기술 스택

### Frontend
- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Lucide React** - 아이콘

### Backend
- **Next.js API Routes** - 서버리스 API
- **Python** - 웹 크롤링
- **BeautifulSoup** - HTML 파싱
- **Pandas** - 데이터 처리

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/vnctkdev/movday.git
cd movday
```

### 2. 의존성 설치
```bash
npm install
```

### 3. Python 가상환경 설정 (크롤러용)
```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate  # Windows

pip install requests beautifulsoup4 pandas
```

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 크롤러 실행 (데이터 수집)
```bash
cd scripts
python crawler.py
```

## 📁 프로젝트 구조

```
movday/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 페이지
│   │   ├── events/
│   │   │   └── page.tsx      # 이벤트 목록 페이지
│   │   ├── admin/
│   │   │   └── page.tsx      # 관리자 페이지
│   │   └── api/
│   │       └── events/
│   │           └── route.ts  # 이벤트 API
│   └── globals.css
├── scripts/
│   └── crawler.py            # 웹 크롤러
├── public/
│   └── data/
│       ├── events.json       # 이벤트 데이터
│       └── events.csv        # CSV 형식 데이터
└── package.json
```

## 🔧 API 엔드포인트

### GET /api/events
이벤트 목록을 조회합니다.

**쿼리 파라미터:**
- `search`: 검색어
- `type`: 이벤트 유형
- `genre`: 장르
- `source`: 출처
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10)

**응답 예시:**
```json
{
  "events": [...],
  "total": 15,
  "page": 1,
  "totalPages": 2,
  "hasNext": true,
  "hasPrev": false
}
```

### POST /api/events
새 이벤트를 추가합니다.

**요청 본문:**
```json
{
  "title": "이벤트 제목",
  "description": "이벤트 설명",
  "date": "2024-12-25",
  "location": "위치",
  "type": "시사회",
  "genre": "액션",
  "source": "CGV",
  "image": "이미지 URL",
  "link": "링크 URL"
}
```

## 🎯 페이지별 기능

### 메인 페이지 (/)
- 랜딩 페이지
- 서비스 소개
- 주요 통계

### 이벤트 페이지 (/events)
- 이벤트 목록 표시
- 검색 및 필터링
- 페이지네이션
- 반응형 그리드 레이아웃

### 관리자 페이지 (/admin)
- 이벤트 추가/수정/삭제
- 테이블 형태의 이벤트 관리
- 모달을 통한 편집 기능

## 🕷️ 크롤러 기능

`scripts/crawler.py`는 다음 영화관의 이벤트를 자동으로 수집합니다:

- **CGV**: 시사회, 굿즈배포, 프로모션 이벤트
- **롯데시네마**: 다양한 영화 관련 이벤트
- **메가박스**: 독립영화 페스티벌, 특별 상영회

### 크롤러 실행
```bash
cd scripts
python crawler.py
```

## 🚀 배포

### Vercel 배포
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 설정

### 환경 변수
프로덕션 환경에서 필요한 환경 변수:
- `NODE_ENV=production`

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/vnctkdev/movday](https://github.com/vnctkdev/movday)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 훌륭한 React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Lucide](https://lucide.dev/) - 아름다운 아이콘 라이브러리
