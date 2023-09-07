import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const customStyles = {
    content: {
        width: "600px",
        height: "350px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        overflow: "scroll",
    },
};

function AnimeDetailModal({ isOpen, closeModal, anime }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Anime Details"
        >
            <button
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                onClick={closeModal}
            >
                <IoClose size={20} />
            </button>

            <div className="bg-white p-4 border rounded-md shadow-md">
                <img
                    src={anime.posterImage?.large || "placeholder-image-url"}
                    alt={anime.slug}
                    className="mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{anime.name}</h2>
                <p className="text-gray-500">Synopsis: {anime.synopsis}</p>
            </div>
        </Modal>
    );
}

export default AnimeDetailModal;
