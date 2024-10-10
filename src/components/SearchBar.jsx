import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Searchbar = ({onSearch,loading,className}) => {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`)//Redirect to search page with query
        }
        if (onSearch) {
            onSearch(query);// Call the parent component's onSearch function, passing the current query
            setQuery('');
        }  
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className={`flex gap-2 justify-center mx-auto px-4 sm:px-0 ${className}`}
    >
        <input 
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="p-2 flex-grow rounded-md bg-darkCharcoal/75 text-white w-full focus:outline-none focus:ring-2 focus:ring-brightAmber transition-colors sm:w-9/12 md:8/12 lg:w-6/12 xl:w-5/12c placeholder:text-white"
            aria-label="Search for a movie..."// To improve accessibility for screen readers
            required
        />
        <button
            type="submit" 
            className="px-4 py-2 rounded-md bg-brightAmber text-darkCharcoal transition hover:bg-brightAmberHover active:bg-brightAmberDark flex items-center justify-center"
            aria-label="Search"
            disabled={loading}  // Disable button when loading
        >
         <FaSearch />
        </button>
    </form>
  )
}

export default Searchbar;