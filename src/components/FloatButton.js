import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const FloatButton = ({ title, onPress, customOpacity = 1 }) => {
	return (
		<Pressable
			style={[styles.button, { opacity: customOpacity }]}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#091442",
		paddingVertical: 15,
		paddingHorizontal: 25,
		borderRadius: 25,
		position: "absolute",
		bottom: 30,
		alignSelf: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
});

export default FloatButton;
