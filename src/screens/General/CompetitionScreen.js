import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	Alert,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import {
	getCompetitionById,
	generateMatchesAndReserve,
	deleteCompetitionMatches,
	getCompetitionMatches,
} from "../../utils/CompetitionsFunctions.js";
import { FontAwesome } from "@expo/vector-icons";
import PopUpModal from "../../components/PopUpModal.js";

const CompetitionScreen = ({ route }) => {
	const navigation = useNavigation();
	const { competitionId } = route.params;
	const [competition, setCompetition] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isMatchesModalOpen, setIsMatchesModalOpen] = useState(false);
	const [matches, setMatches] = useState([]);

	const loadCompetition = async () => {
		setLoading(true);
		try {
			const data = await getCompetitionById(competitionId);
			setCompetition(data);
		} catch (error) {
			console.error("Error loading competition:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCompetition();
	}, [competitionId]);

	const handleReserveMatches = async () => {
		if (competition.is_draw) {
			const fetchedMatches = await getCompetitionMatches(competitionId);
			setMatches(fetchedMatches);
			setIsMatchesModalOpen(true);
		} else {
			await generateMatchesAndReserve(competitionId);
			Alert.alert("Success", "Matches reserved successfully");
			await loadCompetition();
		}
	};

	const handleDeleteMatches = async () => {
		await deleteCompetitionMatches(competitionId);
		Alert.alert("Deleted", "Matches and reservations deleted successfully");
		await loadCompetition();
	};

	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color="#3562A6"
				style={{ marginTop: 20 }}
			/>
		);
	}

	if (!competition) {
		return (
			<View style={styles.container}>
				<Text style={styles.error}>Competition not found.</Text>
			</View>
		);
	}

	const handleMatchPress = (item) => {
		const matchDateTime = new Date(item.date_time);
		const utcDate = new Date(
			matchDateTime.getTime() - matchDateTime.getTimezoneOffset() * 60000
		);
		const formattedDate = format(utcDate, "yyyy-MM-dd HH:mm");

		setIsMatchesModalOpen(false);

		try {
			navigation.navigate("MatchTabNavigator", {
				user: route.params.user,
				matchId: item.match_id,
				reservation: {
					matchDate: formattedDate,
					pitchId: item.pitch_id,
					user_id: item.created_by_user_id,
				},
				accessType: item.access_type,
			});
		} catch (error) {
			Alert.alert("Error", "Failed to enter match.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{competition.name}</Text>
			<Image source={{ uri: competition.logo_url }} style={styles.logo} />
			<Text style={styles.detail}>
				Status: <Text style={styles.detailValue}>{competition.status}</Text>
			</Text>
			<Text style={styles.detail}>
				Start Date:{" "}
				<Text style={styles.detailValue}>
					{new Date(competition.start_date).toLocaleDateString()}
				</Text>
			</Text>
			<Text style={styles.detail}>
				End Date:{" "}
				<Text style={styles.detailValue}>
					{new Date(competition.end_date).toLocaleDateString()}
				</Text>
			</Text>
			<Text style={styles.detail}>
				Created By:{" "}
				<Text style={styles.detailValue}>{competition.created_by}</Text>
			</Text>
			<Text style={styles.detail}>
				Draw:{" "}
				<Text style={styles.detailValue}>
					{competition.is_draw ? "Yes" : "No"}
				</Text>
			</Text>

			<TouchableOpacity style={styles.button} onPress={handleReserveMatches}>
				<Text style={styles.buttonText}>
					{competition.is_draw
						? "Mostrar Reserva de Partidos"
						: "Reserve Matches"}
				</Text>
			</TouchableOpacity>

			<PopUpModal
				isOpen={isMatchesModalOpen}
				setIsOpen={setIsMatchesModalOpen}
			>
				<View style={styles.popUpContainer}>
					<Text style={styles.label}>Match Reservations</Text>
					<View style={styles.flatListContainer}>
						<FlatList
							data={matches}
							keyExtractor={(item) => item.match_id.toString()}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => handleMatchPress(item)}
								>
									<View style={styles.matchContainer}>
										<Text
											style={styles.matchTitle}
										>{`${item.team_a} vs ${item.team_b}`}</Text>
										<Text
											style={styles.matchDetail}
										>{`Status: ${item.status}`}</Text>
										<Text
											style={styles.matchDetail}
										>{`Pitch: ${item.pitch_id}`}</Text>
										<View style={styles.dateContainer}>
											<Text style={styles.dateText}>
												{new Date(item.date_time).toLocaleString()}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setIsMatchesModalOpen(false)}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</PopUpModal>

			{/* Ícono de papelera */}
			<TouchableOpacity
				style={styles.trashIcon}
				onPress={handleDeleteMatches}
			>
				<FontAwesome name="trash" size={30} color="#D9534F" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f8f9fa",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
		textAlign: "center",
		textTransform: "uppercase",
	},
	logo: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "#3562A6",
	},
	detail: {
		fontSize: 18,
		color: "#555",
		marginVertical: 5,
		textAlign: "center",
	},
	detailValue: {
		fontWeight: "bold",
		color: "#3562A6",
	},
	error: {
		fontSize: 18,
		color: "red",
		textAlign: "center",
	},
	button: {
		marginTop: 30,
		backgroundColor: "#3562A6",
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: 1,
		textAlign: "center",
	},
	trashIcon: {
		marginTop: 20,
		alignItems: "center",
	},
	popUpContainer: {
		flex: 1,
		borderRadius: 15,
		padding: 15,
		backgroundColor: "#FFFFFF",
		width: "90%",
		maxHeight: "85%",
		alignSelf: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
	},
	flatListContainer: {
		flex: 1,
		width: "100%",
		marginBottom: 10,
	},
	label: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		color: "#333",
		marginBottom: 12,
		textAlign: "center",
	},
	matchContainer: {
		paddingVertical: 12,
		paddingHorizontal: 25,
		backgroundColor: "#f2f2f2",
		borderRadius: 10,
		marginHorizontal: 10,
		marginBottom: 8,
		width: "90%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 2,
		elevation: 2,
	},
	matchTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "#3562A6",
		marginBottom: 3,
		textAlign: "center",
	},
	matchDetail: {
		fontSize: 14,
		color: "#555",
		textAlign: "center",
		marginVertical: 1,
	},
	dateContainer: {
		marginTop: 5,
		paddingVertical: 6,
		backgroundColor: "#e6f0ff",
		borderRadius: 5,
		alignItems: "center",
	},
	dateText: {
		color: "#333",
		fontSize: 13,
		fontWeight: "bold",
	},
	closeButton: {
		marginTop: 15,
		backgroundColor: "#D9534F",
		paddingVertical: 8,
		paddingHorizontal: 30,
		borderRadius: 8,
		alignItems: "center",
		width: "100%",
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 15,
	},
});

export default CompetitionScreen;
