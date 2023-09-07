export const API_BASE_URL = `http://localhost:8002/api/`
export const GET_TOKEN_ENDPOINT = API_BASE_URL + "oauth/token"
export const REFRESH_TOKEN_ENDPOINT = API_BASE_URL + "oauth/token"
export const ADD_TO_FAVORITES = API_BASE_URL + "user/favorites"
export const JOKE_ENDPOINT = "https://official-joke-api.appspot.com/jokes/ten" // jokes/ten
export const JOKE_RANDOM_ENDPOINT = "https://official-joke-api.appspot.com/jokes/random" // jokes/random
export const ANIME_ENDPOINT = API_BASE_URL + "edge/anime" // anime
export const USERS_ENDPOINT = API_BASE_URL + "edge/users" //users
export const USERS_DATA_ENDPOINT = API_BASE_URL + "user" //users
export const LOGOUT_ENDPOINT = API_BASE_URL + "logout" //logout

// GET TOKEN
export const AUTH_GRANT_TYPE = "password"
export const AUTH_CLIENT_ID = "dd031b32d2f56c990b1425efe6c42ad847e7fe3ab46bf1299f05ecd856bdb7dd"
export const AUTH_CLIENT_SECRET =  "54d7307928f63414defd96399fc31ba847961ceaecef3a5fd93144e960c0e151"
export const AUTH_CONTENT_TYPE = "application/x-www-form-urlencoded"
export const AUTH_AUTHORIZATION= "Bearer WreyBTs0w1D-qmcawVQzgC6tFD9aGn0sHaf-CscJOYg"

export const AUTH_CUSTOM_HEADERS = {
    "CLIENT_ID": AUTH_CLIENT_ID,
    "CLIENT_SECRET": AUTH_CLIENT_SECRET,
    "Content-Type": AUTH_CONTENT_TYPE,
    "Authorization": AUTH_AUTHORIZATION,
};