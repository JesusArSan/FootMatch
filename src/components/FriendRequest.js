// React Imports
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
// Import utils
import { acceptFriendRequest } from "../utils/UserFunctions";

const FriendRequest = ({ requestData, updateFriendsData }) => {
	const handlePressUser = () => {
		console.log("User pressed: ", requestData.sender_id);
	};

	const handlePressAccept = async () => {
		// Accept friend request
		await acceptFriendRequest(requestData.id);
		// Update friends data
		updateFriendsData();
	};

	return (
		<View style={styles.friendContainer}>
			<Pressable style={styles.containerComponent} onPress={handlePressUser}>
				<View style={styles.userPhoto}>
					<Image
						style={{
							width: 50,
							height: 50,
							borderRadius: 25,
							resizeMode: "cover",
						}}
						source={{ uri: requestData.sender_photo }}
					/>
				</View>
				<View style={styles.requestTextContainer}>
					<Text style={styles.combinedText}>
						<Text style={{ fontFamily: "InriaSans-Bold" }}>
							{requestData.username}
						</Text>
						<Text style={{ fontFamily: "InriaSans-Regular" }}>
							{" "}
							has sent you a friend request.
						</Text>
					</Text>
				</View>
				<View>
					<Pressable
						style={styles.acceptButton}
						onPress={handlePressAccept}
					>
						<Text style={{ color: "white" }}>Accept</Text>
					</Pressable>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	friendContainer: {
		paddingHorizontal: 0,
	},
	requestTextContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		width: "55%",
	},
	combinedText: {
		fontSize: 16,
	},
	containerComponent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	acceptButton: {
		backgroundColor: "#3562A6",
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default FriendRequest;

// Name file: components/FriendRequest.js
