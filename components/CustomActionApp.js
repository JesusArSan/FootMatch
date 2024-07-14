// React Imports
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";
import { useNavigation, CommonActions } from "@react-navigation/native";
import BallMagnifyingGlassIcon from "./icons/BallMagnifyingGlassIcon";
import ShirtTeam from "./icons/ShirtTeam";
import TrophyIcon from "./icons/TrophyIcon";
import PeopleIcon from "./icons/PeopleIcon";

const CustomActionApp = ({ actionType }) => {
	// Navigation between screens
	const navigation = useNavigation();

	switch (actionType) {
		case "1":
			return (
				<TouchableOpacity
					onPress={() => navigation.navigate("BookFieldScreen")}
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
					onPress={() => navigation.navigate("FindMatchScreen")}
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
					onPress={() => navigation.navigate("JoinCompetScreen")}
					style={styles.actionContainer}
					activeOpacity={0.7}
				>
					<View style={styles.icon}>
						<TrophyIcon />
					</View>
					<Text style={styles.title}>Join Competitions</Text>
					<Text style={styles.descrip}>
						Challenge yourself against the best teams
					</Text>
				</TouchableOpacity>
			);
		case "4":
			return (
				<TouchableOpacity
					onPress={() => navigation.navigate("TeamsScreen")}
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
		width: 166,
		height: 166,
		justifyContent: "flex-end",
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
