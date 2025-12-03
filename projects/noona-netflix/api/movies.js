// Vercel Serverless Function - TMDB API Proxy
// 환경 변수 TMDB_API_KEY를 사용하여 API 키를 안전하게 숨김

export default async function handler(req, res) {
    // CORS 허용
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { category } = req.query;
    const API_KEY = process.env.TMDB_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    }

    // 카테고리별 엔드포인트 매핑
    const endpoints = {
        now_playing: 'movie/now_playing',
        popular: 'movie/popular',
        top_rated: 'movie/top_rated'
    };

    const endpoint = endpoints[category];
    if (!endpoint) {
        return res.status(400).json({ error: '유효하지 않은 카테고리입니다.' });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=ko-KR&region=KR`
        );

        if (!response.ok) {
            throw new Error(`TMDB API 오류: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API 요청 실패:', error);
        res.status(500).json({ error: '영화 데이터를 가져오는데 실패했습니다.' });
    }
}
