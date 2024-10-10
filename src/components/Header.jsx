import ThemeToggle from "./ThemeToggle";
import NavBar from './NavBar';

import { FaVideo } from "react-icons/fa";
// Header section
const Header = () => {
  return (
      <div className='flex items-center justify-between p-4  relatve bg-customColor'>
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <FaVideo className='fill-brightAmber w-8 h-6 md:w-10 md:h-8'/>
          <p className='text-2xl lg:text-3xl text-lightGray uppercase font-bold'>movie mania</p>
        </div>
        <div className="absolute top-6 right-1 md:top-4 md:right-4">
          <ThemeToggle />
        </div>
      </div>
  )
}

export default Header;