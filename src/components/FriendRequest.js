// React Imports
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Import utils
import { acceptFriendRequest, getUserById } from "../utils/UserFunctions";

const FriendRequest = ({ requestData, updateFriendsData, userLogged }) => {
	const [userData, setUserData] = useState(null);
	// Navigation hook
	const navigation = useNavigation();

	useEffect(() => {
		if (userData && Object.keys(userData).length > 0) {
			console.log("User pressed: ", userData);
			navigation.navigate("OtherUserProfile", {
				otherUser: userData,
				userLogged: userLogged,
			});
		}
	}, [userData]);

	const handlePressUser = async () => {
		await getUserById(requestData.sender_id, setUserData);
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
						<Text
							style={{ color: "white", fontFamily: "InriaSans-Bold" }}
						>
							Accept
						</Text>
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
