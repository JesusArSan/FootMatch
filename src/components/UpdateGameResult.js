// React Imports
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const UpdateGameResult = ({ teamA, teamB, result, onPress }) => {
	// State to store the scores of Team A and Team B
	const [scoreA, setScoreA] = useState(result.A);
	const [scoreB, setScoreB] = useState(result.B);

	// Handle close action
	const handleClose = () => {
		onPress(); // Close the modal
	};

	// Increment and decrement functions for the scores
	const incrementScore = (setter, score) => {
		setter(score + 1);
	};

	const decrementScore = (setter, score) => {
		if (score > 0) {
			setter(score - 1);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Update Game Result</Text>
			<View style={styles.scoreContainer}>
				<View style={styles.scoreBox}>
					<View style={styles.scoreRow}>
						<TouchableOpacity
							style={styles.pressableArea}
							onPress={() => decrementScore(setScoreA, scoreA)}
						>
							<Text style={styles.circleButtonText}>-</Text>
						</TouchableOpacity>
						<Text style={styles.scoreText}>{scoreA}</Text>
						<TouchableOpacity
							style={styles.pressableArea}
							onPress={() => incrementScore(setScoreA, scoreA)}
						>
							<Text style={styles.circleButtonText}>+</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.teamName}>{teamA.name}</Text>
				</View>
				<View style={styles.scoreBox}>
					<View style={styles.scoreRow}>
						<TouchableOpacity
							style={styles.pressableArea}
							onPress={() => decrementScore(setScoreB, scoreB)}
						>
							<Text style={styles.circleButtonText}>-</Text>
						</TouchableOpacity>
						<Text style={styles.scoreText}>{scoreB}</Text>
						<TouchableOpacity
							style={styles.pressableArea}
							onPress={() => incrementScore(setScoreB, scoreB)}
						>
							<Text style={styles.circleButtonText}>+</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.teamName}>{teamB.name}</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.saveButton}>
					<Text style={styles.saveButtonText}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
					<Text style={styles.closeButtonText}>Close</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
		backgroundColor: "#FAFAFA",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginBottom: 20,
		color: "#353A50",
	},
	scoreContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	scoreBox: {
		alignItems: "center",
		marginHorizontal: 20,
	},
	scoreRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	pressableArea: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10, // Increase pressable area
	},
	circleButtonText: {
		color: "#3562A6",
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
	},
	scoreText: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
		color: "#353A50",
		textAlign: "center",
		backgroundColor: "#EFEFEF",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		minWidth: 40,
		marginHorizontal: 10,
	},
	teamName: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		color: "#353A50",
		marginTop: 10,
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
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10, // Space between buttons
	},
	saveButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	closeButton: {
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10, // Space between buttons
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
});

export default UpdateGameResult;
