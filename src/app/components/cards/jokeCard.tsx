import { useStore } from "../../store/store";
import trash from "../../../assets/svg/trash-2.svg"

function JokeCard({ joke, flippedCardId, toggleCard }) {
    const { deleteJoke } = useStore();

    const handleDeleteClick = (id) => {
        deleteJoke(id);

        // check if the deleted joke was the currently flipped one
        if (flippedCardId === id) {
            toggleCard(null);
        }
    };

    return (
        <div className="flip-card lg:col-span-1 md:col-span-3 sm:col-span-2" key={joke.id}>
            <div
                className={`flip-card-inner flex flex-col justify-center items-center lg:col-span-4 md:col-span-3 sm:col-span-3 p-4 bg-rgb-255-205-153 transform transition-transform duration-500 ${flippedCardId === joke.id ? 'rotate-y-180' : ''
                    }`}
                onClick={() => toggleCard(joke.id)}
            >

                <div className={`flex flex-col h-full justify-center text-center flip-card-front transition-opacity duration-300 ${flippedCardId === joke.id ? 'opacity-0' : 'opacity-100'}`}>
                    <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(joke.id);
                        }}
                    >
                        <img src={trash} alt="Delete" />
                    </div>
                    <h2 className="text-xl font-semibold m-2 p-4">{joke.setup}</h2>
                </div>
                <div className={`flex flex-col h-full justify-center text-center flip-card-back transition-opacity duration-300 ${flippedCardId === joke.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="mt-2">{joke.punchline}</p>
                </div>
            </div>
        </div>
    );
}

export default JokeCard;