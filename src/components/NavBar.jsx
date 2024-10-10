import { NavLink } from "react-router-dom";

import { FaHome, FaSearch, FaTv, FaHeart} from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useState, useEffect } from "react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (isOpen && !event.target.closest('nav')) {
            setIsOpen(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen]);

  const data = [
    { icon: <FaHome />, name: "Home", link: "/" },
    { icon: <FaHeart />, name: "Favourites", link: "/favourites" },
    { icon: <MdLocalMovies />, name: "Movies", link: "/movies" },
    { icon: <FaTv />, name: "TvShows", link: "/tv" },
    { icon: <FaSearch />, name: "Search", link: "/search" },
];

return (
    <nav className="relative">
        <button
            onClick={toggleMenu}
            className="flex items-center p-2 text-gray-500 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
        >
            {/* Hamburger Icon */}
            <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
        <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-md  bg-customColor z-20">
            {isOpen && data.map((item, index) => (
                <NavLink to={`${item.link}`} key={index}>
                    <button className="flex justify-center items-center gap-1 text-sm  p-6 navbar-item" aria-label={item.name}>
                        <div className="text-xl text-btnColor ">{item.icon}</div>
                        <span className="text-lightGray hover:text-white">{item.name}</span>
                    </button>
                </NavLink>
            ))}
        </div>
    </nav>
);
};

export default NavBar

