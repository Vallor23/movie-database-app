import Searchbar from "../components/SearchBar";
import Trending from "../components/Trending";

const Home = () => {
  return (
        <div className="font-roboto">
            <div className="relative z-10 flex flex-col items-center justify-center h-96 bg-cover bg-center"  style={{ backgroundImage: `url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)`}} >
                <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 z-20">Welcome to MovieLand</h1>
                <Searchbar 
                    className="w-full mt-10 md:mt-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 md:w-8/12 lg:w-1/2  rounded-md"
                />
            </div>
            <Trending />
        </div>
    )
};

export default Home;