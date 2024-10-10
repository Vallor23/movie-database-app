import { fetchGenres } from "../utils/api";
import { useEffect, useState } from "react";

const Genre = ({setSelectedGenres,type}) => {
    const[genres, setGenres] = useState([])//State to hold genres ID list

    useEffect(() => {
        const loadGenres = async() => {
            const genresData = await fetchGenres({type});//Fetch genre list based on 'movie' or 'tv'
            setGenres(genresData);
        }
        loadGenres()
    },[type]);

    //Handle selecting genres,updates state based on whether the checkbox is checked or unchecked
    const handleCheckboxChange = (e)=> {

        const{value,checked} = e.target;

        setSelectedGenres((prevSelectedGenres) =>{
            if(checked) {
                return [...prevSelectedGenres, value]
            } else {
                return prevSelectedGenres.filter((genre) => genre !== value)
            }
        })
    }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:p-16 lg:space-x-16">
        {/* Map through the array and create a checkbox for each item */}
        {genres && genres.map((genre)=>(
            <label key={genre.id} className="label cursor-pointer flex gap-2">
                <input 
                    type="checkbox"
                    value={genre.id}
                    onChange={handleCheckboxChange}
                    className = "checkbox checkbox-primary"
                    // className="text-blue-600 w-4 h-4  bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="label-text">{genre.name}</span>
            </label>
        ))}
    </div>
  )
}

export default Genre;