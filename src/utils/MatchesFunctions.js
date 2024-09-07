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
		const response = await fetch(
			`${config.serverUrl}/matches/user/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

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

// Get match details by id
export const getMatchDetails = async (matchId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/${matchId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Check if the response is OK
		if (!response.ok) {
			throw new Error(`Error getting match details: ${response.status}`);
		}

		// Check if there is content in the response body
		const text = await response.text(); // Read the response body as text first

		// If the body is empty, handle it gracefully
		if (!text) {
			throw new Error("Empty response body from the server.");
		}

		// Attempt to parse the JSON from the response text
		const data = JSON.parse(text);

		// Handle potential server errors in the data
		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		// Return the parsed data
		return data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
