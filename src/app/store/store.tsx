import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { fetchJokes as fetchJokesApi } from '../api/jokes';
import { fetchAddToFavorites, fetchAnime as fetchAnimeApi, fetchAnimeExtra } from '../api/anime';
import { fetchUserData, fetchUsers, getToken } from '../api/auth';

type anime = {
    id: string,
    titles: string,
    name: string,
    slug: string,
    synopsis: string,
    description: string,
    averageRating: string,
    userCount: string,
    favoritesCount: string,
    ageRating: string,
    status: string,
    posterImage: string,
    coverImage: string,
    episodeCount: string,
    episodeLength: string,
    showType: string
};

const store = (set: any) => ({
    //Jokes
    jokes: [],

    // Anime
    anime: [],
    favorites: [],
    extractedAnimeData: [],
    animeLoadMoreLinks: {},
    animeCount: 0,
    animeChunkCount: 10,
    animeChunkCurrentCount: 10,

    // Auth
    user: {},
    accessToken: "",
    refreshToken: "",

    // authenticate
    // CHQ: This is where the frontend app communicates with the backend API to see if the credentials
    // entered correspond to an actual user in the database 
    signIn: async (email: string, username: string, password : string) => {
        try {
            const data = await getToken(email, password);
            console.log("data response from store:", data)
            set({ accessToken: data.access_token, refreshToken: data.refresh_token});
            console.log("authStore store:", data)

            if (data) {
                const userData = await fetchUsers(data.access_token, data.refresh_token, username);
                const extractedData = {
                    avatar: userData.data[0].attributes.avatar,
                    email: userData.data[0].attributes.email,
                    name: userData.data[0].attributes.name,
                    id: userData.data[0].id,
                };
                set({ user: extractedData});
            }
            return true
        } catch (error) {
            console.log(error)
        }
        return false;
    },

    signOut: async () => {
        set({ accessToken: "", refreshToken: "", user: {}});
    },

    fetchRefreshToken: async () => {

    },

    fetchUserData: async (id: string) => {
        try {
            const data = await fetchUserData(id)
            if (data) {
                set((prevState) => ({ favorites: [...prevState.favorites, data.favorites]}));
            }
            console.log("fetchUserData saved in store:", data)
        } catch (error) {
            console.error(error);
        }
    },

    // Fetch Jokes
    fetchJokes: async () => {
        try {
            const data = await fetchJokesApi()
            console.log("data response from store:", data)
            set((prevState) => ({ jokes: [...prevState.jokes, ...data] }));
            console.log("fetchJokes store:")
        } catch (error) {
            console.error(error);
        }
    },
    deleteJoke: (id: string) =>
        set((store: { jokes: any[]; }) => ({
            jokes: store.jokes.filter((favorite: { id: string }) => favorite.id !== id)
        })
    ),

    // add to Favorites
    addToFavorites: async (id: string, anime: anime) => {

        try {
            const data = await fetchAddToFavorites(id, anime)
            console.log("data response from store:", data)
            set((state) => {
                // check if the anime ID is already in favorites
                const isFavorite = state.favorites.some((favAnime) => favAnime.id === anime.id);
    
                if (isFavorite) {
                    const updatedFavorites = state.favorites.filter((favAnime) => favAnime.id !== anime.id);
    
                    return {
                        favorites: updatedFavorites,
                    };
                } else {
                    return {
                        favorites: [...state.favorites, anime],
                    };
                }
            });
            console.log("fetchAddToFavorites store:")
        } catch (error) {
            console.error(error);
        }
    },

    deleteFavorite: (anime: anime) =>
        set((store: { favorites: anime[]; }) => ({
            favorites: store.favorites.filter((favorite: anime) => favorite.id !== anime.id)
    })),

    // Fetch Anime
    fetchAnimeData: async () => {
        try {
            const data = await fetchAnimeApi()
            const extractedData = extractAnimeInfo(data);

            console.log("data response from fetch:", extractedData)
            set({ anime: data.data, extractedAnimeData: extractedData, animeCount: data.meta.count});
            console.log("fetchAnimeApi saved in store:")
        } catch (error) {
            console.error(error);
        }
    },

    loadMoreAnime: async (currentCount, chunk) => {

        try {
            const data = await fetchAnimeExtra(chunk, currentCount)

            if (data) {
                const extractedData = extractAnimeInfo(data);
                set((prevState) => ({ 
                    animeChunkCurrentCount: prevState.animeChunkCurrentCount + chunk,
                    extractedAnimeData: [...prevState.extractedAnimeData, ...extractedData],
                    anime: [...prevState.anime, ...data.data],
                    animeCount: data.meta.count
                }));
            }
            console.log("data response from fetch:", data)
          
        } catch (error) {
            console.error(error);
        }
    }
})

const log = (config: any) => (set: any, get: any, api: any) => config(
    (...args: any) => {
        console.log(args);
        set(...args);
    },
    get,
    api
)

export const useStore = create(
    subscribeWithSelector(log(persist(devtools(store), { name: 'store' })))
);

useStore.subscribe(
    (store => store.favorites),
    () => {
        useStore.setState({})
    }
)

const extractAnimeInfo = (data: any) =>{
    return data.data.map((anime) => ({
        id: anime.id,
        titles: anime.attributes.titles,
        name: anime.attributes.canonicalTitle,
        slug: anime.attributes.slug,
        synopsis: anime.attributes.synopsis,
        description: anime.attributes.description,
        averageRating: anime.attributes.averageRating,
        userCount: anime.attributes.userCount,
        favoritesCount: anime.attributes.favoritesCount,
        ageRating: anime.attributes.ageRating,
        status: anime.attributes.status,
        posterImage: anime.attributes.posterImage,
        coverImage: anime.attributes.coverImage,
        episodeCount: anime.attributes.episodeCount,
        episodeLength: anime.attributes.episodeLength,
        showType: anime.attributes.showType,
    }));
}
