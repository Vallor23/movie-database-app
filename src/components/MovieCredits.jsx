import { fetchMovieCredits, fetchTvCredits } from "../utils/api"

import { useEffect, useState } from 'react';

const MovieCredits = ({movieId}) => {
  const {pathname} = window.location;

    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState('');
  
    useEffect(() => {
        const loadMovieCredits = async () => {
          let credits;

          //Using URL to determine the mediaType
          if (pathname.includes('/movie/')) {
            credits = await fetchMovieCredits(movieId);
          } else {
            credits = await fetchTvCredits(movieId);
          }
          setCast(credits.cast.slice(0, 6)); // Display top 5 cast members
          
          // Find the director from the crew list
          const director = credits.crew.find(member => member.job === 'Director');
          if (director) {
            setDirector(director.name);
          }
        };
    
        loadMovieCredits();
      }, [movieId, pathname]);

      return (
        <div className="movie-credits">
          <h2 className="text-xl font-bold mb-2">Cast</h2>
          <ul className="cast-list flex flex-row gap-4  mb-4 overflow-x-auto lg:w-8/12 ">
            {cast.map((actor,index) => (
              <li key={index} className=" rounded-lg flex flex-col w-32 flex-shrink-0  overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                {actor.profile_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                        alt={actor.name}
                        className=" h-32 w-full rounded"
                    />
                )}
                <div>
                    <p className=" font-semibold text-center truncate">{actor.name}</p>
                    <p className="text-sm text-center">{actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
    
          {director && (
            <div className="director">
              <h2 className="text-xl font-bold mb-2">Director</h2>
              <p className="">{director}</p>
            </div>
          )}
        </div>
      );
}

export default MovieCredits