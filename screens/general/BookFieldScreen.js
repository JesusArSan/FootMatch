// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookFieldScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Book a Field</Text>
			<Text style={styles.text}>Esta es la pantalla de booking.</Text>
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

export default BookFieldScreen;