import * as React from "react";
import config from "../../config";

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
export const getNonFriends = async (userId, setUserFilterList) => {
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

		// Fetch the user's friends
		const friends = await new Promise((resolve, reject) => {
			getFriendsList(userId, resolve);
		});

		// Filter out the current user and their friends
		const nonFriends = users.filter(
			(user) =>
				user.id !== userId &&
				!friends.some((friend) => friend.id === user.id)
		);

		// Fetch the friend request status for each non-friend user
		const nonFriendsWithStatus = await Promise.all(
			nonFriends.map(async (nonFriend) => {
				const response = await fetch(
					`${config.serverUrl}/users/friend_requests/status`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							sender_id: userId,
							receiver_id: nonFriend.id,
						}),
					}
				);

				// Handle HTTP errors
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				// Get the request info
				const requestInfo = await response.json();

				// Return the user with the request info
				return {
					...nonFriend,
					requestStatus: requestInfo.status
				};
			})
		);

		// Set the final filtered user list with request status
		setUserFilterList(nonFriendsWithStatus);
	} catch (error) {
		console.error("Error fetching users:", error);
		setUserFilterList([]); // Optionally set users to an empty array on error
	}
};

// Delete friend request
