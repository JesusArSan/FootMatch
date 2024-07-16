// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SupportScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Support</Text>
			<Text style={styles.text}>Esta es la pantalla de soporte.</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		textAlign: "center",
	},
});

export default SupportScreen;
