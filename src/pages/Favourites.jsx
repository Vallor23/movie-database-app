import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { fetchMovieDetails, fetchTvDetails } from "../utils/api"

function Favourites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  //Fetch favorites from local storage when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')

    if(savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      // Fetch movie details using saved ids from local storage
      const fetchFavoriteMovies = async () => {
        const movieDetails = await Promise.all(
        favoriteIds.map(async(id) => {
          try {
            const movies = await fetchMovieDetails(id);
            return movies;
          }  catch (movieError) {
            try {
              const tv = await fetchTvDetails(id); // Try fetching TV details if movie fails
              return tv;
            } catch (tvError) {
              console.error('Failed to fetch both movie and TV details:', { movieError, tvError });
              return null; // Return null if both fail
            }
          }
        })
      )
      setFavoriteMovies(movieDetails)
      }
      fetchFavoriteMovies()
    }
    },[])
  
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl mb-4 font-bold">Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No favorite movies found.</p>
            )}
      </div>
    </div>
  )
}

export default Favourites