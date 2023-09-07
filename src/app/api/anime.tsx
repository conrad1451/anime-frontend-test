import axios from "axios";
import * as c from "../utils/constants";

export const fetchAnime = async () => {

	const response = await axios
		.get(c.ANIME_ENDPOINT)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
};

export const fetchAnimeExtra = async (currentID, chunk) => {

	const response = await axios
		.get(c.ANIME_ENDPOINT + "?" + "page%5Blimit%5D=" + currentID + "&page%5Boffset%5D=" + chunk)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
};

export const fetchAddToFavorites = async(id: string, favorite: any) => {
	let favString = JSON.stringify(favorite)
	console.log(favString)
	const escapedJsonString = favString.replace(/"/g, '\"');
	console.log(escapedJsonString)
	let jsonString = JSON.stringify({
		favorites: escapedJsonString
	})
	
	// GET AUTH PARAMS
	const axiosConfig = {
		headers: {
			'Content-Type': "application/json"
		},
	};
	console.log(jsonString)
	const response = await axios
		.put(c.ADD_TO_FAVORITES + '/'+ id
			, jsonString, axiosConfig)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return response.data;

}
export const fetchAnimeSingle = async (id: string) => {

	const response = await axios
		.get(c.ANIME_ENDPOINT + "/" + id)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
};