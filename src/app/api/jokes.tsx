import axios from "axios";
import * as c from "../utils/constants";

export const fetchJokes = async () => {

	const response = await axios
		.get(c.JOKE_ENDPOINT)
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
export const fetchRandomJoke = async () => {
    const response = await axios
    .get(c.JOKE_RANDOM_ENDPOINT)
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