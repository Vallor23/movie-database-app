import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const MovieCard = ({movie})=> {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState(()=>{
        //Retrieve favourites from localStorage or start with an empty array
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites? JSON.parse(savedFavorites) : []
    })

    //Function to toggle favorites
    const toggleFavorites = () => {
        const updatedFavorites = isFavorite ?
         favorites.filter(favId => favId !== movie.id) : ( //Remove if its already favorite
            [...favorites, movie.id] //Add if its not a favorite
        )
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites))//Save to localstorage
        setIsFavorite(!isFavorite)// Toggle the isFavorite state
    }
    
    useEffect(() => {
        // Check if the current movie is in the favorites
        setIsFavorite(favorites.includes(movie.id));
      }, [favorites, movie.id]);
      

  return (
    <Link to={`/${movie.title ? 'movie' : 'tv'}/${movie.id}`} className="block w-full">
    <div className="flex-shrink-0 w-32 md:w-48 rounded-lg  shadow-lg cursor-pointer transition-transform transform hover:scale-105">
        <div className="relative">
            <img 
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                alt={movie.title || movie.name} 
                className="w-full h-64 object-cover"
            />
            <button 
                aria-label="Add to favorites" 
                className="absolute top-2 right-2  p-1  rounded-full hover:bg-gray-600 transition"
                onClick={(e)=> {
                    e.preventDefault();  // Prevent the navigation
                    e.stopPropagation(); // Stop event propagation to the Link
                    toggleFavorites()}}
            >
                <FaHeart  className={isFavorite ? 'text-red-500' : 'text-gray-800}'}/>
            </button>
        </div>
        <div className="p-2">
            <h3 className="text-sm font-semibold truncate">{movie.title || movie.name}</h3>
            <p className="text-xs">{String(movie.release_date || movie.first_air_date).split('-')[0]}</p>
        </div>
    </div>
     </Link>
  )
};

export default MovieCard;