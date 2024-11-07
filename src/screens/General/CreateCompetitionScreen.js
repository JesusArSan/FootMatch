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

	const handleAddTeam = async (teamId) => {
		try {
			await addTeamToCompetition(teamId, selectedCompetition.id);
			Alert.alert("Success", "Team added to competition.");
			const teams = await loadTeamsInCompetition(selectedCompetition.id);
			setCompetitionTeams(teams);
			const teamsAvailable = await loadAllCustomTeamsAvailable(
				selectedCompetition.id
			);
			setAllCustomTeamsAvailables(teamsAvailable);
		} catch (error) {
			Alert.alert("Error", "Failed to add team to competition.");
		}
	};

	const renderCompetitionItem = ({ item }) => (
		<Pressable onPress={() => handlePressCompetition(item.id)}>
			<View style={styles.compContainer}>
				<Text style={styles.compText}>
					{item.name.length > 12
						? item.name.slice(0, 12) + "..."
						: item.name}
				</Text>
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
});

export default CreateCompetitionScreen;
