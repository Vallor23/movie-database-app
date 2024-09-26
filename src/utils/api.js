import axios from "axios";

const fetchMovies = async ({query}) => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                query: query,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Movies:', error);
        throw error;
    } 
}

export default fetchMovies;