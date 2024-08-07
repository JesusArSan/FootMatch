// React Imports
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// Utils
import { sendFriendRequest, deleteFriendRequest } from "../utils/UserFunctions";

const AddFriendComponent = ({ userLogged, userSearched, updateUsersData }) => {
	const [requestStatus, setRequestStatus] = useState(
		userSearched.requestStatus
	);

	const handlePressUser = () => {
		console.log("User pressed: ", userSearched.id);
	};

	const handleButtonPress = async () => {
		if (requestStatus === "pending") {
			// Delete friend request
			console.log(
				"Cancel friend request button pressed for: ",
				userSearched.id
			);
			await deleteFriendRequest(userLogged.id, userSearched.id);
			setRequestStatus("none");
			updateUsersData();
		} else {
			console.log("Add friend button pressed for: ", userSearched.id);
			await sendFriendRequest(userLogged.id, userSearched.id);
			setRequestStatus("pending");
			updateUsersData();
		}
	};

	// Get the style of the button
	const getButtonStyle = () => {
		if (requestStatus === "pending") {
			return { ...styles.addButton, ...styles.pendingButton };
		}
		return styles.addButton;
	};

	// Get the content of the button
	const getButtonContent = () => {
		if (requestStatus === "pending") {
			return <MaterialIcons name="schedule-send" size={24} color="white" />;
		}
		return <AntDesign name="adduser" size={24} color="white" />;
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
						source={{ uri: userSearched.photo }}
					/>
				</View>
				<View style={styles.userInfoContainer}>
					<Text style={styles.usernameText}>{userSearched.username}</Text>
					<Text style={styles.nameText}>{userSearched.name}</Text>
				</View>
				<View>
					<Pressable style={getButtonStyle()} onPress={handleButtonPress}>
						<Text style={styles.addButtonText}>{getButtonContent()}</Text>
					</Pressable>
				</View>
			</Pressable>
		</View>
	);
};

export default AddFriendComponent;

const styles = StyleSheet.create({
	friendContainer: {
		paddingHorizontal: 0,
	},
	userInfoContainer: {
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "flex-start",
		width: "50%",
	},
	usernameText: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	nameText: {
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
	},
	containerComponent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	addButton: {
		backgroundColor: "#3562A6",
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 5,
		alignContent: "center",
		justifyContent: "center",
	},
	pendingButton: {
		backgroundColor: "#FFA500",
	},
	addButtonText: {
		color: "white",
		fontFamily: "InriaSans-Bold",
	},
	userPhoto: {
		marginRight: 10,
	},
});
