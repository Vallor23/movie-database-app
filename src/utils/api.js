import axios from "axios";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetching trending movies using the trending end point
export const fetchTrendingMovies = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Failed fetching trending movies:', error);
        throw error;
    }
}

// Fetch movies based on a search query
export const fetchMoviesBySearch = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: query,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed fetching search results:', error);
        throw error;
    } 
}

//Fetch movie details by using id to query the movie details
export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Failed fetching movie details:', error);
        throw error;
    } 
}

//Fetch tv details by using id to query the details
export const fetchTvDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Failed fetching movie details:', error);
        throw error;
    } 
}

//Fetch list of genres from the api for either movies or tv
export const fetchGenres = async ({type}) => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`);
        return response.data.genres;
    } catch (error) {
        console.error('Failed fetching genres:', error);
        throw error;
    } 
}

//Fetch movies by genres
export const fetchMoviesByGenres = async (selectedGenres,currentPage,total_pages) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`,{
            params: {
                api_key: API_KEY,
                with_genres:selectedGenres,//Pass the selected genres to the API
                page:currentPage,
                total_pages:total_pages,
                sort_by:'popularity.desc',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed fetching movies by genres:', error);
        throw error;
    } 
}
//Fetch movies by genres
export const fetchTvByGenres = async (selectedGenres,currentPage,total_pages) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/tv`,{
            params: {
                api_key: API_KEY,
                with_genres:selectedGenres,//Pass the selected genres to the API
                page:currentPage,
                total_pages:total_pages,
                sort_by:'release_date.desc',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed fetching movies by genres:', error);
        throw error;
    } 
};

export const fetchMovieTrailer = async ({movieId}) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error('Failed fetching movie trailer:', error);
        throw error;
    } 
};

export const fetchTvTrailer = async ({movieId}) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${movieId}/videos?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error('Failed fetching tv trailer:', error);
        throw error;
    } 
};



export const fetchMovieCredits = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data;
  };

export const fetchTvCredits = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/tv/${movieId}/credits?api_key=${API_KEY}`);
    return response.data;
  };
  