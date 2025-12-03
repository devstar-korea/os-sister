config.js 내용

// TMDB API Configuration
// ⚠️ 여기에 본인의 API Key를 입력하세요
const CONFIG = {
    API_KEY: 'cfd93e49082b690d3d15eedd5911a112',  // ← 여기에 API Key 입력!
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    IMAGE_SIZES: {
        poster: 'w500',
        backdrop: 'original'
    }
};

// API 엔드포인트
const API_ENDPOINTS = {
    nowPlaying: `${CONFIG.BASE_URL}/movie/now_playing?api_key=${CONFIG.API_KEY}&language=ko-KR&page=1`,
    popular: `${CONFIG.BASE_URL}/movie/popular?api_key=${CONFIG.API_KEY}&language=ko-KR&page=1`,
    topRated: `${CONFIG.BASE_URL}/movie/top_rated?api_key=${CONFIG.API_KEY}&language=ko-KR&page=1`,
};