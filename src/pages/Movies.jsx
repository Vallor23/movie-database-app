// import MovieCard from "../components/MovieCard";
import Genre from "../components/Genre";
import MovieCard from "../components/MovieCard";
import { fetchMoviesByGenres } from "../utils/api";
import { Pagination } from "../components/Pagination";

import { useEffect, useState } from "react";


const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenres,setSelectedGenres] = useState([]);//State to hold selected genres IDs
  const [currentPage, setCurrentPage] = useState(1)//State to keep track of the curremtly displayed page
  const [totalPages, setTotalPages] =useState(0);

  //Function to fetch movies when genres are selected
  useEffect(() =>{
    const loadMovies = async () => {
      const movieData = await fetchMoviesByGenres(selectedGenres,currentPage);
      setMovies(movieData.results);
      setTotalPages(movieData.total_pages)
    }
    if (selectedGenres.length > 0) {
      loadMovies();
    }
  },[selectedGenres,currentPage])
  

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 px-4">Movies</h1>
      <Genre setSelectedGenres={setSelectedGenres} type="movie"/>
      <div className="movies-list grid grid-cols-2 space-x-4 lg:p-8 md:grid-cols-3 lg:grid-cols-6">
        {movies.map((movie) => (
          <div key={movie.id} className="md:p-4">
            <MovieCard  movie={movie}/>
          </div>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
    
  )
}

export default Movies;