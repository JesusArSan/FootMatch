import config from "../../config";

// Create a new match
export const createMatch = async (matchData, setMatchId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(matchData),
		});

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error creating match: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		// Set the match ID
		setMatchId(data.matchId);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Cancel a match
export const cancelMatch = async (matchId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/cancel`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ matchId }), // Send the matchId in the request body
		});

		if (!response.ok) {
			throw new Error(`Error canceling match: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return the response data
	} catch (error) {
		console.error("Error:", error);
		throw error; // Re-throw the error to be handled in the component
	}
};

// Get matches for a user
export const getUserMatches = async (userId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error getting matches: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return the response data
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
