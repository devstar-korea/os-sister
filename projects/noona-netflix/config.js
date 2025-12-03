// TMDB API Configuration (Serverless Function)
// API 키는 Vercel 환경 변수에서 안전하게 관리됩니다

// 배포 환경에서는 Vercel Serverless Function 사용, 로컬에서는 직접 API 호출
const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const CONFIG = {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p'
};

const API_ENDPOINTS = IS_PRODUCTION ? {
    // 프로덕션: Vercel Serverless Function 사용 (API 키 숨김)
    nowPlaying: '/api/movies?category=now_playing',
    popular: '/api/movies?category=popular',
    topRated: '/api/movies?category=top_rated'
} : {
    // 로컬 개발: 직접 API 호출
    nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=cfd93e49082b690d3d15eedd5911a112&language=ko-KR&region=KR',
    popular: 'https://api.themoviedb.org/3/movie/popular?api_key=cfd93e49082b690d3d15eedd5911a112&language=ko-KR&region=KR',
    topRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=cfd93e49082b690d3d15eedd5911a112&language=ko-KR&region=KR'
};
