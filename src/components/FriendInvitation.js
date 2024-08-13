// React Imports
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// Icons
import Entypo from "@expo/vector-icons/Entypo";

const FriendInvitation = ({ friend, onPress }) => {
	// Function to truncate the name if it exceeds a certain length
	const truncateName = (name, maxLength) => {
		return name.length > maxLength
			? name.substring(0, maxLength) + "..."
			: name;
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: friend.photo }} style={styles.avatar} />
			<Text style={styles.name}>{truncateName(friend.username, 10)}</Text>
			<TouchableOpacity style={styles.iconContainer} onPress={onPress}>
				<Entypo
					name="merge"
					size={18}
					color="white"
					style={{ transform: [{ rotate: "90deg" }] }} // Rotate icon 90 degrees
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 5,
		marginTop: 3,
		backgroundColor: "#EEEEEE",
		borderRadius: 20,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 7,
	},
	name: {
		flex: 1,
		fontSize: 11,
		fontFamily: "InriaSans-Bold",
		color: "#333",
	},
	iconContainer: {
		backgroundColor: "#1E90FF",
		padding: 5,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default FriendInvitation;
