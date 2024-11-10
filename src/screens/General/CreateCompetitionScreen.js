import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	FlatList,
	ActivityIndicator,
	Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
	createCompetition,
	getCompetitionsByUser,
	updateCompetition,
	deleteCompetition,
	loadTeamsInCompetition,
	addTeamToCompetition,
	loadAllCustomTeamsAvailable,
	removeTeamFromCompetition,
} from "../../utils/CompetitionsFunctions.js";
import { getTeamUsers } from "../../utils/TeamsFunctions.js";
import PopUpModal from "../../components/PopUpModal.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CreateCompetitionScreen = ({ route }) => {
	const user = route.params.user || {};
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [compName, setCompName] = useState("");
	const [myCompetitions, setMyCompetitions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedCompetition, setSelectedCompetition] = useState(null);
	const [allCustomTeams, setAllCustomTeamsAvailables] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(
		new Date(new Date().setMonth(new Date().getMonth() + 1))
	);
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const bottomSheetModalRef = useRef(null);
	const [isEditCompModalOpen, setIsEditCompModalOpen] = useState(false);
	const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);
	const [filterTypeTeams, setFilterTypeTeams] = useState("all"); // all or competition
	const [competitionTeams, setCompetitionTeams] = useState([]); // Teams already in competition

	const loadTeamsComp = async (idComp) => {
		const teams = await loadTeamsInCompetition(idComp);
		setCompetitionTeams(teams);
	};

	const loadCompetitions = async () => {
		setLoading(true);
		try {
			const competitions = await getCompetitionsByUser(user.id);
			setMyCompetitions(competitions);
		} catch (error) {
			Alert.alert("Error", "Failed to load competitions.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCompetitions();
	}, [user.id]);

	const toggleFilterTypeTeams = async () => {
		// Toggle the filter type and load teams as needed
		const newFilterType = filterTypeTeams === "all" ? "competition" : "all";
		setFilterTypeTeams(newFilterType);

		// Load all custom teams if switching to "all" view
		if (newFilterType === "all") {
			try {
				const teams = await loadAllCustomTeamsAvailable(
					selectedCompetition.id
				);
				setAllCustomTeamsAvailables(teams);
			} catch (error) {
				console.error("Error loading available teams:", error);
			}
		} else {
			// Load teams in the competition
			loadTeamsComp(selectedCompetition.id);
		}
	};
	// When modal opens, load teams based on the filter type
	useEffect(() => {
		if (isTeamsModalOpen) {
			if (filterTypeTeams === "all") {
				// Load available teams if filter is "all"
				const loadAvailableTeams = async () => {
					const teams = await loadAllCustomTeamsAvailable(
						selectedCompetition.id
					);
					setAllCustomTeamsAvailables(teams);
				};
				loadAvailableTeams();
			} else {
				// Load competition teams if filter is "competition"
				loadTeamsComp(selectedCompetition.id);
			}
		}
	}, [isTeamsModalOpen, filterTypeTeams, selectedCompetition]);

	const handleCreateCompetition = async () => {
		if (!compName.trim()) {
			Alert.alert(
				"Missing Information",
				"Please provide competition details."
			);
			return;
		}
		setLoading(true);
		try {
			await createCompetition({
				name: compName,
				start_date: startDate.toISOString().split("T")[0],
				end_date: endDate.toISOString().split("T")[0],
				created_by_user_id: user.id,
			});
			setCompName("");
			bottomSheetModalRef.current?.dismiss();
			await loadCompetitions();
		} catch (error) {
			Alert.alert("Error", "Failed to create competition.");
		} finally {
			setLoading(false);
		}
	};

	// Function to remove a team from the competition
	const handleRemoveTeam = async (teamId) => {
		try {
			// Remove
			await removeTeamFromCompetition(selectedCompetition.id, teamId);
			Alert.alert("Success", "Team removed from competition.");
			const teams = await loadTeamsInCompetition(selectedCompetition.id);
			setCompetitionTeams(teams);
			const teamsAvailable = await loadAllCustomTeamsAvailable(
				selectedCompetition.id
			);
			setAllCustomTeamsAvailables(teamsAvailable);
		} catch (error) {
			Alert.alert("Error", "Failed to remove team from competition.");
		}
	};

	const handleSaveCompEdits = async () => {
		if (!selectedCompetition) return;
		setLoading(true);
		try {
			await updateCompetition(selectedCompetition.id, {
				name: selectedCompetition.name,
			});
			setIsEditCompModalOpen(false);
			setSelectedCompetition(null);
			await loadCompetitions();
		} catch (error) {
			Alert.alert("Error", "Failed to update competition.");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteCompetition = async (competitionId) => {
		setLoading(true);
		try {
			await deleteCompetition(competitionId);
			await loadCompetitions();
		} catch (error) {
			Alert.alert("Error", "Failed to delete competition.");
		} finally {
			setLoading(false);
		}
	};

	const closeEditCompModal = () => {
		setIsEditCompModalOpen(false);
		setSelectedCompetition(null);
	};

	const onStartDateChange = (event, selectedDate) => {
		if (event.type === "set") {
			setStartDate(selectedDate || startDate);
		}
		setShowStartDatePicker(false);
	};

	const onEndDateChange = (event, selectedDate) => {
		if (event.type === "set") {
			const minEndDate = new Date(startDate);
			minEndDate.setDate(minEndDate.getDate() + 14);
			if (selectedDate < minEndDate) {
				Alert.alert(
					"Invalid End Date",
					"End date must be two weeks after start."
				);
			} else {
				setEndDate(selectedDate || endDate);
			}
		}
		setShowEndDatePicker(false);
	};

	const handlePressCompetition = (id) => {
		console.log(id);
		navigation.navigate("CompetitionScreen", { competitionId: id });
	};

	// Function to check for duplicate participants in a competition
	const checkForDuplicateParticipants = async (competitionId, newTeamId) => {
		try {
			// Fetch existing teams in the competition
			const teamsInCompetition = await loadTeamsInCompetition(competitionId);

			if (!teamsInCompetition || !Array.isArray(teamsInCompetition)) {
				return false;
			}

			// Fetch users in the new team to be added
			const newTeamUsers = await getTeamUsers(newTeamId);

			if (!newTeamUsers || !Array.isArray(newTeamUsers)) {
				console.error(
					"Error: newTeamUsers is undefined or not an array",
					newTeamUsers
				);
				return false;
			}

			// Loop through each existing team to check for duplicate users
			for (const team of teamsInCompetition) {
				if (!team.id) {
					console.error("Error: team.id is undefined", team);
					continue; // Skip this team if no id
				}

				// Fetch users in each existing team
				const teamUsers = await getTeamUsers(team.id);

				if (!teamUsers || !Array.isArray(teamUsers)) {
					console.error(
						"Error: teamUsers is undefined or not an array for team id:",
						team.id
					);
					continue;
				}

				// Check for any duplicate users between new team and existing team
				const duplicateUser = newTeamUsers.some((newUser) =>
					teamUsers.some((existingUser) => existingUser.id === newUser.id)
				);

				if (duplicateUser) {
					return true; // Duplicate found
				}
			}

			return false; // No duplicates found
		} catch (error) {
			console.error("Error checking for duplicate participants:", error);
			throw error;
		}
	};

	// Function to handle adding a new team, with duplicate check
	const handleAddTeam = async (teamId) => {
		try {
			// Check for duplicate participants before adding the team
			const hasDuplicates = await checkForDuplicateParticipants(
				selectedCompetition.id,
				teamId
			);

			if (hasDuplicates) {
				Alert.alert(
					"Error",
					"This team has players already participating in the competition."
				);
				return;
			}

			// Add team if no duplicates found
			await addTeamToCompetition(teamId, selectedCompetition.id);
			Alert.alert("Success", "Team added to competition.");

			// Update the list of teams in competition and available teams
			const teams = await loadTeamsInCompetition(selectedCompetition.id);
			setCompetitionTeams(teams);

			const teamsAvailable = await loadAllCustomTeamsAvailable(
				selectedCompetition.id
			);
			setAllCustomTeamsAvailables(teamsAvailable);
		} catch (error) {
			Alert.alert("Error", "Failed to add team to competition.");
			console.error("Error adding team:", error);
		}
	};

	const renderCompetitionItem = ({ item }) => (
		<Pressable onPress={() => handlePressCompetition(item.id)}>
			<View style={styles.compContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.compText}>
						{item.name.length > 6
							? item.name.slice(0, 6) + "..."
							: item.name}
					</Text>
					<Text style={styles.dateText}>
						{new Date(item.created_at).toLocaleDateString()}
					</Text>
				</View>
				<View style={styles.iconContainer}>
					<TouchableOpacity
						style={styles.icon}
						onPress={() => {
							setSelectedCompetition(item);
							setIsEditCompModalOpen(true);
						}}
					>
						<MaterialIcons name="edit" size={28} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.icon}
						onPress={() => {
							setSelectedCompetition(item);
							setIsTeamsModalOpen(true);
							loadTeamsComp(item.id);
						}}
					>
						<FontAwesome name="users" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.icon}
						onPress={() => handleDeleteCompetition(item.id)}
					>
						<FontAwesome6 name="trash" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</Pressable>
	);

	return (
		<BottomSheetModalProvider>
			<SafeAreaView
				style={[styles.container, { paddingTop: insets.top + 10 }]}
			>
				<TouchableOpacity
					style={[styles.button, { marginTop: -10 }]}
					onPress={() => bottomSheetModalRef.current?.present()}
				>
					<Text style={styles.buttonText}>Create Competition</Text>
				</TouchableOpacity>

				{loading ? (
					<ActivityIndicator
						size="large"
						color="#3562A6"
						style={{ marginTop: 20 }}
					/>
				) : (
					myCompetitions.length > 0 && (
						<>
							<Text
								style={{
									fontSize: 20,
									fontFamily: "InriaSans-Bold",
									marginLeft: 8,
									marginTop: 10,
									marginBottom: 5,
								}}
							>
								My Competitions
							</Text>
							<FlatList
								data={myCompetitions}
								keyExtractor={(item) => item.id.toString()}
								renderItem={renderCompetitionItem}
							/>
						</>
					)
				)}

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={["60%"]}
				>
					<View style={styles.sheetContent}>
						<Text style={styles.sheetTitle}>Competition Details</Text>
						<TextInput
							style={styles.input}
							placeholder="Competition Name"
							value={compName}
							onChangeText={setCompName}
						/>
						<TouchableOpacity
							onPress={() => setShowStartDatePicker(true)}
							style={styles.dateButton}
						>
							<Text style={styles.dateButtonText}>
								Start Date: {startDate.toLocaleDateString()}
							</Text>
						</TouchableOpacity>
						{showStartDatePicker && (
							<DateTimePicker
								value={startDate}
								mode="date"
								onChange={onStartDateChange}
							/>
						)}
						<TouchableOpacity
							onPress={() => setShowEndDatePicker(true)}
							style={styles.dateButton}
						>
							<Text style={styles.dateButtonText}>
								End Date: {endDate.toLocaleDateString()}
							</Text>
						</TouchableOpacity>
						{showEndDatePicker && (
							<DateTimePicker
								value={endDate}
								mode="date"
								onChange={onEndDateChange}
							/>
						)}
						<TouchableOpacity
							style={styles.button}
							onPress={handleCreateCompetition}
						>
							<Text style={styles.buttonText}>Create</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetModal>

				<PopUpModal
					isOpen={isEditCompModalOpen}
					setIsOpen={setIsEditCompModalOpen}
				>
					<View style={styles.popUpContainer}>
						<Text style={styles.label}>Edit Competition</Text>
						<TextInput
							style={styles.input}
							placeholder="Competition Name"
							value={selectedCompetition?.name || ""}
							onChangeText={(text) =>
								setSelectedCompetition({
									...selectedCompetition,
									name: text,
								})
							}
						/>
						<TouchableOpacity
							style={styles.saveButton}
							onPress={handleSaveCompEdits}
						>
							<Text style={styles.saveButtonText}>Save Changes</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.closeButton}
							onPress={closeEditCompModal}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</PopUpModal>

				<PopUpModal
					isOpen={isTeamsModalOpen}
					setIsOpen={setIsTeamsModalOpen}
				>
					<View style={styles.popUpContainer}>
						<Text style={styles.label}>
							{filterTypeTeams === "all"
								? "Available Teams"
								: "Teams in Competition"}
						</Text>
						<TouchableOpacity
							onPress={toggleFilterTypeTeams}
							style={styles.filterButton}
						>
							<Text style={styles.filterButtonText}>
								{filterTypeTeams === "all"
									? "Show Teams in Competition"
									: "Show Available Teams"}
							</Text>
						</TouchableOpacity>

						<FlatList
							data={
								filterTypeTeams === "all"
									? allCustomTeams
									: competitionTeams
							}
							keyExtractor={(team) => team.id.toString()}
							renderItem={({ item }) => (
								<View style={styles.teamContainer}>
									<Text style={styles.teamText}>{item.name}</Text>
									{filterTypeTeams === "all" ? (
										<TouchableOpacity
											styles={styles.iconTeams}
											onPress={() => handleAddTeam(item.id)}
										>
											<FontAwesome
												name="plus-circle"
												size={24}
												color="#4A84DC"
											/>
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											styles={styles.iconTeams}
											onPress={() => handleRemoveTeam(item.id)}
										>
											<FontAwesome6
												name="trash"
												size={24}
												color="red"
											/>
										</TouchableOpacity>
									)}
								</View>
							)}
							ListEmptyComponent={
								<Text style={styles.noUsersText}>
									{filterTypeTeams === "all"
										? "No available teams."
										: "No teams in competition."}
								</Text>
							}
						/>

						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setIsTeamsModalOpen(false)}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</PopUpModal>
			</SafeAreaView>
		</BottomSheetModalProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	button: {
		backgroundColor: "#3562A6",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "center",
		marginBottom: 10,
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	compContainer: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		backgroundColor: "#f2f2f2",
		borderRadius: 12,
		marginHorizontal: 5,
		marginVertical: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 3,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	compText: {
		marginLeft: 10,
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
		color: "#333",
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignSelf: "flex-end",
	},
	icon: {
		marginHorizontal: 10,
	},
	sheetContent: {
		flex: 1,
		padding: 20,
	},
	sheetTitle: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 20,
		width: "100%",
	},
	dateButton: {
		backgroundColor: "#f2f2f2",
		padding: 10,
		borderRadius: 8,
		marginBottom: 10,
	},
	dateButtonText: {
		color: "#333",
		fontSize: 16,
		fontFamily: "InriaSans-Regular",
	},
	popUpContainer: {
		borderRadius: 20,
		padding: 20,
		backgroundColor: "#FFFFFF",
		width: "90%",
		alignSelf: "center",
		alignItems: "center",
	},
	label: {
		fontSize: 22,
		fontFamily: "InriaSans-Bold",
		color: "#333",
		marginBottom: 10,
		textAlign: "center",
	},
	saveButton: {
		backgroundColor: "#4A84DC",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 10,
		width: "100%",
	},
	saveButtonText: {
		color: "#fff",
		fontFamily: "InriaSans-Bold",
		fontSize: 16,
	},
	closeButton: {
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		width: "100%",
		marginTop: 10,
	},
	closeButtonText: {
		color: "#fff",
		fontFamily: "InriaSans-Bold",
		fontSize: 16,
	},
	teamText: {
		fontSize: 16,
		fontFamily: "InriaSans-Regular",
		color: "#333",
		paddingVertical: 10,
	},
	filterButton: {
		marginBottom: 15,
	},
	filterButtonText: {
		color: "#4A84DC",
		fontSize: 16,
		textAlign: "center",
		fontFamily: "InriaSans-Bold",
	},
	teamContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	iconTeams: {
		marginLeft: 10,
	},
	dateText: {
		fontSize: 12,
		color: "#353A50", // Light black
		fontFamily: "InriaSans-Regular",
		marginTop: 2,
		marginLeft: 10,
	},
});

export default CreateCompetitionScreen;
