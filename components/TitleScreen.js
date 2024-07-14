// React Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

// Title Screen
const TitleScreen = ({ props, text }) => {
	return <Text style={styles.title}>{text}</Text>;
};

export default TitleScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		color: "#fafafa",
		paddingBottom: 2,
		marginLeft: -10,
	},
});

// Name file: components/TitleScreen.js
