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
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { format, isSameDay } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Matches Functions
import {
	getUserMatchesByStatus,
	getUserMatchInvitations,
	acceptMatchInvitation,
	rejectMatchInvitation,
} from "../../utils/MatchesFunctions";
// Icons
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const MatchesListScreen = ({ route }) => {
	// Navigation
	const navigation = useNavigation();
	// User data
	const user = route.params.user || {};
	// State to store matches
	const [invitedMatches, setInvitedMatches] = useState([]);
	const [pendingMatches, setPendingMatches] = useState([]);
	const [finishedMatches, setFinishedMatches] = useState([]);
	// Safe Area Insets
	const insets = useSafeAreaInsets();
	const screenHeight = Dimensions.get("window").height;
	// Boolean to use other style behind the preseable
	const [invitedPressed, setInvitedPressed] = useState(true);
	const [pendingPressed, setPendingPressed] = useState(false);
	const [finishedPressed, setFinishedPressed] = useState(false);
	// Refreshing state
	const [refreshing, setRefreshing] = useState(false);

	// Calculate available height for content
	const headerHeight = 100;
	const availableHeight = screenHeight - insets.top - headerHeight;

	// Function to refresh matches
	const refreshMatches = useCallback(() => {
		// Fetch scheduled matches
		getUserMatchesByStatus(user.id, "scheduled")
			.then((data) => {
				// Sort matches by date, with most recent matches first
				const sortedMatches = data.sort(
					(a, b) => new Date(b.match_date) - new Date(a.match_date)
				);
				setPendingMatches(sortedMatches); // Set sorted matches
			})
			.catch((error) => {
				console.error("Error getting user matches:", error);
			});

		// Fetch completed matches
		getUserMatchesByStatus(user.id, "completed")
			.then((data) => {
				// Sort matches by date, with most recent matches first
				const sortedMatches = data.sort(
					(a, b) => new Date(b.match_date) - new Date(a.match_date)
				);
				setFinishedMatches(sortedMatches); // Set sorted matches
			})
			.catch((error) => {
				console.error("Error getting user finished matches:", error);
			});

		// Fetch pending invitations
		getUserMatchInvitations(user.id, "pending")
			.then((data) => {
				// Sort matches by date, with most recent matches first
				const sortedMatches = data.sort(
					(a, b) => new Date(b.match_date) - new Date(a.match_date)
				);
				setInvitedMatches(sortedMatches); // Set sorted matches
			})
			.catch((error) => {
				console.error("Error getting user invited matches:", error);
			});

		setRefreshing(false); // Set refreshing to false
	}, [user.id]);

	// Fetch user matches on screen focus
	useFocusEffect(
		useCallback(() => {
			refreshMatches();

			// Cleanup when component unmounts
			return () => {
				setPendingMatches([]);
				setFinishedMatches([]);
				setInvitedMatches([]);
			};
		}, [refreshMatches])
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

	// Set the button pressed
	const setButtonPressed = (button) => {
		if (button === "invited") {
			setInvitedPressed(true);
			setPendingPressed(false);
			setFinishedPressed(false);
		} else if (button === "pending") {
			setInvitedPressed(false);
			setPendingPressed(true);
			setFinishedPressed(false);
		} else {
			setInvitedPressed(false);
			setPendingPressed(false);
			setFinishedPressed(true);
		}
	};

	// Handle the invitation acceptance
	const handleAcceptInvitation = async (matchId, userId) => {
		console.log("Invitation accepted", matchId, userId);

		// Accept invitation
		await acceptMatchInvitation(matchId, userId);

		// Refresh the matches list after accepting the invitation
		refreshMatches();
	};

	// Handle the invitation rejection
	const handleRejectInvitation = async (matchId, userId) => {
		console.log("Invitation rejected", matchId, userId);

		// Reject Invitation
		await rejectMatchInvitation(matchId, userId);

		// Refresh the matches list after rejecting the invitation
		refreshMatches();
	};

	// Render item for FlatList
	const renderItem = ({ item }) => {
		// Check if user is the leader (creator)
		const isLeader = user.id === item.created_by_user_id;

		// Set background color based on if the user is the leader or invited
		const backgroundColor = isLeader
			? "#ADD8E6" // Light blue for leaders
			: item.isInvited
				? "#FFD700" // Gold for invited users
				: "#90EE90"; // Light green for participants

		// Check status for scheduled, completed, or canceled
		let statusText = "";
		let statusBackgroundColor = "";

		if (item.status === "scheduled") {
			statusText = "Scheduled";
			statusBackgroundColor = "#FFA500"; // Orange
		} else if (item.status === "completed") {
			statusText = "Completed";
			statusBackgroundColor = "#c9c9c9"; // Gray
		} else if (item.status === "canceled") {
			statusText = "Canceled";
			statusBackgroundColor = "#FF6347"; // Tomato red
		}

		return (
			<Pressable
				style={[styles.containerMatch, { backgroundColor }]}
				onPress={item.isInvited ? null : () => handleMatchPress(item)}
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
							{
								backgroundColor: statusBackgroundColor,
								borderWidth: 2,
								borderColor: "white",
							},
						]}
					>
						<Text style={styles.statusText}>{statusText}</Text>
					</View>
				</View>
				<View
					style={[
						styles.matchDate,
						{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
				>
					<Text style={{ fontFamily: "InriaSans-Regular" }}>
						{isSameDay(new Date(item.match_date), new Date()) // Check if the match is today
							? `Today ${format(new Date(item.match_date), "HH:mm")}` // Show "Today" and the hour
							: format(
									new Date(item.match_date),
									"dd/MM/yyyy HH:mm"
								)}{" "}
					</Text>
					{/* Show if the user is the leader */}
					{isLeader && (
						<Text style={styles.leaderText}>You are leader</Text>
					)}

					{/* Show a cross and a check mark to accept or reject */}
					{item.isInvited && (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "20%",
							}}
						>
							<TouchableOpacity
								onPress={() => handleAcceptInvitation(item.id, user.id)}
								style={{
									backgroundColor: "white",
									borderRadius: 50,
									width: 31,
									height: 31,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<AntDesign
									name="checkcircle"
									size={25}
									color="#228B22"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleRejectInvitation(item.id, user.id)}
								style={{ backgroundColor: "white", borderRadius: 50 }}
							>
								<Entypo
									name="circle-with-cross"
									size={30}
									color="#FF6347"
								/>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</Pressable>
		);
	};

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
			<Text style={styles.title}>My Matches</Text>

			<View style={styles.buttonFilter}>
				<Pressable
					style={
						invitedPressed
							? styles.buttonFilterPressed
							: styles.buttonFilterNoPressed
					}
					onPress={() => setButtonPressed("invited")} // Toggle the state
				>
					<Text style={styles.textFilter}>Invited</Text>
				</Pressable>
				<Pressable
					style={
						pendingPressed
							? styles.buttonFilterPressed
							: styles.buttonFilterNoPressed
					}
					onPress={() => setButtonPressed("pending")} // Toggle the state
				>
					<Text style={styles.textFilter}>Pending</Text>
				</Pressable>
				<Pressable
					style={
						finishedPressed
							? styles.buttonFilterPressed
							: styles.buttonFilterNoPressed
					}
					onPress={() => setButtonPressed("finished")} // Toggle the state
				>
					<Text style={styles.textFilter}>Finished</Text>
				</Pressable>
			</View>

			{/* FlatList to render Matches */}
			<FlatList
				showsVerticalScrollIndicator={false}
				data={
					invitedPressed
						? invitedMatches.map((match) => ({
								...match,
								isInvited: true,
							}))
						: pendingPressed
							? pendingMatches.map((match) => ({
									...match,
									isInvited: false,
								}))
							: finishedPressed
								? finishedMatches.map((match) => ({
										...match,
										isInvited: false,
									}))
								: [] // default empty array
				}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				style={styles.list}
				contentContainerStyle={[
					styles.listContainer,
					{ paddingBottom: insets.bottom + 10 },
				]}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refreshMatches}
					/>
				}
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
		width: 35,
		height: 35,
		marginRight: 10,
	},
	teamName: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	centerName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	matchDate: {
		marginTop: 5,
	},
	leaderText: {
		fontSize: 14,
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
		fontFamily: "InriaSans-Regular",
	},
	buttonFilter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#3562A6",
		height: "6%",
		borderRadius: 20,
		marginBottom: 20,
		paddingHorizontal: 11,
	},
	textFilter: {
		fontSize: 18,
		fontFamily: "InriaSans-Regular",
		color: "#fafafa",
	},
	buttonFilterPressed: {
		backgroundColor: "#4A84DC",
		borderRadius: 13,
		paddingHorizontal: 16,
		paddingVertical: 3,
	},
	buttonFilterNoPressed: {
		backgroundColor: "#3562A6",
		borderRadius: 13,
		paddingHorizontal: 16,
		paddingVertical: 3,
	},
	statusText: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
		color: "black",
	},
});

export default MatchesListScreen;
