// React Imports
import React from "react";
import { View, StyleSheet } from "react-native";
// Icon Components
import MenuIcon from "./icons/MenuIcon";
import MagnifyingGlassIcon from "./icons/MagnifyingGlassIcon";
import AppIcon from "./icons/AppIcon";

// Header Tab Tittle
const HeaderTabTitle = () => {
	return (
		<View style={styles.container}>
			<MenuIcon />
			<AppIcon />
			<MagnifyingGlassIcon />
		</View>
	);
};

export default HeaderTabTitle;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

// Name file: components/HeaderTabTitle.js
