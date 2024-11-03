// React Imports
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { getMatchesByAccessType } from "../../utils/MatchesFunctions.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FindMatchScreen = () => {
	const [publicMatches, setPublicMatches] = useState([]);

	// Fetch public matches when component mounts
	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const matches = await getMatchesByAccessType("public");
				setPublicMatches(matches);
			} catch (error) {
				console.error("Error fetching public matches:", error);
			}
		};
		fetchMatches();
	}, []);

	// Truncate text to a certain length
	const truncateText = (text, length) => {
		return text.length > length ? `${text.substring(0, length)}.` : text;
	};

	const handleEnterMatch = () => {
		try {
			navigation.navigate("MatchDetailScreen", { matchId });
			
		} catch (error) {
			Alert.alert("Error", "Failed to enter match.");
		}
	};

	const renderMatchItem = ({ item }) => (
		<View style={styles.matchCard}>
			<Image source={{ uri: item.team_a_logo }} style={styles.teamLogo} />
			<View style={styles.matchInfo}>
				<Text style={styles.teamNames}>
					{truncateText(item.team_a_name, 8)} vs{" "}
					{truncateText(item.team_b_name, 8)}
				</Text>
				<Text style={styles.matchDate}>
					{new Date(item.match_date).toLocaleDateString()} -{" "}
					{new Date(item.match_date).toLocaleTimeString()}
				</Text>
				<Text style={styles.matchLocation}>
					Location: {item.center_name}
				</Text>
			</View>
			<TouchableOpacity onPress={handleEnterMatch}>
				<MaterialCommunityIcons
					name="location-enter"
					size={30}
					color="black"
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Time to play!</Text>
			<FlatList
				data={publicMatches}
				renderItem={renderMatchItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={
					<Text style={styles.emptyText}>No public matches available</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f4f7",
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#2c3e50",
		marginBottom: 20,
		textAlign: "center",
	},
	listContent: {
		paddingBottom: 20,
	},
	matchCard: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 10,
		margin: 5,
		marginBottom: 10,
		padding: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	teamLogo: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 15,
	},
	matchInfo: {
		flex: 1,
	},
	teamNames: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#34495e",
	},
	matchDate: {
		fontSize: 14,
		color: "#7f8c8d",
		marginVertical: 5,
	},
	matchLocation: {
		fontSize: 14,
		color: "#95a5a6",
	},
	emptyText: {
		fontSize: 16,
		color: "#bdc3c7",
		textAlign: "center",
		marginTop: 20,
	},
});

export default FindMatchScreen;
