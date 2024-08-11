// React Imports
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TimeSlot = ({ time, occupied, selected, onSelect }) => (
	<TouchableOpacity
		style={[
			styles.container,
			selected && styles.selectedContainer,
			occupied && styles.occupiedContainer, // Add background style if occupied
		]}
		onPress={onSelect}
	>
		<View style={styles.timeContainer}>
			<View style={styles.timeInfo}>
				<Text style={styles.timeText}>{time}</Text>
				<Text style={styles.statusText}>
					{occupied ? "Occupied" : "Available"}
				</Text>
			</View>
			{occupied ? (
				<Icon name="close" size={28} color="red" style={styles.iconStyle} />
			) : (
				<Text
					style={[
						styles.selectedText,
						selected && styles.selectedTextVisible,
					]}
				>
					{selected ? "Selected" : ""}
				</Text>
			)}
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginVertical: 5,
		marginHorizontal: 3,
		borderRadius: 10,
		backgroundColor: "#FAFAFA",
	},
	occupiedContainer: {
		backgroundColor: "#FFD2DC",
	},
	selectedContainer: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	timeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	timeInfo: {
		flexDirection: "column",
	},
	timeText: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	selectedText: {
		fontSize: 16,
		color: "#335683",
		fontFamily: "InriaSans-Bold",
		textAlign: "right",
	},
	selectedTextVisible: {
		width: 80,
	},
	statusText: {
		fontSize: 12,
		color: "#6b7280",
		fontFamily: "InriaSans-Regular",
	},
	iconStyle: {
		alignSelf: "center",
	},
});

export default TimeSlot;
