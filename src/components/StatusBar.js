// React Imports
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const StatusBar = ({ onSearchInputChange }) => {
	// Handle Input Change and return it to the parent component
	const handleInputChange = (text) => {
		onSearchInputChange(text);
	};

	return (
		<View style={styles.searchBar}>
			<Feather
				name="search"
				size={24}
				color="black"
				style={styles.searchIcon}
			/>
			<TextInput
				style={styles.input}
				placeholder="Search"
				maxLength={50}
				onChangeText={handleInputChange}
			/>
		</View>
	);
};

export default StatusBar;

const styles = StyleSheet.create({
	searchBar: {
		flexDirection: "row",
		backgroundColor: "#fafafa",
		borderRadius: 10,
		padding: 10,
		width: "100%",
		alignItems: "center",
	},
	searchIcon: {
		marginLeft: 1,
		marginRight: 4,
	},
	input: {
		flex: 1,
		fontSize: 15,
	},
});
