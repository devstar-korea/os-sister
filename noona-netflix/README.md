# NOONA NETFLIX - 영화 정보 웹사이트

Netflix 스타일의 영화 정보 웹사이트입니다. TMDB API를 사용하여 현재 상영중인 영화, 인기 영화, 최고 평점 영화를 보여줍니다.

## 🚀 시작하기

### 1. API Key 설정

1. [TMDB 웹사이트](https://www.themoviedb.org/)에서 회원가입
2. [API 설정 페이지](https://www.themoviedb.org/settings/api)에서 API Key 발급
3. `config.js` 파일을 열고 `YOUR_API_KEY_HERE`를 본인의 API Key로 교체

```javascript
const CONFIG = {
    API_KEY: '여기에_본인의_API_KEY_입력',
    // ...
};
```

### 2. 실행

`index.html` 파일을 브라우저에서 열기

## 📁 파일 구조

```
noona-netflix/
├── index.html      # 메인 HTML
├── styles.css      # 스타일시트
├── app.js          # 메인 JavaScript
├── config.js       # API 설정 (API Key 입력 필요)
├── .gitignore      # Git 제외 파일
└── README.md       # 설명서
```

## ✨ 기능

- 🎬 현재 상영중인 영화
- 🔥 인기 영화
- ⭐ 최고 평점 영화
- 🖼️ 영화 포스터 및 상세 정보
- 📱 반응형 디자인
- 🎨 Netflix 스타일 UI

## 🛠️ 기술 스택

- HTML5
- CSS3 (Grid, Flexbox)
- Vanilla JavaScript
- TMDB API
- Pretendard 폰트

## ⚠️ 주의사항

**중요:** `config.js` 파일은 Git에 커밋하지 마세요! (`.gitignore`에 포함됨)
API Key는 개인정보이므로 공개하지 않도록 주의하세요.

## 📝 라이선스

MIT License
