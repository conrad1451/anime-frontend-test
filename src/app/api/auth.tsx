import axios from "axios";
import * as c from "../utils/constants";

// GET AUTH PARAMS
const axiosConfig = {
	headers: c.AUTH_CUSTOM_HEADERS,
};

export const getToken = async (email: string, password: string) => {
	const formData = new URLSearchParams();
	formData.append('grant_type', c.AUTH_GRANT_TYPE);
	formData.append('username', email);
	formData.append('password', password);

	const response = await axios
		.post(c.GET_TOKEN_ENDPOINT
			, formData.toString(), axiosConfig)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return response.data;
};

export const fetchUsers = async (access_token: string, refresh_token: string, username: string) => {
	const config = {
		headers: {
			"Authorization": "Bearer " + access_token,
			"accessToken": access_token,
			"refreshToken": refresh_token
		}
	}
	const response = await axios
		.get(c.USERS_ENDPOINT + "/" + username, config)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
}

export const fetchUserData = async (id: string) => {
	const response = await axios
		.get(c.USERS_DATA_ENDPOINT + '/' + id)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return await response.data;
}

export const refreshToken = async (token: string) => {

	let data = JSON.stringify({
		"grant_type": "refresh_token",
		"refresh_token": token
	});

	const response = await axios
		.post(c.REFRESH_TOKEN_ENDPOINT
			, data, axiosConfig)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return response.data;
};

export const signOut = async (token: string, refresh_token : string) => {

	let data = JSON.stringify({
		"refresh_token": refresh_token,
		"access_token": token
	});

	const response = await axios
		.post(
			c.LOGOUT_ENDPOINT
			, data, axiosConfig)
		.then((response) => {
			console.log("Response:", response.data);
			return response;
		})
		.catch((error) => {
			console.error("Error:", error);
			return error;
		});

	return response.data;
};