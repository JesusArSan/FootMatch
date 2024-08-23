import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import config from "../../config";

// Get all centers
export const getCenters = async (setCenters) => {
	try {
		const response = await fetch(`${config.serverUrl}/centers`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error fetching centers: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		//console.log(data);
		setCenters(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Get fav Centers from user
export const getFavCenters = async (userId, setFavCenters) => {
	try {
		const response = await fetch(`${config.serverUrl}/centers/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error fetching centers: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		//console.log(data);
		setFavCenters(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Get pitch occupancy
export const getPitchOccupancy = async (pitchId, setPitchOccupancy) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/centers/pitch/${pitchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error fetching pitch occupancy: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		//console.log(data);
		setPitchOccupancy(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Set a center as favourite
export const setFavCenter = async (userId, centerId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/centers/add_fav_center`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user_id: userId, center_id: centerId }),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(
				`Error setting center as favourite: ${response.status}`
			);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		//console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Delete a center from favourite user list
export const deleteFavCenter = async (userId, centerId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/centers/del_fav_center`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user_id: userId, center_id: centerId }),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(
				`Error deleting center from favourite list: ${response.status}`
			);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		//console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};
