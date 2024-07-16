// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TeamsScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Teams</Text>
			<Text style={styles.text}>Esta es la pantalla de equipos.</Text>
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

export default TeamsScreen;
