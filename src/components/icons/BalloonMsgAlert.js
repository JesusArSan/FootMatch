import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BallonMsgAlert = ({ unreadCount }) => {
	if (unreadCount > 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{unreadCount}</Text>
			</View>
		);
	} else {
		return null;
	}
};

const styles = StyleSheet.create({
	container: {
		width: 20,
		height: 20,
		backgroundColor: "#0E1E5B",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 10,
		color: "white",
		fontFamily: "InriaSans-Bold",
	},
});

export default BallonMsgAlert;
