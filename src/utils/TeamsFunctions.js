import config from "../../config";
import { getFriendsList } from "./UserFunctions";

// Create a new team
export const createTeam = async (teamData, setTeamId) => {
	try {
		// Step 1: Create the team
		const response = await fetch(`${config.serverUrl}/teams`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(teamData),
		});

		if (!response.ok) {
			throw new Error(`Error creating team: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		// Set the created team ID
		const teamId = data.teamId;
		setTeamId(teamId);

		// Step 2: Add creator as a member of the new team
		const addUserResponse = await fetch(
			`${config.serverUrl}/teams/${teamId}/add_user/${teamData.created_by_user_id}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!addUserResponse.ok) {
			throw new Error(
				`Error adding creator as a member: ${addUserResponse.status}`
			);
		}

		const addUserData = await addUserResponse.json();

		if (addUserData.error) {
			throw new Error(`Server error: ${addUserData.error}`);
		}
	} catch (error) {
		alert(`${error.message} ${error.name}`);
	}
};

// Update an existing team
export const updateTeam = async (teamId, updatedData) => {
	try {
		const response = await fetch(`${config.serverUrl}/teams/${teamId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			throw new Error(`Error updating team: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data;
	} catch (error) {
		console.error("Error updating team:", error);
		throw error;
	}
};

// Delete a team
export const deleteTeam = async (teamId) => {
	try {
		const response = await fetch(`${config.serverUrl}/teams/${teamId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error deleting team: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error deleting team:", error);
		throw error;
	}
};

// Add a user to a team
export const addUserToTeam = async (teamId, userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/teams/${teamId}/add_user/${userId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error adding user to team: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error adding user to team:", error);
		throw error;
	}
};

// Remove a user from a team
export const removeUserFromTeam = async (teamId, userId) => {
	try {
		console.log("teamId", teamId);
		const response = await fetch(
			`${config.serverUrl}/teams/${teamId}/remove_user/${userId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error removing user from team: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error removing user from team:", error);
		throw error;
	}
};

// Get teams created by a user
export const getCreatedTeamsByUser = async (userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/teams/user/${userId}/created`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error getting teams created by user: ${response.status}`
			);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error getting teams created by user:", error);
		throw error;
	}
};

// Get teams a user belongs to
export const getTeamsByUser = async (userId) => {
	try {
		const response = await fetch(`${config.serverUrl}/teams/user/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error getting teams for user: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error getting teams for user:", error);
		throw error;
	}
};

// Get users in a team
export const getTeamUsers = async (teamId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/teams/${teamId}/users`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error getting team users: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return the list of users in the team
	} catch (error) {
		console.error("Error:", error);
		throw error; // Re-throw the error for handling in the component
	}
};

// Función para obtener la lista de amigos que no están en un equipo específico
export const getFriendsNotInTeam = async (userId, teamId) => {
	try {
		// Fetch the user's friends list
		const friendsResponse = await fetch(
			`${config.serverUrl}/users/friends/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!friendsResponse.ok) {
			throw new Error(`Error getting friends: ${friendsResponse.status}`);
		}

		const friends = await friendsResponse.json();

		// Fetch the list of users in the team
		const teamUsersResponse = await fetch(
			`${config.serverUrl}/teams/${teamId}/users`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!teamUsersResponse.ok) {
			throw new Error(
				`Error getting team users: ${teamUsersResponse.status}`
			);
		}

		const teamUsers = await teamUsersResponse.json();

		// Filter friends who are not in the team
		const friendsNotInTeam = friends.filter(
			(friend) => !teamUsers.some((teamUser) => teamUser.id === friend.id)
		);

		return friendsNotInTeam;
	} catch (error) {
		console.error("Error fetching friends not in team:", error);
		throw error;
	}
};
