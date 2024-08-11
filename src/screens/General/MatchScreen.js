// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MatchScreen = ({ route }) => {
	const user = route.params.user || {};
	const userid = route.params.userid || {};
	console.log(user.id);
	console.log(userid);
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
