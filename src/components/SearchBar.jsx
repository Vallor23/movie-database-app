import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Searchbar = ({onSearch,loading}) => {
    const [query,setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);// Call the parent component's onSearch function, passing the current query
        setQuery('');
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex gap-2 justify-center mx-auto px-4 sm:px-0"
    >
        <input 
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="mt-2 p-2 rounded-md bg-darkCharcoal text-white w-full focus:outline-none focus:ring-2 focus:ring-brightAmber transition-colors sm:w-9/12 md:8/12 lg:w-6/12 xl:w-5/12"
            aria-label="Search for a movie..."//To improve accessibility for screen readers
            required
        />
        <button 
            type="submit" 
            className="bg-brightAmber mt-2 px-4 py-2  rounded-md transition hover:bg-brightAmberHover active:bg-brightAmberDark sm:px-3 sm:py-2"
            aria-label="Search"
        >
            {/* <FaSearch /> */}
            {loading ? <ImSpinner2 /> : <FaSearch />}{/* conditionally show spinner or icon */}
        </button>
    </form>
  )
}

export default Searchbar;