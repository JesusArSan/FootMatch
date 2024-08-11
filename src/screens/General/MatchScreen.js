// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MatchScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};
	const centerInfo = route.params.centerInfo || {};
	const pitchInfo = route.params.pitchInfo || {};
	const dateReservation = route.params.dateReservation || {};

	console.log("UserData en MatchScreen", user.id);
	// console.log(centerInfo);
	// console.log(pitchInfo);
	console.log("Fecha Reserva:", dateReservation);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Match con lider: {user.id}</Text>
			<Text style={styles.text}>Esta es la pantalla de Match.</Text>
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

export default MatchScreen;
