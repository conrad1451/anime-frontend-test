import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store/store";
import { IoHappy } from "react-icons/io5";
import Pagination from "./components/pagination";
import Navbar from "./components/navbar";
import JokeCard from "./components/cards/jokeCard";
import Headliner from "./components/headline";

const Dashboard = () => {

	// get jokes from store
	const { jokes, fetchJokes , fetchUserData, user} = useStore() ;

	// create state to keep track of the card that is flipped
	const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

	// stores the current page and the number of jokes to be displayed per page
	const [currentPage, setCurrentPage] = useState(1);
	const jokesPerPage = 4;
	const [currentJokes, setCurrentJokes] = useState([]);

	// calculate the index range for the current page
	const indexOfLastJoke = currentPage * jokesPerPage;
	const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;

	useEffect(() => {
		console.log(user)
		fetchUserData(user.id)
	}, []);

	// Update currentJokes whenever jokes or currentPage changes
	useEffect(() => {
		// Slice the jokes array to get the current page's jokes
		const newCurrentJokes = jokes.slice(indexOfFirstJoke, indexOfLastJoke);
		setCurrentJokes(newCurrentJokes);
	}, [jokes, currentPage, indexOfFirstJoke, indexOfLastJoke]);

	// reload jokes when page loads
	useEffect(() => {
		if (jokes.length === 0) {
			fetchJokes();
		}
	}, [fetchJokes]);

	// Function to toggle the card's flip state
	const toggleCard = (id: number) => {
		if (flippedCardId === id) {
			// Close the card if it's already open
			setFlippedCardId(null);
		} else {
			// Open the clicked card
			setFlippedCardId(id);
		}
	};

	// set the current page number for the pagination
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleFetchJokes = () => {
		const toastId = toast.loading('Loading...');
		fetchJokes()
		toast.dismiss(toastId)
	}

	return (
		<section className="grid gap-12">
			<Navbar page_name={"Dashboard"} />

			<div className="px-20 pb-8 grid gap-12">
				{/* Headline of Page */}
				<Headliner
					icon={<IoHappy size={20} />}
					iconText=" Make me Laugh !"
					title="Welcome to Anime Stash"
					button={""}
					onClickHandler={handleFetchJokes}
					hasJoke={true}
				/>

				{/* joke card section */}
				<div className="flex flex-col justify-center items-center">
					<div className="grid grid-cols-2  lg:grid-cols-5 md:grid-cols-4 sm:col-span-1 gap-6">
						{jokes.length === 0 ? (
							<p>Loading jokes...</p>
						) : (
							currentJokes.map((joke) => (
								<JokeCard
									key={joke.id}
									joke={joke}
									flippedCardId={flippedCardId}
									toggleCard={toggleCard}
								/>
							))
						)}
					</div>
				</div>
				<Pagination
					itemsPerPage={jokesPerPage}
					totalItems={jokes.length}
					currentPage={currentPage}
					onPageChange={paginate}
				/>

			</div>
		</section>
	);
};

export default Dashboard;