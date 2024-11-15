import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const FloatButton = ({
	title,
	onPress,
	customOpacity = 1,
	backgroundCustomColor = "#091442",
	fontCustomColor = "white",
}) => {
	return (
		<Pressable
			style={[
				styles.button,
				{ opacity: customOpacity, backgroundColor: backgroundCustomColor },
			]}
			onPress={onPress}
		>
			<Text style={[styles.buttonText, { color: fontCustomColor }]}>
				{title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
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
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
});

export default FloatButton;
