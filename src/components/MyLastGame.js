// React Imports
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format, isSameDay } from "date-fns";

const MyLastGame = ({ matchData, user }) => {
	// Set up navigation
	const navigation = useNavigation();

	// Truncate team names if longer than 8 characters
	const truncateName = (name) =>
		name.length > 8 ? `${name.slice(0, 8)}...` : name;

	// Handle navigation to the match screen
	const handleNavigateToMatch = () => {
		// Process matchData.date to get it in the desired format
		const matchDateTime = new Date(matchData.date);

		// Adjust for the local timezone offset
		const utcDate = new Date(
			matchDateTime.getTime() - matchDateTime.getTimezoneOffset() * 60000
		);

		// Format the date to "yyyy-MM-dd HH:mm"
		const formattedDate = format(utcDate, "yyyy-MM-dd HH:mm");

		// Navigate to MatchTabNavigator with the formatted date and other details
		navigation.navigate("MatchTabNavigator", {
			user: user,
			matchId: matchData.matchId,
			reservation: {
				matchDate: formattedDate,
				pitchId: matchData.pitchId,
				user_id: matchData.createdByUserId,
			},
		});
	};

	// Return message if no match data is available
	if (!matchData) {
		return (
			<View>
				<Text style={styles.noMatchText}>
					No recent game data available.
				</Text>
			</View>
		);
	}

	return (
		<View>
			<TouchableOpacity
				style={styles.resultContainer}
				activeOpacity={0.7}
				onPress={handleNavigateToMatch}
			>
				{/* Team A */}
				<View style={styles.team}>
					<Image
						source={{ uri: matchData.teamA.logo }}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>
						{truncateName(matchData.teamA.name)}
					</Text>
				</View>

				{/* Score */}
				<View style={styles.scoreContainer}>
					<Text style={styles.scoreText}>
						{matchData.teamA.score} - {matchData.teamB.score}
					</Text>
				</View>

				{/* Team B */}
				<View style={styles.team}>
					<Image
						source={{ uri: matchData.teamB.logo }}
						style={styles.teamLogo}
					/>
					<Text style={styles.teamName}>
						{truncateName(matchData.teamB.name)}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MyLastGame;

// Shadow styles
const shadowStyles = {
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 2 },
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
	scoreContainer: {
		alignItems: "center",
	},
	scoreText: {
		fontSize: 27,
		fontFamily: "InriaSans-Bold",
	},
	noMatchText: {
		color: "gray",
		fontSize: 16,
		fontFamily: "InriaSans-Regular",
		textAlign: "center",
		marginTop: 10,
	},
});
