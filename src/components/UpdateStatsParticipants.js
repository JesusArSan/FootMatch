import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import {
	getMatchParticipants,
	setParticipantAssists,
	setParticipantGoals,
	setMatchDone,
} from "../utils/MatchesFunctions";

const UpdateStatsParticipants = ({
	matchId,
	onClose,
	result,
	teamA,
	teamB,
}) => {
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		const fetchParticipants = async () => {
			try {
				await getMatchParticipants(matchId, setParticipants);
			} catch (error) {
				console.error("Error fetching participants:", error);
			}
		};
		fetchParticipants();
	}, [matchId]);

	// Function to increment or decrement counters with validation
	const updateCounter = (index, field, increment) => {
		const updatedParticipants = [...participants];
		const totalGoalsAllowed = result.teamA + result.teamB;

		// Calculate current totals
		const currentTotalGoals = updatedParticipants.reduce(
			(sum, p) => sum + (p.goals || 0),
			0
		);
		const currentTotalAssists = updatedParticipants.reduce(
			(sum, p) => sum + (p.assists || 0),
			0
		);

		// Update goals with validation
		if (field === "goals") {
			const newGoalCount =
				(updatedParticipants[index].goals || 0) + (increment ? 1 : -1);

			if (
				newGoalCount >= 0 &&
				currentTotalGoals + (increment ? 1 : -1) <= totalGoalsAllowed
			) {
				updatedParticipants[index].goals = newGoalCount;
			} else {
				Alert.alert(
					"Goal Assignment Error",
					"You must assign exactly the total number of goals scored."
				);
			}
		}

		// Update assists with validation
		if (field === "assists") {
			const newAssistCount =
				(updatedParticipants[index].assists || 0) + (increment ? 1 : -1);

			if (
				newAssistCount >= 0 &&
				currentTotalAssists + (increment ? 1 : -1) <= currentTotalGoals
			) {
				updatedParticipants[index].assists = newAssistCount;
			} else {
				Alert.alert(
					"Assist Assignment Error",
					"Total assists cannot exceed total goals."
				);
			}
		}

		setParticipants(updatedParticipants);
	};

	// Validation before saving stats
	const checkGoalsAndAssistsBeforeClose = async () => {
		const totalGoals = participants.reduce(
			(sum, p) => sum + (p.goals || 0),
			0
		);
		const totalAssists = participants.reduce(
			(sum, p) => sum + (p.assists || 0),
			0
		);

		// Ensure total goals match team scores exactly
		if (totalGoals !== result.teamA + result.teamB) {
			Alert.alert(
				"Goal Assignment Error",
				"You must assign exactly the total number of goals scored."
			);
		} else if (totalAssists > totalGoals) {
			Alert.alert(
				"Assist Assignment Error",
				"Total assists cannot exceed total goals."
			);
		} else {
			// Save participant stats if validation passes
			try {
				for (const participant of participants) {
					const { id: userId, goals = 0, assists = 0 } = participant;

					await setParticipantGoals(matchId, userId, goals);
					await setParticipantAssists(matchId, userId, assists);
					await setMatchDone(matchId);
				}

				Alert.alert("Success", "All stats have been saved successfully.");
				onClose();
			} catch (error) {
				console.error("Error updating participant stats:", error);
				Alert.alert(
					"Error",
					"An error occurred while saving participant stats. Please try again."
				);
			}
		}
	};

	console.log(participants);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Update Participant Stats</Text>
			<ScrollView style={styles.participantsList}>
				{participants.map((participant, index) => (
					<View key={participant.id} style={styles.participantItem}>
						<Text style={styles.participantName}>
							{participant.username}
						</Text>
						<View styles={styles.logoContainer}>
							{console.log(
								"Team A and user:",
								participant.team_id,
								teamA.idTeam
							)}
							{console.log(
								"Team B and user:",
								participant.team_id,
								teamB.idTeam
							)}
							{participant.teamId === teamA.idTeam && teamA.image ? (
								<Image
									source={{ uri: teamA.image }}
									style={styles.teamLogo}
								/>
							) : participant.teamId === teamB.idTeam && teamB.image ? (
								<Image
									source={{ uri: teamB.image }}
									style={styles.teamLogo}
								/>
							) : null}
						</View>

						<View style={styles.statContainer}>
							<View style={styles.counterBox}>
								<TouchableOpacity
									onPress={() => updateCounter(index, "goals", false)}
								>
									<Text style={styles.counterButton}>-</Text>
								</TouchableOpacity>
								<Text style={styles.counterText}>
									Goals: {participant.goals || 0}
								</Text>
								<TouchableOpacity
									onPress={() => updateCounter(index, "goals", true)}
								>
									<Text style={styles.counterButton}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.counterBox}>
								<TouchableOpacity
									onPress={() =>
										updateCounter(index, "assists", false)
									}
								>
									<Text style={styles.counterButton}>-</Text>
								</TouchableOpacity>
								<Text style={styles.counterText}>
									Assists: {participant.assists || 0}
								</Text>
								<TouchableOpacity
									onPress={() => updateCounter(index, "assists", true)}
								>
									<Text style={styles.counterButton}>+</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.saveButton}
					onPress={checkGoalsAndAssistsBeforeClose}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<Text style={styles.buttonText}>Close</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: "center",
		backgroundColor: "#FAFAFA",
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginBottom: 20,
		color: "#353A50",
	},
	participantsList: {
		maxHeight: 200,
		width: "100%",
	},
	participantItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	participantName: {
		fontSize: 16,
		color: "#353A50",
		fontFamily: "InriaSans-Regular",
		flex: 1,
	},
	statContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		flex: 2,
	},
	counterBox: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
	},
	counterButton: {
		fontSize: 24,
		color: "#3562A6",
		fontFamily: "InriaSans-Bold",
		marginHorizontal: 5,
	},
	counterText: {
		fontSize: 14,
		color: "#353A50",
		fontFamily: "InriaSans-Regular",
		marginHorizontal: 5,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	saveButton: {
		backgroundColor: "#3562A6",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10,
	},
	closeButton: {
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
	logoContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red",
		width: 50,
		height: 50,
	},
	teamLogo: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
});

export default UpdateStatsParticipants;
