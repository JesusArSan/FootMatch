// React Imports
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// My icons
import MessageIcon from "../components/icons/MessageIcon";

const FriendFollower = ({ userData, userLogged }) => {
	// Navigation hook
	const navigation = useNavigation();

	const handlePressUser = () => {
		console.log("User pressed: ", userData.id);
		navigation.navigate("OtherUserProfile", {
			otherUser: userData,
			userLogged: userLogged,
		});
	};

	const handlePressMsg = () => {
		console.log("Message button pressed for: ", userData.id);
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
						source={{ uri: userData.photo }}
					/>
				</View>
				<View style={styles.requestTextContainer}>
					<Text style={styles.combinedText}>
						<Text style={{ fontFamily: "InriaSans-Bold" }}>
							{userData.username}
						</Text>
						<Text style={{ fontFamily: "InriaSans-Regular" }}>
							{" "}
							is now your Friend.
						</Text>
					</Text>
				</View>
				<View>
					<Pressable style={styles.msgButton} onPress={handlePressMsg}>
						<MessageIcon size={22} />
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
	msgButton: {
		backgroundColor: "#3562A6",
		paddingHorizontal: 31,
		paddingVertical: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default FriendFollower;

// Name file: components/FriendFollower.js
