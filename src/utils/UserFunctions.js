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
		console.log(data);
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
