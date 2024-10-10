import { useState, useEffect } from "react";
import { fetchMovieTrailer, fetchTvTrailer } from "../utils/api";
import ReactPlayer from "react-player";

const MovieTrailer = (movieId) => {
  const {pathname} = window.location;//Using pathname to determine media type

  const [trailerKey, setTrailerKey] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const loadTrailer = async () => {
      try {
        let videos;
        //Using URL to determine the mediaType
        if (pathname.includes('/movie/')) {
          videos = await fetchMovieTrailer(movieId); // Fetch movie trailers
        } else {
          videos = await fetchTvTrailer(movieId);
        }

        //Find Trailer
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
              setTrailerKey(trailer.key); // Set YouTube trailer key
            }

      } catch (error) {
          setError(error)
      }
    };
    loadTrailer();
  }, [movieId, pathname]);

  const handlePlay = () => {
    setPlaying(true)
  }

  if(error) <div>{error}</div>

  return (
    <div  className="relative w-full h-64 mt-4 " style={{ paddingBottom: '56.25%' }}>
        {trailerKey?(
          playing ? (
            <ReactPlayer 
                url={`https://www.youtube.com/embed/${trailerKey}`}
                playing={playing}
                controls
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
            />) :(
              <button
                onClick={handlePlay}
                className="btn btn-primary"
            >
              Play Trailer
            </button>
            )
        ) :(
            <div className="text-lightGray">No trailer available</div>
        )
        }
    </div>
  )
}

export default MovieTrailer