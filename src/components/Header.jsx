import { FaVideo } from "react-icons/fa";
// Header section
const Header = () => {
  return (
    <div className='flex w-auto gap-2 items-center justify-center p-4 bg-darkCharcoal'>
        <FaVideo className='bg-brightAmber w-8 h-6'/>
        <p className='text-2xl text-lightGray uppercase font-bold'>movie mania</p>
    </div>
  )
}

export default Header