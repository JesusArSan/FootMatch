import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Alert,
	TouchableOpacity,
	Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
// My components
import FloatButton from "../../components/FloatButton";
import {
	cancelMatch,
	changeMatchAccessType,
	deleteMatchParticipant,
	getMatchParticipantsData,
} from "../../utils/MatchesFunctions";
// Icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MatchConfigScreen = ({ route }) => {
	// Navigation
	const navigation = useNavigation();
	// User data and match details
	const user = route.params.user || {};
	const reservation = route.params.reservation || {};
	const matchCompleted = route.params.matchCompleted || false;
	const userIsCreator = route.params.userIsCreator || false;
	const matchId = route.params.matchId || {};
	const [isParticipant, setIsParticipant] = useState(false);
	// State for access type switch (public/private)
	const [isPrivate, setIsPrivate] = useState(
		route.params.accessType === "private"
	);

	// Toggle match access type
	const toggleAccessType = async () => {
		const newAccessType = isPrivate ? "public" : "private";
		try {
			await changeMatchAccessType(matchId, newAccessType);
			setIsPrivate(!isPrivate);
			Alert.alert("Success", `Match is now ${newAccessType}.`);
		} catch (error) {
			Alert.alert("Error", `Failed to change access type: ${error.message}`);
		}
	};

	// Check if the current user is a participant
	useFocusEffect(
		useCallback(() => {
			const checkParticipation = async () => {
				try {
					const participants = await getMatchParticipantsData(matchId);
					const isUserInMatch = participants.some(
						(participant) => participant.id === user.id
					);
					setIsParticipant(isUserInMatch);
				} catch (error) {
					console.error("Error fetching match participants:", error);
				}
			};

			checkParticipation();
		}, [matchId, user.id])
	);

	// Handle leave match
	const handleLeaveMatch = async () => {
		if (!matchId) {
			Alert.alert("Error", "No match ID provided.");
			return;
		}

		try {
			await deleteMatchParticipant(matchId, user.id);
			Alert.alert("Success", "You have left the match.");
			navigation.navigate("MainNavigatorScreen"); // Navega al home
		} catch (error) {
			Alert.alert("Error", `Failed to leave match: ${error.message}`);
		}
	};

	// Handle cancel match
	const handleCancelMatch = async () => {
		if (!matchId) {
			Alert.alert("Error", "No match ID provided.");
			return;
		}

		try {
			await cancelMatch(matchId);
			Alert.alert("Success", "Match canceled successfully");
			navigation.navigate("MainNavigatorScreen");
		} catch (error) {
			Alert.alert("Error", `Error canceling match: ${error.message}`);
		}
	};

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={styles.backgroundImage}
		>
			<View style={styles.mainContainer}>
				{/* For participants who are not the creator */}
				{!matchCompleted && !userIsCreator && isParticipant && (
					<TouchableOpacity
						style={styles.leaveButton}
						onPress={handleLeaveMatch}
					>
						<FontAwesome6 name="door-open" size={35} color="tomato" />
						<Text style={styles.leaveText}>Leave Match</Text>
					</TouchableOpacity>
				)}

				{/* Only for creators */}
				{userIsCreator && (
					<View style={styles.configContainer}>
						<Text style={styles.configTitle}>Match Configuration</Text>
						<View style={styles.divider} />

						{/* Toggle Access Type */}
						<View style={styles.accessContainer}>
							<Text style={styles.accessLabel}>
								{isPrivate ? "Private Match" : "Public Match"}
							</Text>
							<Switch
								value={isPrivate}
								onValueChange={toggleAccessType}
								trackColor={{ false: "#FF5722", true: "#4CAF50" }}
								thumbColor={isPrivate ? "#2196F3" : "#FFEB3B"}
								ios_backgroundColor="#3e3e3e"
								style={styles.accessSwitch}
							/>
						</View>
					</View>
				)}

				{/* Cancel Match Button */}
				{userIsCreator && (
					<FloatButton
						title="Cancel Match"
						backgroundCustomColor="red"
						onPress={handleCancelMatch}
						style={styles.cancelButton}
					/>
				)}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: "cover",
	},
	mainContainer: {
		flex: 1,
		paddingTop: "25%",
		paddingHorizontal: 30,
		backgroundColor: "rgba(250, 250, 250, 0.8)",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		marginTop: 30,
		marginHorizontal: 20,
	},
	leaveButton: {
		alignItems: "center",
		marginBottom: 20,
	},
	leaveText: {
		fontSize: 16,
		color: "tomato",
		marginTop: 5,
	},
	configContainer: {
		paddingHorizontal: 10,
	},
	configTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 15,
		textAlign: "center",
	},
	divider: {
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		width: "100%",
		marginBottom: 20,
	},
	accessContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	accessLabel: {
		fontSize: 18,
		color: "#333",
	},
	accessSwitch: {
		marginLeft: 10,
	},
	cancelButton: {
		position: "absolute",
		bottom: 30,
		right: 20,
	},
});

export default MatchConfigScreen;
