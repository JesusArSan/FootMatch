import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const AddFriendButton = ({ onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={onPress}>
				<Ionicons name="person-add-sharp" size={30} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: "#3562A6",
		width: 120,
		height: 45,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});

export default AddFriendButton;
