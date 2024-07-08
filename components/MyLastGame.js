// React Imports
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MyLastGame = ({}) => {
	return (
		<View>
			<TouchableOpacity style={styles.resultContainer} activeOpacity={0.7}>
				<View style={styles.team}>
					<Image
						// source={require("../assets/images/teamGeneric.png")}
						source={require("../assets/images/espana.png")}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>España</Text>
				</View>
				<View>
					<Text style={styles.textVersus}>VS</Text>
				</View>
				<View style={styles.team}>
					<Image
						// source={require("../assets/images/teamGeneric.png")}
						source={require("../assets/images/alemania.png")}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>Alemania</Text>
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
	resultContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		paddingLeft: 25,
		paddingRight: 25,
		borderRadius: 30,
		backgroundColor: "#FAFAFA",
		...shadowStyles,
	},
	teamLogo: {
		width: 50,
		height: 50,
	},
	team: {
		width: 120,
		alignItems: "center",
	},
	teamName: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
	},
	textVersus: {
		fontSize: 27,
		fontFamily: "InriaSans-Bold",
		alignItems: "center",
	},
});
