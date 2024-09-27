import { useEffect, useState } from "react";

import {fetchTrendingMovies} from "../utils/api";
import Searchbar from "../components/Searchbar";

import { FaHeart } from "react-icons/fa";

const Home = () => {
    const [trendingMovies,setTrendingMovies] = useState([]); // State to store trending movies data
    const [error,setError] = useState(null);// State to store any errors during the API call
    const [loading,setLoading] = useState('true');// State to handle loading indicator

    console.log(trendingMovies)//debug

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



    if(loading) return <div>Loading trending movies</div>// Show loading indicator while data is being fetched
    if(error) return <div>{error}</div>// Display error message if API call fails
    
    // Render the trending movies once the data is successfully fetched
  return (
    <div className="bg-almostBlack  font-roboto">
        <Searchbar loading={loading}/>
        <div className="mt-4 ">
            <h2 className="text:xl md:text-2xl font-semibold text-brightAmber mb-4">Trending Movies</h2>

            {trendingMovies.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 px-4">
                    {trendingMovies.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 bg-darkCharcoal rounded-lg flex-nowrap shadow-lg transition-transform transform hover:scale-105">
                            <div className="relative">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title || movie.name} className="w-full h-64 object-cover"/>
                                <button aria-label="Add to favorites" className="absolute top-2 right-2 text-brightAmber p-1 bg-darkCharcoal rounded-full hover:bg-gray-600 transition">
                                    <FaHeart />
                                </button>
                            </div>
                            <div className="p-2">
                                <h3 className="text-sm font-semibold text-white">{movie.title || movie.name}</h3>
                                <p className="text-xs text-lightGray">{String(movie.release_date || movie.first_air_date).split('-')[0]}</p>
                            </div>
                        </div>
                    ))}
                </div>) : (
                <p className="text-center text-lightGray">No trending movies available.</p>
            )}
        </div>
    </div>
  )
}

export default Home;