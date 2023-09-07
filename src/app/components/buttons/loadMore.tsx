function LoadMoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-rgb-207-61-12 text-white px-4 py-2 rounded-md hover:bg-rgb-255-205-153"
    >
      Load More
    </button>
  );
}

export default LoadMoreButton;