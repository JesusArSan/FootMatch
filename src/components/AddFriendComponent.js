// React Imports
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// Utils
import {
	sendFriendRequest,
	deleteFriendRequest,
	removeFriend,
} from "../utils/UserFunctions";

const AddFriendComponent = ({ userLogged, userSearched, updateUsersData }) => {
	// Navigation hook
	const navigation = useNavigation();

	// Request status
	const [requestStatus, setRequestStatus] = useState(
		userSearched.friendStatus ? "accepted" : userSearched.requestStatus
	);

	// Handle press user
	const handlePressUser = () => {
		console.log("User pressed: ", userSearched.id);
		navigation.navigate("OtherUserProfile", {
			otherUser: userSearched,
			userLogged: userLogged,
		});
	};

	// Handle button press
	const handleButtonPress = async () => {
		if (requestStatus === "pending") {
			await deleteFriendRequest(userLogged.id, userSearched.id);
			setRequestStatus("none");
			updateUsersData();
		} else if (requestStatus === "accepted") {
			await removeFriend(userLogged.id, userSearched.id);
			setRequestStatus("none");
			updateUsersData();
		} else {
			await sendFriendRequest(userLogged.id, userSearched.id);
			setRequestStatus("pending");
			updateUsersData();
		}
	};

	// Get the style of the button
	const getButtonStyle = () => {
		if (requestStatus === "pending") {
			return { ...styles.addButton, ...styles.pendingButton };
		} else if (requestStatus === "accepted") {
			return { ...styles.addButton, ...styles.acceptedButton };
		}
		return styles.addButton;
	};

	// Get the content of the button
	const getButtonContent = () => {
		if (requestStatus === "pending") {
			return <MaterialIcons name="schedule-send" size={24} color="white" />;
		} else if (requestStatus === "accepted") {
			return <AntDesign name="checkcircle" size={24} color="white" />;
		}
		return <AntDesign name="adduser" size={24} color="white" />;
	};

	console.log("Request status: ", requestStatus);

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
	acceptedButton: {
		backgroundColor: "#90EE90",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 5,
		alignContent: "center",
		justifyContent: "center",
	},
});
