// React Imports
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BallMagnifyingGlassIcon from "./icons/BallMagnifyingGlassIcon";
import ShirtTeam from "./icons/ShirtTeam";
import TrophyIcon from "./icons/TrophyIcon";
import PeopleIcon from "./icons/PeopleIcon";
import userLocation from "../utils/UserLocation";

const CustomActionApp = ({ actionType, user }) => {
	// Navigation between screens
	const navigation = useNavigation();

	switch (actionType) {
		case "1":
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("BookingStackNavigator", {
							user: user,
						})
					}
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<BallMagnifyingGlassIcon />
					</View>
					<Text style={styles.title}>Book a field</Text>
					<Text style={styles.descrip}>
						Organize your own match with anyone you want
					</Text>
				</TouchableOpacity>
			);
		case "2":
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("FindMatchScreen", {
							user: user,
						})
					}
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<PeopleIcon />
					</View>
					<Text style={styles.title}>Find a Match</Text>
					<Text style={styles.descrip}>
						Meet new people, and enhance your skills
					</Text>
				</TouchableOpacity>
			);
		case "3":
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("CreateCompetitionScreen", {
							user: user,
						})
					}
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<TrophyIcon />
					</View>
					<Text style={styles.title}>Competitions</Text>
					<Text style={styles.descrip}>
						Challenge yourself against the best teams
					</Text>
				</TouchableOpacity>
			);
		case "4":
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("TeamsScreen", {
							user: user,
						})
					}
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<ShirtTeam />
					</View>
					<Text style={styles.title}>Teams</Text>
					<Text style={styles.descrip}>
						Create your own team and compete with others
					</Text>
				</TouchableOpacity>
			);
		default:
			return (
				<TouchableOpacity
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<BallMagnifyingGlassIcon />
					</View>
					<Text style={styles.title}>Generic Text</Text>
					<Text style={styles.descrip}>
						This is a generic text for a generic action app
					</Text>
				</TouchableOpacity>
			); // Generic return
	}
};

export default CustomActionApp;

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
	actionContainer: {
		width: "48%",
		// width: 166,
		// height: 166,
		backgroundColor: "#FAFAFA",
		borderRadius: 25,
		padding: 16,
		...shadowStyles,
	},
	icon: {
		marginBottom: 10,
	},
	title: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		marginBottom: 8,
	},
	descrip: {
		fontSize: 12,
		fontFamily: "InriaSans-Bold",
		marginBottom: 5,
	},
});
