// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PitchTimeScreen = ({ route }) => {
	const pitchInfo = route.params.pitchInfo;

	// console.log("pitchInfo: ", pitchInfo);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Pitch Time Screen.</Text>
			<Text style={styles.text}>{pitchInfo.type}</Text>
			<Text style={styles.text}>
				Esta es la pantalla para elegir la fecha y hora de la reserva.
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
		marginBottom: 10,
	},
});

export default PitchTimeScreen;
