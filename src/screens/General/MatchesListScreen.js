// React Imports
import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	Dimensions,
	Image,
	Pressable,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { format, isSameDay } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Matches Functions
import { getUserMatches } from "../../utils/MatchesFunctions";

const MatchesListScreen = ({ route }) => {
	// Navigation
	const navigation = useNavigation();
	// User data
	const user = route.params.user || {};
	// State to store matches
	const [centers, setCenters] = useState([]);
	// Safe Area Insets
	const insets = useSafeAreaInsets();
	const screenHeight = Dimensions.get("window").height;

	// Calculate available height for content
	const headerHeight = 100;
	const availableHeight = screenHeight - insets.top - headerHeight;

	// Fetch user matches on screen focus
	useFocusEffect(
		useCallback(() => {
			getUserMatches(user.id)
				.then((data) => {
					setCenters(data);
				})
				.catch((error) => {
					console.error("Error getting user matches:", error);
				});
		}, [user.id])
	);

	// Handle match press
	const handleMatchPress = (item) => {
		// Extract and process match_date (assuming it is in the "2024-09-05T13:30:00.000Z" format)
		const matchDateTime = new Date(item.match_date);

		// Get the local timezone offset and adjust the date to match local time
		const utcDate = new Date(
			matchDateTime.getTime() - matchDateTime.getTimezoneOffset() * 60000
		);

		// Format the date to "yyyy-MM-dd HH:mm" as in the handleReserve function
		const formattedDate = format(utcDate, "yyyy-MM-dd HH:mm");

		// Navigate to MatchConfigScreen with formatted date and other details
		navigation.navigate("MatchTabNavigator", {
			user,
			reservation: {
				matchDate: formattedDate,
				pitchId: item.pitch_id,
				user_id: item.created_by_user_id,
			}, // Use the formatted date here
			matchId: item.id,
		});
	};

	// Render item for FlatList
	const renderItem = ({ item }) => {
		// Check if user is the leader (creator)
		const isLeader = user.id === item.created_by_user_id;

		// Set background color based on if the user is the leader
		const backgroundColor = isLeader ? "#ADD8E6" : "#90EE90";

		// Check status for scheduled, completed, or canceled
		let statusText = "";
		let statusBackgroundColor = "";

		if (item.status === "scheduled") {
			statusText = "Scheduled";
			statusBackgroundColor = "#FFA500"; // Orange
		} else if (item.status === "completed") {
			statusText = "Completed";
			statusBackgroundColor = "#808080"; // Gray
		} else if (item.status === "canceled") {
			statusText = "Canceled";
			statusBackgroundColor = "#FF6347"; // Tomato red
		}

		return (
			<Pressable
				style={[styles.containerMatch, { backgroundColor }]}
				onPress={() => handleMatchPress(item)}
			>
				<View style={styles.matchInfo}>
					<View>
						<View style={styles.teamInfoContainer}>
							{/* Team A Logo and Name */}
							<Image
								source={{ uri: item.team_a_logo }}
								style={styles.logo}
							/>
							<Text style={styles.teamName}>{item.team_a_name}</Text>
						</View>

						<View style={styles.teamInfoContainer}>
							{/* Team B Logo and Name */}
							<Image
								source={{ uri: item.team_b_logo }}
								style={styles.logo}
							/>
							<Text style={styles.teamName}>{item.team_b_name}</Text>
						</View>
					</View>

					{/* Match Status and Leader */}
					<View
						style={[
							styles.statusContainer,
							{ backgroundColor: statusBackgroundColor },
						]}
					>
						<Text style={styles.statusText}>{statusText}</Text>
					</View>
				</View>
				{/* Show if the user is the leader */}
				{isLeader && <Text style={styles.leaderText}>You are leader</Text>}
			</Pressable>
		);
	};

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
			<Text style={styles.title}>My Matches</Text>

			{/* FlatList to render centers */}
			<FlatList
				showsVerticalScrollIndicator={false}
				data={centers}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				style={styles.list}
				contentContainerStyle={[
					styles.listContainer,
					{ paddingBottom: insets.bottom + 10 },
				]}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "left",
	},
	text: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 20,
	},
	list: {
		width: "100%",
	},
	listContainer: {
		paddingBottom: 20,
	},
	containerMatch: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 10,
		borderRadius: 8,
		borderColor: "#ccc",
		borderWidth: 1,
	},
	matchInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	teamInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	logo: {
		width: 50,
		height: 50,
		marginRight: 10,
	},
	teamName: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
	},
	centerName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	leaderText: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
		color: "#0000FF",
		alignSelf: "flex-end",
	},
	statusContainer: {
		padding: 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		height: 40,
		width: 80,
		alignContent: "center",
	},
	statusText: {
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
	},
});

export default MatchesListScreen;
