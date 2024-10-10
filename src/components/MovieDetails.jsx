import { useParams } from "react-router-dom";

import {fetchMovieDetails, fetchTvDetails} from '../utils/api';
import MovieTrailer from "./MovieTrailer";
import MovieCredits from "./MovieCredits";
import { useEffect, useState } from "react";
import { FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';


const MovieDetails = () => {
    const {id} = useParams();
    const { pathname } = window.location;//Using pathname to determine mediaType

    const [movieDetails,setMovieDetails] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    
    useEffect(()=>{
        const loadMovieDetails = async () => {
        setLoading(true);
            try {
                //Using routing system/URL to determine media type
                if (pathname.includes("/tv/")) {
                    const tvData = await fetchTvDetails(id);
                    setMovieDetails(tvData);
                } else {
                    const movieData = await fetchMovieDetails(id);//Fetch detailed movie data using movieId
                    setMovieDetails(movieData);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to load movie details. Please try again later.'); 
            }finally {
                setLoading(false);
            }
        }

        loadMovieDetails();
    },[id,pathname])//Load movie data when id changes

    if (loading) return <div className=""><span className="loading loading-spinner loading-sm"></span></div>;
    if(error) return <div>{error}</div>

    // Confirming if there are movie details before render
    if(!movieDetails) return <div>No movie data available</div>

  return (
    <div className="flex flex-col items-center max-h- overflow-y-scroll">
        <div className="bg-center bg-cover w-full " style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})` }}>
            <div className="bg-black bg-opacity-75 lg:flex lg:gap-8 lg:py-8 lg:px-10">
                <img className="w-full lg:w-1/3" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title || movieDetails.name} />
                <div className=" max-w-4xl p-4">
                    <div className="z-10">
                        <h2 className="text-2xl font-semibold text-brightAmber mb-4 text-center md:text-left">{movieDetails.title || movieDetails.name}</h2>
                        <h3 className="italic text-white mb-4">{movieDetails.tagline}</h3>
                        <div className="flex flex-wrap justify-center mt-4">
                            {movieDetails.genres.map((genre) => (
                                <button key={genre.id} className="btn btn-outline btn-primary btn-sm m-1">
                                {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
                        <div className="flex items-center text-white text-sm mb-2 md:text-base md:mb-0">
                            <FaCalendarAlt className="mr-2" />
                            <span>{movieDetails.release_date || movieDetails.first_air_date}</span>
                        </div>
                        <div className="flex items-center text-white text-sm mb-2">
                            <FaStar className="mr-2 text-brightAmber" />
                            <span>Rating: {movieDetails.vote_average}/10</span>
                        </div>
                        <div className="flex items-center text-white text-sm mb-2">
                            <FaClock className="mr-2" />
                            <span>{movieDetails.runtime} min</span>
                        </div>
                    </div>
                    <p className="text-lightGray text-sm md:text-base">
                        <span className="font-semibold text-white">Plot:</span> {movieDetails.overview}
                    </p>
                    <div className=" ">
                        <MovieTrailer movieId={id}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full p-2 md:py-4 md:px-5 lg:py-8 lg:px-10 ">
            <MovieCredits movieId={id} />
        </div>
    </div>
  )
};

export default MovieDetails;