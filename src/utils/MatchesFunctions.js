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
		alert(`${error.message} ${error.name}`);
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

// GetUserMatches by user id and status
export const getUserMatchesByStatus = async (userId, status) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/status/${userId}/${status}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error getting matches: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data;
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
		const data = await JSON.parse(text);

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

// get match participants by match id
export const getMatchParticipants = async (matchId, setParticipants) => {
	console.log("Getting participants for match:", matchId);
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/participants/${matchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error getting match participants: ${response.status}`
			);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		setParticipants(data); // Set the participants in the state
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// get match participants by match id
export const getMatchParticipantsData = async (matchId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/participants/${matchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error getting match participants: ${response.status}`
			);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return the list of participants
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Get list of matches that user is invited to join based on status
export const getUserMatchInvitations = async (userId, status) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/invitations/${userId}/${status}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error getting match invitations: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return the list of match invitations
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Send a match invitation to a friend
export const sendFriendInvitation = async (matchId, userId, senderId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/invitations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				matchId: matchId,
				userId: userId,
				senderId: senderId,
			}),
		});

		// Parse the response as JSON
		const data = await response.json();

		// Handle backend messages for known cases
		if (!response.ok) {
			if (data.message === "Invitation already exists for this user.") {
				alert("Invitation already sent to this user.");
				return data;
			}
			if (data.message === "User does not exist.") {
				alert("User does not exist.");
				return data;
			}
			if (data.message === "Match does not exist.") {
				alert("Match does not exist.");
				return data;
			}
			if (data.message === "User is already a participant in the match.") {
				alert("User is already a participant in the match.");
				return data;
			}

			// Throw unexpected error
			throw new Error(data.message || "Error sending invitation.");
		}

		// Return response data on success
		return data;
	} catch (error) {
		// Handle unexpected errors
		console.error("Error:", error);
		alert("An unexpected error occurred.");
		throw error;
	}
};

// Get all match invitations from a match
export const getAllMatchInvitations = async (matchId, setInvitations) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/invitations/${matchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error getting match invitations: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		setInvitations(data);
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Get Friends list that are not invited or already participating in the match
export const getFriendsNotInvited = async (
	userId,
	matchId,
	setNotInvitedFriends
) => {
	try {
		// Get all the user's friends
		const friendsResponse = await fetch(
			`${config.serverUrl}/users/friends/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const friendsList = await friendsResponse.json();

		// Get all the match invitations for this match
		const invitationsResponse = await fetch(
			`${config.serverUrl}/matches/invitations/${matchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const matchInvitations = await invitationsResponse.json();

		// Get all participants for the match
		const participantsResponse = await fetch(
			`${config.serverUrl}/matches/participants/${matchId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const matchParticipants = await participantsResponse.json();

		// Extract user IDs of already invited friends and participants
		const invitedUserIds = matchInvitations.map(
			(invitation) => invitation.id
		);
		const participatingUserIds = matchParticipants.map(
			(participant) => participant.id
		);

		// Filter the friends who are not in the invited list or participants list
		const notInvitedFriends = friendsList.filter(
			(friend) =>
				!invitedUserIds.includes(friend.id) &&
				!participatingUserIds.includes(friend.id)
		);

		// Set the list of friends not invited or already participating
		setNotInvitedFriends(notInvitedFriends);
	} catch (error) {
		console.error("Error getting friends not invited:", error);
	}
};

// Accept a match invitation
export const acceptMatchInvitation = async (matchId, userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/invitations/accept`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					matchId: matchId,
					userId: userId,
				}),
			}
		);

		// Parse the response as JSON
		const data = await response.json();

		// Handle backend messages for known cases
		if (!response.ok) {
			if (data.message === "Invitation does not exist.") {
				alert("The invitation does not exist.");
				return data;
			}

			// Throw unexpected error
			throw new Error(data.message || "Error accepting invitation.");
		}

		// Return response data on success
		return data;
	} catch (error) {
		// Handle unexpected errors
		console.error("Error:", error);
		alert("An unexpected error occurred while accepting the invitation.");
		throw error;
	}
};

// Reject a match invitation
export const rejectMatchInvitation = async (matchId, userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/invitations/reject`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					matchId: matchId,
					userId: userId,
				}),
			}
		);

		// Parse the response as JSON
		const data = await response.json();

		// Handle backend messages for known cases
		if (!response.ok) {
			if (data.message === "Invitation does not exist.") {
				alert("The invitation does not exist.");
				return data;
			}

			// Throw unexpected error
			throw new Error(data.message || "Error rejecting invitation.");
		}

		// Return response data on success
		return data;
	} catch (error) {
		// Handle unexpected errors
		console.error("Error:", error);
		alert("An unexpected error occurred while rejecting the invitation.");
		throw error;
	}
};

// Delete a match participant
export const deleteMatchParticipant = async (matchId, userId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/participants`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				matchId: matchId,
				userId: userId,
			}),
		});

		// Check if the response is ok (status code 2xx)
		if (!response.ok) {
			throw new Error(`Error deleting participant: ${response.statusText}`);
		}

		// Parse the JSON response
		const result = await response.json();

		// Return the result or a success message
		return result;
	} catch (error) {
		// Handle any errors that occur during the request
		console.error("Error in deleteMatchParticipant:", error);
		throw error; // Propagate the error for handling further up
	}
};

