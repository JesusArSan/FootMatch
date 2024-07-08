// React Imports
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MyLastGame = ({}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.titleComponent}>Your Last Game</Text>
			<TouchableOpacity style={styles.resultContainer} activeOpacity={0.7}>
				<View style={styles.team}>
					<Image
						source={require("../assets/images/teamGeneric.png")}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>Team 1</Text>
				</View>
				<View>
					<Text style={styles.textVersus}>VS</Text>
				</View>
				<View style={styles.team}>
					<Image
						source={require("../assets/images/teamGeneric.png")}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>Team 2</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MyLastGame;

// Shadow styles
const shadowStyles = {
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 6,
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 20,
	},
	titleComponent: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		marginBottom: 10,
	},
	resultContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 20,
		paddingLeft: 50,
		paddingRight: 50,
		borderRadius: 30,
		backgroundColor: "#FAFAFA",
		...shadowStyles,
	},
	teamLogo: {
		width: 60,
		height: 55,
		marginBottom: 8,
	},
	team: {
		alignItems: "center",
	},
	teamName: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
	},
	textVersus: {
		fontSize: 27,
		fontFamily: "InriaSans-Bold",
		alignItems: "center",
	},
});
