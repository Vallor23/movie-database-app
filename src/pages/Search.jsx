import { useEffect, useState } from "react";
import { fetchMoviesBySearch } from "../utils/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');//Extracts the search term from the URL

  useEffect(() => {
    if(query) {
      fetchSearchResults(query)
    }
  },[query]);

  const fetchSearchResults = async (query) => {
    setLoading(true)

    try {
        const response = await fetchMoviesBySearch (query);
        setSearchResults(response.results);
        
    } catch (error) {
        setError('Error fetching search results:',error)
    } finally {
      setLoading(false)
    }
      
  };

  if (error) <div>{error}</div>
  if (loading) <div>Loading search...</div>

  return (
    <div>
      <div>
        <SearchBar 
          className="w-full sm:w-9/12 md:w-8/12 lg:w-6/12 mt-6 mb-2 rounded-md shadow-md"
          onSearch={fetchSearchResults} />
      </div> 
      <div>
        {searchResults.length > 0 ? (
              <div className="mt-4">
                  <h2 className="text-2xl px-4 md:px-8 mb-4">Search Results:</h2>
                  <ul className="grid grid-cols-2 gap-2 p-4 md:grid-cols-3 lg:grid-cols-5 md:p-8">
                      {searchResults.map((movie) => (
                          <MovieCard key={movie.id} movie={movie}/>
                      ))}
                  </ul>
              </div>
          ) : (
              <div>No results found.</div> // Show this if no results
          )}
      </div>
    </div>
  )
}

export default Search