// Update match status to 'completed
export const setMatchCompleted = async (matchId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/newstatus`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				matchId: matchId,
				status: "completed",
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Error setting match as completed: ${response.status}`
			);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Change match access type to 'public' or 'private'
export const changeMatchAccessType = async (matchId, accessType) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/change_access_type`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					matchId: matchId,
					accessType: accessType,
				}),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error changing match access type: ${response.status}`
			);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Get matches by access type
// Fetch matches by access type and filter out matches where the user is already a participant
export const getMatchesByAccessType = async (accessType, userId) => {
	try {
		// Fetch matches based on access type
		const response = await fetch(
			`${config.serverUrl}/matches/access_type/${accessType}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error getting matches by access type: ${response.status}`
			);
		}

		const matches = await response.json();

		if (matches.error) {
			throw new Error(`Server error: ${matches.error}`);
		}

		// Filter out matches where the user is already a participant
		const filteredMatches = [];

		for (const match of matches) {
			try {
				// Direct fetch of participants for each match
				const participantsResponse = await fetch(
					`${config.serverUrl}/matches/participants/${match.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (!participantsResponse.ok) {
					throw new Error(
						`Error getting participants for match ${match.id}: ${participantsResponse.status}`
					);
				}

				const participants = await participantsResponse.json();

				// Check if the user is not in the participants list
				const isUserInMatch = participants.some(
					(participant) => participant.id === userId
				);

				if (!isUserInMatch) {
					filteredMatches.push(match);
				}
			} catch (error) {
				console.error(
					`Error fetching participants for match ${match.id}:`,
					error
				);
			}
		}

		return filteredMatches;
	} catch (error) {
		console.error("Error:", error);
		throw error; // Re-throw the error for handling in the component
	}
};

// Function to add a participant to a match
export const addParticipantToMatch = async (matchId, userId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/participants`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ matchId, userId }),
		});

		if (!response.ok) {
			// Handle HTTP errors
			const errorData = await response.json();
			throw new Error(errorData.message || `Error: ${response.status}`);
		}

		const data = await response.json();
		console.log("Participant added successfully:", data);
		return data.message;
	} catch (error) {
		// Log the error and rethrow it to be handled by the calling function
		console.error("Error adding participant to match:", error);
		throw error;
	}
};

// Function to set a new local team for a match
export const setNewLocalTeamToMatch = async (matchId, teamId) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/setLocalTeam`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ matchId, teamId }),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to set new local team: ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log("Local team updated successfully:", data);
		return data;
	} catch (error) {
		console.error("Error setting new local team:", error);
		throw error; // Rethrow to handle it in calling component
	}
};

// Function to set a new visitor team for a match
export const setNewVisitorTeamToMatch = async (matchId, teamId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/setVisitorTeam`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ matchId, teamId }),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to set new visitor team: ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log("Visitor team updated successfully:", data);
		return data;
	} catch (error) {
		console.error("Error setting new visitor team:", error);
		throw error; // Rethrow to handle it in calling component
	}
};

// Remove all players from a match
export const removeAllPlayersFromMatch = async (matchId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/${matchId}/players`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to remove players: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("All players removed from match successfully:", data);
		return data;
	} catch (error) {
		console.error("Error removing players from match:", error);
		throw error;
	}
};

// Add players from a custom team to a match
export const addPlayersToMatchFromTeam = async (matchId, teamId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/${matchId}/teams/${teamId}/players`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to add players from team: ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log(
			"Players from custom team added to match successfully:",
			data
		);
		return data;
	} catch (error) {
		console.error("Error adding players from custom team to match:", error);
		throw error;
	}
};

// Set goals for a participant in a match
export const setParticipantGoals = async (matchId, userId, goals) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/participants/goals`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ matchId, userId, goals }),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to set participant goals: ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log("Participant goals updated successfully:", data);
		return data;
	} catch (error) {
		console.error("Error setting participant goals:", error);
		throw error;
	}
};

// Set assists for a participant in a match
export const setParticipantAssists = async (matchId, userId, assists) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/participants/assists`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ matchId, userId, assists }),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to set participant assists: ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log("Participant assists updated successfully:", data);
		return data;
	} catch (error) {
		console.error("Error setting participant assists:", error);
		throw error;
	}
};

// Set match score for teams A and B
export const setMatchGoals = async (matchId, teamAScore, teamBScore) => {
	try {
		const response = await fetch(`${config.serverUrl}/matches/goals`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ matchId, teamAScore, teamBScore }),
		});

		if (!response.ok) {
			throw new Error(`Failed to set match score: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("Match score updated successfully:", data);
		return data;
	} catch (error) {
		console.error("Error setting match score:", error);
		throw error;
	}
};

// Set match as done by updating match_done to true
export const setMatchDone = async (matchId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/${matchId}/done`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error setting match as done: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data; // Return confirmation of match done status
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// Get match done status for a specific match
export const getMatchDone = async (matchId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/${matchId}/done`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error getting match done status: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data.match_done; // Return the match done status (true or false)
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
