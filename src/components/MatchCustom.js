import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PopUpModal from "./PopUpModal.js";
import { getAllCustomTeams } from "../utils/TeamsFunctions.js";

const NAME_LIMIT = 6;

const MatchCustom = ({
	matchId = {},
	teamA = {},
	teamB = {},
	result = {},
	isLeader = false,
	noTimeLeft = false,
	onPressLocal = () => {},
	onPressVisitor = () => {},
}) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [teams, setTeams] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [isLocalTeam, setIsLocalTeam] = useState(false);

	// Open modal and fetch teams, determine if it's for local or visitor
	const handleOpenModal = async (isLocal) => {
		try {
			const fetchedTeams = await getAllCustomTeams(matchId);
			setTeams(fetchedTeams);
			setIsLocalTeam(isLocal);
			setModalOpen(true);
		} catch (error) {
			console.error("Error fetching teams:", error);
		}
	};

	// Handle team selection
	const handleSelectTeam = (teamId) => {
		setSelectedTeam(teamId);
		setModalOpen(false);
		if (isLocalTeam) {
			onPressLocal(matchId, teamId);
		} else {
			onPressVisitor(matchId, teamId);
		}
	};

	return (
		<View style={styles.matchContainer}>
			{/* Team A Display */}
			<View style={styles.teamContainer}>
				<Image
					source={{ uri: teamA.image || "default_teamA_image_url" }}
					style={styles.teamLogo}
				/>
				<Text style={styles.teamName}>
					{teamA.name
						? teamA.name.substring(0, NAME_LIMIT) +
							(teamA.name.length > NAME_LIMIT ? "." : "")
						: "Team A"}
				</Text>
				{!isLeader || noTimeLeft ? null : (
					<TouchableOpacity
						onPress={() => handleOpenModal(true)}
						style={styles.editButton}
					>
						<MaterialCommunityIcons
							name="clock-edit"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* VS Text */}
			<Text style={styles.vsText}>
				{result.status === "completed" &&
				result.teamA >= 0 &&
				result.teamB >= 0
					? `${result.teamA} - ${result.teamB}`
					: "VS"}
			</Text>

			{/* Team B Display with Pop-up for team selection */}
			<View style={styles.teamContainer}>
				<Image
					source={{ uri: teamB.image || "default_teamB_image_url" }}
					style={styles.teamLogo}
				/>
				<Text style={styles.teamName}>
					{teamB.name
						? teamB.name.substring(0, NAME_LIMIT) +
							(teamB.name.length > NAME_LIMIT ? "." : "")
						: "Team B"}
				</Text>
				{!isLeader || noTimeLeft ? null : (
					<TouchableOpacity
						onPress={() => handleOpenModal(false)}
						style={styles.editButton}
					>
						<MaterialCommunityIcons
							name="clock-edit"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* PopUpModal for team selection */}
			<PopUpModal isOpen={isModalOpen} setIsOpen={setModalOpen}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Select a Team</Text>
					<FlatList
						data={teams}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => handleSelectTeam(item.id)}
								style={styles.teamItem}
							>
								<Text style={styles.teamText}>{item.name}</Text>
							</Pressable>
						)}
					/>
					<Pressable
						onPress={() => setModalOpen(false)}
						style={styles.closeButton}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</Pressable>
				</View>
			</PopUpModal>
		</View>
	);
};

const styles = StyleSheet.create({
	matchContainer: {
		flexDirection: "row",
		width: "77%",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fafafa",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 25,
		elevation: 5,
	},
	teamContainer: {
		alignItems: "center",
		height: 50,
	},
	teamLogo: {
		width: 35,
		height: 35,
		marginBottom: 4,
	},
	teamName: {
		fontSize: 14,
		fontFamily: "InriaSans-Bold",
		color: "#000",
	},
	vsText: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginHorizontal: 20,
		color: "#000",
	},
	editButton: {
		position: "absolute",
		top: -10,
		right: -20,
		padding: 4,
	},
	modalContainer: {
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		marginHorizontal: 20,
		height: "50%",
		justifyContent: "center",
	},

	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	teamItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		width: "100%",
		alignItems: "center",
	},
	teamText: {
		fontSize: 16,
		color: "#333",
	},
	closeButton: {
		backgroundColor: "#D9534F",
		padding: 10,
		borderRadius: 8,
		marginTop: 20,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
	},
});

export default MatchCustom;
