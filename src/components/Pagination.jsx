
export const Pagination = ({currentPage,totalPages, onPageChange}) => {
    
    const handlePrevious = () => {
        if ( currentPage > 1) {//Only go back if you are not on page one
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {//Only go foward if you are not on the last page
            onPageChange(currentPage + 1);
        }
    };
    
  return (
    <div className="pagination flex justify-center items-center gap-2">
        <button 
            className="bg-brightAmber px-3 py-2 hover:bg-brightAmberHover disabled:bg-gray-400" 
            onClick={handlePrevious}
            disabled={currentPage === 1}
        >
            Prev
        </button>
            <span className="text-lightGray">Page {currentPage} of {totalPages}</span>  
        <button 
            className="bg-brightAmber px-3 py-2 hover:bg-brightAmberHover active:bg-brightAmberDark" 
            onClick={handleNext}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
  )
}
