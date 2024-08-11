// React Imports
import React from "react";
import { View, StyleSheet } from "react-native";

const DrawerDivider = ({ color = "white", customWidth = "80%" }) => (
	<View
		style={[styles.divider, { backgroundColor: color, width: customWidth }]}
	/>
);

const styles = StyleSheet.create({
	divider: {
		height: 1,
		marginHorizontal: 27,
		marginVertical: 5,
		alignSelf: "center",
	},
});

export default DrawerDivider;
