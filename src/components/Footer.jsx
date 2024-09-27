import { FaHome, FaSearch, FaTv, FaHeart, MdLocalMovies} from "react-icons/fa";


const Footer = () => {
     // Data array containing the icons and names for the footer items
    const data = [
        { icon: <FaHome />, name: "Home" },
        { icon: <FaHeart />, name: "Favs" },
        { icon: <MdLocalMovies />, name: "Movies" },
        { icon: <FaTv />, name: "Shows" },
        { icon: <FaSearch />, name: "Search" },
    ];
    // Footer container with a fixed position at the bottom, and a grid layout of 5 columns
    return ( 
        <div className="grid grid-cols-5 bg-darkCharcoal py-4  fixed bottom-0 w-full footer md:hidden">
            {data.map((item, index) => (
                <button key={index} className="flex flex-col justify-center items-center gap-1 text-sm  footer-item" aria-label={item.name} >
                    <div className="text-xl text-brightAmber hover:text-brightAmberHover">{item.icon}</div>
                    <span className="text-lightGray">{item.name}</span>
                </button>
            ))}
        </div>
    );
};

export default Footer;