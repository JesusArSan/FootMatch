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
} from "../utils/MatchesFunctions";

const UpdateStatsParticipants = ({
	matchId,
	onClose,
	result,
	teamAId,
	teamBId,
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
					"Limit Exceeded",
					"Total goals cannot exceed the combined team score."
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
					"Limit Exceeded",
					"Total assists cannot exceed the total goals."
				);
			}
		}

		setParticipants(updatedParticipants);
	};

	// Check if total goals and assists match the team result before closing and update database
	const checkGoalsAndAssistsBeforeClose = async () => {
		const totalGoals = participants.reduce(
			(sum, p) => sum + (p.goals || 0),
			0
		);
		const totalAssists = participants.reduce(
			(sum, p) => sum + (p.assists || 0),
			0
		);

		// Validate total goals and assists do not exceed allowed values
		if (totalGoals > result.teamA + result.teamB) {
			Alert.alert(
				"Goal Limit Exceeded",
				"The total goals assigned to participants exceed the team's result. Please adjust."
			);
		} else if (totalAssists > totalGoals) {
			Alert.alert(
				"Assist Mismatch",
				"The total assists cannot exceed the total goals. Please adjust."
			);
		} else {
			// If validation passes, update each participant's goals and assists in the database
			try {
				for (const participant of participants) {
					const { id: userId, goals = 0, assists = 0 } = participant;

					await setParticipantGoals(matchId, userId, goals);
					await setParticipantAssists(matchId, userId, assists);
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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Update Participant Stats</Text>
			<ScrollView style={styles.participantsList}>
				{participants.map((participant, index) => (
					<View key={participant.id} style={styles.participantItem}>
						<Text style={styles.participantName}>
							{participant.username}
						</Text>
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
});

export default UpdateStatsParticipants;
