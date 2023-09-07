import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import AnimeCard from "./animeCard";
import Pagination from "../pagination";
import LoadMoreButton from "../buttons/loadMore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AnimeList() {
	const { extractedAnimeData, fetchAnimeData, loadMoreAnime, animeChunkCurrentCount, animeChunkCount } = useStore();
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	// filter anime based on the search term
	const filteredData = extractedAnimeData.filter((anime) =>
		anime.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		fetchAnimeData();
	}, [fetchAnimeData]);

	const handleLoadMore = () => {
		const toastId = toast.loading('Loading...');
		loadMoreAnime(animeChunkCurrentCount, animeChunkCount);
		toast.dismiss(toastId)
	};
	return (
		<>
			<div className="flex items-center gap-1 border border-[#D0D5DD] py-2 px-3.5 md:w-3/5 lg:w-1/2 xl:w-1/4 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg">
				<input
					type="text"
					placeholder={"Search for category"}
					value={searchTerm}
					onChange={handleSearch}
					className="border-none outline-none flex-1 px-1.5"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
				{currentItems.map((anime) => (
					<AnimeCard key={anime.id} anime={anime} />
				))}
			</div>
			{/* Load More button */}
			<LoadMoreButton onClick={handleLoadMore} />
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={filteredData.length}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</>
	);
}

export default AnimeList;