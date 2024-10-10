import Genre from "../components/Genre";
import MovieCard from "../components/MovieCard";
import { fetchTvByGenres } from "../utils/api";
import { Pagination } from "../components/Pagination";

import { useState,useEffect } from "react";

const TVShows =() => {
    const [tvSeries, setTvSeries] = useState([]);
    const [selectedGenres,setSelectedGenres] = useState([]);//State to hold selected genres IDs
    const [currentPage, setCurrentPage] = useState(1)//State to keep track of the curremtly displayed page
    const [totalPages, setTotalPages] =useState(0);
      
    //Function to fetch movies when genres are selected
    useEffect(() =>{
      const loadTvSeries = async () => {
        const tvData = await fetchTvByGenres(selectedGenres);
        setTvSeries(tvData.results);
        setTotalPages(tvData.total_pages)
      }
      if (selectedGenres.length > 0) {
        loadTvSeries();
      }
    },[selectedGenres])
  
  
    return (
      <div>
        <h1 className="text-2xl font-bold mt-4 px-4 ">TV Series</h1>
        <Genre setSelectedGenres={setSelectedGenres} type="tv"/>
        <div className="movies-list grid grid-cols-2 gap-2 p-4 md:grid-cols-3 lg:grid-cols-6 md:p-8 lg:gap-4">
          {tvSeries.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </div>
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div>
      
    )
  };

export default TVShows