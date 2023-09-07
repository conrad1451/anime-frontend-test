function FavoriteAnimeList({ favorites }) {
    return (
        <div className="bg-white p-4 border rounded-md shadow-md ">
            <h2 className="text-2xl font-semibold mb-4">Favorite Anime</h2>
            <ul>
                {favorites.map((anime) => (
                    <li key={anime.id} className="mb-2">
                        <div className="bg-orange-100 p-2 rounded-md">
                            <h3 className="text-lg font">{anime.name}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteAnimeList;