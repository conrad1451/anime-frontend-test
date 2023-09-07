function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
    const pageNumbers : Array<number> = [];
    
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex flex-row justify-end">
            {pageNumbers.map((number) => (
            <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`px-3 py-2 mx-1 ${currentPage === number ? 'bg-rgb-255-205-153 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
            >
                 {number}
            </button>
            ))}
        </div>
    );
}
export default Pagination;