import config from "../../config";

// Utility to format date to YYYY-MM-DD
const formatDate = (date) => {
	const dateObj = date instanceof Date ? date : new Date(date); // Ensure date is a Date object
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};
// Create a new competition
export const createCompetition = async (competitionData) => {
	// Format start and end dates before sending
	const formattedData = {
		...competitionData,
		start_date: formatDate(competitionData.start_date),
		end_date: formatDate(competitionData.end_date),
	};

	try {
		const response = await fetch(`${config.serverUrl}/competitions/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formattedData),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error("Error response from server:", data.message);
			throw new Error(data.message || "Failed to create competition.");
		}

		console.log("Competition created successfully:", data);
		return data;
	} catch (error) {
		console.error("Error creating competition:", error);
		throw error;
	}
};

// Obtener competición por ID (con equipos)
export const getCompetitionById = async (id) => {
	try {
		const response = await fetch(`${config.serverUrl}/competitions/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (response.status === 500) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error getting competition by ID:", error);
		throw error;
	}
};

// Actualizar competición
export const updateCompetition = async (competitionId, updatedData) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedData),
			}
		);
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error updating competition:", error);
		throw error;
	}
};

// Eliminar competición
export const deleteCompetition = async (competitionId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error deleting competition:", error);
		throw error;
	}
};

// Add a team to a competition
export const addTeamToCompetition = async (teamId, competitionId) => {
	console.log("Adding team to competition:", teamId, competitionId);
	try {
		const response = await fetch(`${config.serverUrl}/competitions/team`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				team_id: teamId,
				competition_id: competitionId,
			}),
		});

		const data = await response.json();

		// Handle backend messages for known cases
		if (!response.ok) throw new Error("Error adding team to competition.");

		// Return response data on success
		return data;
	} catch (error) {
		// Handle unexpected errors
		console.error("Error adding team to competition:", error);
		alert("An unexpected error occurred.");
		throw error;
	}
};

// Eliminar equipo de la competición
export const removeTeamFromCompetition = async (competitionId, teamId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}/team/${teamId}`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (!response.ok) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error removing team from competition:", error);
		throw error;
	}
};

// Realizar sorteo y reservar slots de partidos
export const generateMatchesAndReserve = async (competitionId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}/draw_and_reserve`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (response.status === 500) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error generating matches and reservations:", error);
		throw error;
	}
};

// Borrar todos los partidos de una competición
export const deleteCompetitionMatches = async (competitionId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}/matches`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (response.status === 500) throw new Error(data.message);
		return data;
	} catch (error) {
		console.error("Error deleting competition matches:", error);
		throw error;
	}
};

// Function to fetch teams in a competition
export const loadTeamsInCompetition = async (competitionId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competitionId}/teams`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 500) {
			throw new Error(`Error getting teams: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data.teams; // Return the list of teams
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Get Competitions by User, sorted by created_at in descending order (newest first)
export const getCompetitionsByUser = async (userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/user/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 500) {
			throw new Error(`Error retrieving competitions: ${response.status}`);
		}

		const data = await response.json();

		// Check if data is an array before sorting
		const sortedData = Array.isArray(data)
			? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
			: [];

		return sortedData; // Return the sorted list or an empty array if no data
	} catch (error) {
		console.error("Error retrieving competitions by user:", error);
		throw error;
	}
};

// Get all competitions, sorted by created_at in descending order (newest first)
export const loadCompetitions = async () => {
	try {
		const response = await fetch(`${config.serverUrl}/competitions`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 500) {
			throw new Error("Error retrieving all competitions.");
		}

		const data = await response.json();

		// Check if data is an array before sorting
		const sortedData = Array.isArray(data)
			? data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
			: [];

		return sortedData; // Return the sorted list or an empty array if no data
	} catch (error) {
		console.error("Error retrieving competitions:", error);
		throw error;
	}
};

// Get all custom teams not in a specific competition, sorted alphabetically
export const loadAllCustomTeamsAvailable = async (competition_id) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${competition_id}/teams_custom_not_in`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch custom teams: ${response.statusText}`
			);
		}

		const data = await response.json();
		const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); // Sort teams alphabetically by name
		console.log("Fetched and sorted custom teams:", sortedData);
		return sortedData;
	} catch (error) {
		console.error("Error fetching custom teams:", error);
		throw error;
	}
};

// Get matches from competition
export const getCompetitionMatches = async (id) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/competitions/${id}/matches`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 500) {
			throw new Error("Error fetching competition matches");
		}
		const data = await response.json();
		return data.matches; // Devuelve solo la lista de partidos
	} catch (error) {
		console.error("Error retrieving matches:", error);
		throw error;
	}
};
