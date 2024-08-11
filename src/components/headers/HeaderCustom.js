// React Imports
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// Icon Components
import MenuIcon from "../icons/MenuIcon";
import AppIcon from "../icons/AppIcon";

// Header Community
const HeaderCustom = ({ props = {} }) => {

	return (
		<View style={styles.header}>
			<MenuIcon />
			<AppIcon />
		</View>
	);
};

export default HeaderCustom;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: Dimensions.get("window").width * 0.5, // 50% width of the screen
	},
});
