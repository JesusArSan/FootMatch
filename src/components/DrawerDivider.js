// React Imports
import React from "react";
import { View, StyleSheet } from "react-native";

const DrawerDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
	divider: {
		height: 1,
		width: "80%",
		backgroundColor: "#ffffff",
		marginLeft: 27,
		marginVertical: 5,
	},
});

export default DrawerDivider;
