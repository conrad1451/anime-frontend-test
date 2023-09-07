import { IoHeart } from "react-icons/io5";
import Navbar from "./components/navbar";
import Headliner from "./components/headline";
import AnimeList from "./components/anime/animeList";
import FavoriteAnimeList from "./components/anime/animeFavoriteList";
import { useStore } from "./store/store";
import { useState } from "react";

const Categories = () => {
	const [showFavorites, setShowFavorites] = useState(false);
	const { favorites } = useStore();

	const toggleShowFavorites = () => {
		setShowFavorites(!showFavorites);
	};

	return (
		<section className="grid gap-12">
			<Navbar page_name={"Dashboard"} />

			<div className="px-20 grid gap-12">
				{/* Headline of Page */}
				<Headliner
					icon={<IoHeart size={20} />}
					iconText="View Favorites"
					title="Anime Categories"
					button={""}
					onClickHandler={() => toggleShowFavorites()}
					hasJoke={false}
				/>
				{/* Show Favorites */}
				{showFavorites && <FavoriteAnimeList favorites={favorites} />}
				{/* Anime List */}
				<AnimeList />
			</div>
		</section>
	);
};

export default Categories;