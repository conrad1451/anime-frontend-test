import { IoHeart, IoPersonCircle, IoStar } from "react-icons/io5";
import { useStore } from "../../store/store";
import AnimeDetailModal from "../anime/animeDetail";
import { useState } from "react";

function AnimeCard({ anime }) {
    const { user, addToFavorites, favorites } = useStore();

    const isFavorite = favorites.some((favAnime) => favAnime.id === anime.id);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleAddToFavorites = () => {
        addToFavorites(user.id, anime);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div key={anime.id} className="bg-white p-4 border rounded-md shadow-md relative">
            <img src={anime.posterImage?.large} alt={anime.slug} className="mb-4" />
            <h2 className="text-lg font-semibold mb-2">{anime.name}</h2>

            <div className="text-gray-500 flex items-center mb-2">
                <IoPersonCircle className="mr-2" /> {anime.userCount}
            </div>
            <div className="text-gray-500 flex items-center mb-2">
                <IoStar className="mr-2" /> {anime.favoritesCount}
                <button
                    className="absolute bottom-4 right-4 p-2 bg-rgb-207-61-12 text-white  rounded hover:bg-rgb-207-61-12-hover"
                    onClick={openModal}
                >
                    Show Details
                </button>

            </div>

            <IoHeart
                size={50}
                onClick={handleAddToFavorites}
                className={`absolute top-4 right-4 cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-500"
                    }`}
            />

            {/* Modal for anime details */}
            <AnimeDetailModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                anime={anime} />
        </div>
    );
}

export default AnimeCard;
