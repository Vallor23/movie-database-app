import { useEffect, useState } from "react";

import {fetchTrendingMovies} from "../utils/api";
import MovieCard from "../components/MovieCard";

const Trending = () => {
    const [trendingMovies,setTrendingMovies] = useState([]); // State to store trending movies data
    const [error,setError] = useState(null);// State to store any errors during the API call
    const [loading,setLoading] = useState('true');// State to handle loading indicator

    useEffect(() => {
        const loadTrendingMovies = async () => {
            try {
                const movies = await fetchTrendingMovies();// Fetch trending movies using the API function
                setTrendingMovies(movies.results); // Store fetched data in state
            } catch (error) {
                setError(error);// Handle any error during the API call
            }finally {
                setLoading(false);
            }
        }
        loadTrendingMovies();// Trigger the data fetch when component mounts
    },[]);

    if(loading) return <div className="">Loading trending movies</div>// Show loading indicator while data is being fetched
    if(error) return <div>{error}</div>// Display error message if API call fails
    
    // Render the trending movies once the data is successfully fetched
    return (
        <section className="trending-section mt-4 ">
            <h2 className="text:xl md:text-2xl font-semibold mb-4 px-4">Trending Movies</h2>

            {trendingMovies.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 px-4 flex-nowrap">
                    {trendingMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>) : (
                <p className="text-center">No trending movies available.</p>
            )}
        </section>
      )
    };

    export default Trending;