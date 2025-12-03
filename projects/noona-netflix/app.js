// DOM Elements
const hero = document.getElementById('hero');
const heroTitle = document.querySelector('.hero-title');
const heroOverview = document.querySelector('.hero-overview');
const nowPlayingGrid = document.getElementById('nowPlaying');
const popularGrid = document.getElementById('popular');
const topRatedGrid = document.getElementById('topRated');
const modal = document.getElementById('movieModal');
const modalClose = document.querySelector('.modal-close');
const loading = document.getElementById('loading');
const navbar = document.querySelector('.navbar');

// Show/Hide Loading
function showLoading() {
    loading.classList.add('active');
}

function hideLoading() {
    loading.classList.remove('active');
}

// Fetch Movies
async function fetchMovies(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('API 요청 실패');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('영화 데이터 로드 실패:', error);
        alert('영화 데이터를 불러오는데 실패했습니다. API 키를 확인해주세요.');
        return [];
    }
}

// Get Image URL
function getImageUrl(path, size = 'w500') {
    if (!path) return 'https://via.placeholder.com/500x750/2F2F2F/FFFFFF?text=No+Image';
    return `${CONFIG.IMAGE_BASE_URL}/${size}${path}`;
}

// Create Movie Card
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => showMovieDetail(movie);

    card.innerHTML = `
        <img
            class="movie-poster"
            src="${getImageUrl(movie.poster_path)}"
            alt="${movie.title}"
            loading="lazy"
        >
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
                <span>${movie.release_date?.split('-')[0] || 'N/A'}</span>
            </div>
        </div>
    `;

    return card;
}

// Render Movies
function renderMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

// Set Hero Section
function setHeroMovie(movie) {
    if (!movie) return;

    hero.style.backgroundImage = `url(${getImageUrl(movie.backdrop_path, 'original')})`;
    heroTitle.textContent = movie.title;
    heroOverview.textContent = movie.overview || '줄거리 정보가 없습니다.';
}

// Show Movie Detail Modal
function showMovieDetail(movie) {
    document.getElementById('modalPoster').src = getImageUrl(movie.poster_path);
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalRating').textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
    document.getElementById('modalDate').textContent = movie.release_date || 'N/A';
    document.getElementById('modalOverview').textContent = movie.overview || '줄거리 정보가 없습니다.';

    modal.classList.add('active');
}

// Close Modal
modalClose.onclick = () => {
    modal.classList.remove('active');
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
};

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize App
async function init() {
    showLoading();

    try {
        // Fetch all movie categories
        const [nowPlaying, popular, topRated] = await Promise.all([
            fetchMovies(API_ENDPOINTS.nowPlaying),
            fetchMovies(API_ENDPOINTS.popular),
            fetchMovies(API_ENDPOINTS.topRated)
        ]);

        // Set hero with first now playing movie
        if (nowPlaying.length > 0) {
            setHeroMovie(nowPlaying[0]);
        }

        // Render movie grids
        renderMovies(nowPlaying, nowPlayingGrid);
        renderMovies(popular, popularGrid);
        renderMovies(topRated, topRatedGrid);

    } catch (error) {
        console.error('초기화 실패:', error);
    } finally {
        hideLoading();
    }
}

// Start the app
init();
