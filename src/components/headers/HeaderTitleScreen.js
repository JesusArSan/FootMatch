// React Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

// Title Screen
const HeaderTitleScreen = ({ props, text }) => {
	return <Text style={styles.title}>{text}</Text>;
};

export default HeaderTitleScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		color: "#fafafa",
		paddingBottom: 2,
		marginLeft: -10,
	},
});

// Name file: components/HeaderTitleScreen.js
