// React Imports
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MatchesListScreen = ({ route }) => {
	// Navigation
	const navigation = useNavigation();
	// User data
	const user = route.params.user || {};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Matches</Text>
			<Text style={styles.text}>
				Esta es la pantalla de matches del usuario con id: {user.id}.
			</Text>
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

export default MatchesListScreen;
