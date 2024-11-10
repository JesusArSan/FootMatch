import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import config from "../../config";

// Logout handler
export const handleLogout = async (navigation, route) => {
	try {
		// Remove the userToken and userData from AsyncStorage
		await AsyncStorage.removeItem("@userToken");
		await AsyncStorage.removeItem("@userData");
		await AsyncStorage.removeItem("@userLocation");

		// Remove data of route.params
		route.params = {};

		// Navigate to the Login screen, and reset the navigation stack
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [
					{
						name: "InitialScreen",
						params: { user: null, tokenValid: false },
					},
				],
			})
		);
	} catch (e) {
		console.error("Error al cerrar sesión: ", e);
		Alert.alert(
			"Error",
			"No se pudo cerrar la sesión. Por favor, intentalo de nuevo."
		);
	}
};

// Function to get the user's friends list
export const getFriendsList = async (userId, setFriendList) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/friends/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setFriendList(data);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

// Function to get the user's friend requests
export const getFriendsRequests = async (userId, setFriendsRequests) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/friend_requests/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setFriendsRequests(data);
	} catch (error) {
		console.log(error);
	}
};

// Accept friend request
export const acceptFriendRequest = async (requestId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/friend_requests/accept`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ requestId }),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error accepting friend request: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Send friend request
export const sendFriendRequest = async (sender_id, receiver_id) => {
	console.log("sender_id: ", sender_id);
	console.log("receiver_id: ", receiver_id);
	try {
		const response = await fetch(
			`${config.serverUrl}/users/friend_requests`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ sender_id, receiver_id }),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error sending friend request: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Function to get all users that are not friends and not the user itself
export const getUsers = async (userId, setUserFilterList) => {
	try {
		// Fetch all users
		const response = await fetch(`${config.serverUrl}/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const users = await response.json();

		// Delete the user itself from the list
		const userIndex = users.findIndex((user) => user.id === userId);
		users.splice(userIndex, 1);

		// Fetch the friend request status for each non-friend user
		const usersWithStatus = await Promise.all(
			users.map(async (user) => {
				const response = await fetch(
					`${config.serverUrl}/users/friend_requests/status`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							sender_id: userId,
							receiver_id: user.id,
						}),
					}
				);

				// Handle HTTP errors
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// Get the request info
				const requestInfo = await response.json();

				// Check if the user is a friend
				const friendStatus = await isFriend(userId, user.id);

				// Return the user with the request info
				return {
					...user,
					requestStatus: requestInfo.status,
					friendStatus: friendStatus,
				};
			})
		);

		// Set the final filtered user list with request status
		setUserFilterList(usersWithStatus);
	} catch (error) {
		console.error("Error fetching users:", error);
		setUserFilterList([]); // Optionally set users to an empty array on error
	}
};

// Delete friend request
export const deleteFriendRequest = async (sender_id, receiver_id) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/friend_requests/${sender_id}/${receiver_id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error deleting friend request: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Is friend
export const isFriend = async (userId, friendId) => {
	try {
		const response = await fetch(`${config.serverUrl}/users/friends/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, friendId }),
		});

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error checking friend: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		return data.isFriend;
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Remove friend
export const removeFriend = async (userId, friendId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/remove_friend/${userId}/${friendId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error removing friend: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		console.log(data);
	} catch (error) {
		// Alert the user about the error
		alert(`${error.message}`);
	}
};

// Function to get a user by id
export const getUserById = async (userId, setUserData) => {
	try {
		const response = await fetch(`${config.serverUrl}/users/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching user: ${response.status}`);
		}

		const userData = await response.json();
		setUserData(userData);
	} catch (error) {
		console.error("Error fetching user:", error);
		setUserData(null); // Optionally handle the error by setting user data to null
	}
};

// Function to update the user's profile photo in the database
export const updateProfilePhoto = async (userId, photoUrl) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/${userId}/update_photo`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ photoUrl }),
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error updating profile photo: ${response.status}`);
		}

		const data = await response.json();

		// Check if the response data contains an error message
		if (data.error) {
			throw new Error(`Error del servidor: ${data.error}`);
		}

		console.log("Profile photo updated successfully", data);
	} catch (error) {
		console.error("Error updating profile photo:", error);
		alert(`${error.message}`);
	}
};

// Update user
export const updateUser = async (userId, updatedData) => {
	try {
		const response = await fetch(`${config.serverUrl}/users/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			throw new Error(`Error updating user: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		console.log("User updated successfully", data);
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};

// update user role
export const updateUserRole = async (userId, roleId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/${userId}/update_role`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ role_id: roleId }),
			}
		);

		if (!response.ok) {
			throw new Error(`Error updating user role: ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		console.log("User role updated successfully", data);
	} catch (error) {
		console.error("Error updating user role:", error);
		throw error;
	}
};

// Fetch last completed match for a user
export const fetchLastCompletedMatch = async (userId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/users/${userId}/completed-match`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching last completed match: ${response.status}`
			);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Server error: ${data.error}`);
		}

		return data;
	} catch (error) {
		console.error("Error fetching last completed match:", error);
		throw error;
	}
};

// Fetch user experience points
export const getUserExperience = async (userId) => {
	try {
		const response = await fetch(`${config.serverUrl}/users/${userId}/exp`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("User not found");
			} else {
				throw new Error("Error getting experience points");
			}
		}
		const data = await response.json();
		return data.user_exp;
	} catch (error) {
		console.error("Error fetching user experience:", error);
		throw error;
	}
};

// Update user experience points
export const updateUserExperience = async (id) => {
	try {
		const response = await fetch(`${config.serverUrl}/users/${id}/exp`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("User not found or no match records found");
			} else {
				throw new Error("Error updating experience points");
			}
		}
		const data = await response.json();
		return data.user_exp; // Retorna el valor de `user_exp` de la respuesta
	} catch (error) {
		console.error("Error updating user experience:", error);
		throw error;
	}
};

// Update team for a match participant
export const updateMatchParticipantTeam = async (matchId, userId, teamId) => {
	try {
		const response = await fetch(
			`${config.serverUrl}/matches/${matchId}/participants/${userId}/team`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ teamId }),
			}
		);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("Participant not found in the match.");
			} else {
				throw new Error("Error updating participant's team.");
			}
		}

		const data = await response.json();
		return data; // Retorna los datos de la respuesta
	} catch (error) {
		console.error("Error updating match participant team:", error);
		throw error;
	}
};
