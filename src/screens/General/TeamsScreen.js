// React Imports
import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Alert,
	FlatList,
	Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { uploadImage } from "../../utils/UploadImage";
import {
	createTeam,
	getCreatedTeamsByUser,
	getTeamsByUser,
	deleteTeam,
	updateTeam,
	addUserToTeam,
	getTeamUsers,
	removeUserFromTeam,
	getFriendsNotInTeam,
} from "../../utils/TeamsFunctions";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import PopUpModal from "../../components/PopUpModal";

const TeamsScreen = ({ route }) => {
	const user = route.params.user || {};
	const insets = useSafeAreaInsets();
	const [teamName, setTeamName] = useState("");
	const [shortName, setShortName] = useState("");
	const [teamLogo, setTeamLogo] = useState(null);
	const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);
	const [myTeams, setMyTeams] = useState([]);
	const [joinedTeams, setJoinedTeams] = useState([]);
	const [activeList, setActiveList] = useState("myTeams"); // State to switch between lists
	const bottomSheetModalRef = useRef(null);
	const [refreshing, setRefreshing] = useState(false);
	const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [teamUsers, setTeamUsers] = useState([]);
	const [isTeamUsersModalOpen, setIsTeamUsersModalOpen] = useState(false);
	const [friends, setFriends] = useState([]);
	const [filterType, setFilterType] = useState("team"); // "team" or "friends"
	const [step, setStep] = useState(1);

	// Toggle between team members and friends for adding
	const toggleFilterType = () => {
		setFilterType(filterType === "team" ? "friends" : "team");
	};

	// Load teams created by the user and teams the user has joined
	useEffect(() => {
		const loadMyTeams = async () => {
			try {
				const teams = await getCreatedTeamsByUser(user.id);
				setMyTeams(teams);
			} catch (error) {
				Alert.alert("Error", "Failed to load teams created by you.");
			}
		};

		const loadJoinedTeams = async () => {
			try {
				const teams = await getTeamsByUser(user.id);
				setJoinedTeams(teams);
			} catch (error) {
				Alert.alert("Error", "Failed to load teams you've joined.");
			}
		};

		loadMyTeams();
		loadJoinedTeams();
	}, [user.id]);

	// Open modal to create a team
	const openBottomSheet = () => {
		setStep(1);
		bottomSheetModalRef.current?.present();
	};

	// Proceed to the next step in team creation
	const handleNextStep = () => {
		if (teamName.trim()) {
			setStep(2);
		}
	};

	// Select an image for the team logo
	const pickImage = async () => {
		let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!result.granted) {
			alert("Access to the gallery is required to select an image.");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!pickerResult.canceled) {
			setTeamLogo(pickerResult.assets[0].uri);
			await handleUploadImage(pickerResult.assets[0].uri);
		}
	};

	// Upload the selected image
	const handleUploadImage = async (imageUri) => {
		try {
			const uploadedUrl = await uploadImage(imageUri);
			setUploadedLogoUrl(uploadedUrl);
		} catch (error) {
			Alert.alert("Error", "There was an error uploading the image.");
		}
	};

	// Create a new team
	const handleCreateTeam = async () => {
		if (!teamName.trim() || !shortName.trim() || !uploadedLogoUrl) {
			Alert.alert("Missing Information", "Please provide all team details.");
			return;
		}

		const teamData = {
			name: teamName,
			short_name: shortName,
			logo_url: uploadedLogoUrl,
			created_by_user_id: user.id,
			is_custom_team: 1,
		};

		try {
			await createTeam(teamData, (newTeamId) => {
				const newTeam = { ...teamData, id: newTeamId };
				setMyTeams([...myTeams, newTeam]);
				setTeamName("");
				setShortName("");
				setTeamLogo(null);
				setUploadedLogoUrl(null);
				bottomSheetModalRef.current?.dismiss();
			});
			await loadTeams();
		} catch (error) {
			Alert.alert("Error", "Failed to create the team.");
		}
	};

	// Load both lists of teams
	const loadTeams = async () => {
		try {
			const teamsCreated = await getCreatedTeamsByUser(user.id);
			setMyTeams(teamsCreated);

			const teamsJoined = await getTeamsByUser(user.id);
			setJoinedTeams(teamsJoined);
		} catch (error) {
			Alert.alert("Error", "Failed to reload teams.");
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			loadTeams();
		} catch (error) {
			Alert.alert("Error", "Failed to reload teams.");
		} finally {
			setRefreshing(false);
		}
	};

	// Open edit team modal
	const openEditTeamModal = (team) => {
		setSelectedTeam(team);
		setIsEditTeamModalOpen(true);
	};

	const closeEditTeamModal = () => {
		setIsEditTeamModalOpen(false);
		setSelectedTeam(null);
	};

	// Update the team users list in the modal
	const updateUserLists = async () => {
		if (selectedTeam) {
			try {
				const users = await getTeamUsers(selectedTeam.id);
				setTeamUsers(users);
				const friendsNotInTeam = await getFriendsNotInTeam(
					user.id,
					selectedTeam.id
				);
				setFriends(friendsNotInTeam);
			} catch (error) {
				Alert.alert("Error", "Failed to load users or friends.");
			}
		}
	};

	const openTeamUsersModal = (team) => {
		setSelectedTeam(team);
		setIsTeamUsersModalOpen(true);
	};

	useEffect(() => {
		if (selectedTeam) {
			updateUserLists();
		}
	}, [selectedTeam]);

	const handleAddUserToTeam = async (userId) => {
		try {
			await addUserToTeam(selectedTeam.id, userId);
			updateUserLists();
		} catch (error) {
			Alert.alert("Error", "Failed to add user to the team.");
		}
	};

	const handleRemoveUserFromTeam = async (teamId, userId) => {
		try {
			await removeUserFromTeam(teamId, userId);
			await updateUserLists();
			await loadTeams();
		} catch (error) {
			Alert.alert("Error", "Failed to remove user from the team.");
		}
	};

	const handleDeleteTeam = async (teamId) => {
		try {
			await deleteTeam(teamId);
			await loadTeams();
		} catch (error) {
			Alert.alert("Error", "Failed to delete the team.");
		}
	};

	const handleSaveTeamEdits = async () => {
		try {
			await updateTeam(selectedTeam.id, {
				name: selectedTeam.name,
				short_name: selectedTeam.short_name,
			});
			closeEditTeamModal();
			await loadTeams();
		} catch (error) {
			Alert.alert("Error", "Failed to update the team.");
		}
	};

	// Render list of created teams
	const renderCreatedTeams = ({ item }) => (
		<View style={styles.teamContainer}>
			<Text style={styles.teamText}>{item.name}</Text>
			<Text style={styles.teamDetails}>Short Name: {item.short_name}</Text>
			{item.logo_url ? (
				<Image source={{ uri: item.logo_url }} style={styles.teamLogo} />
			) : (
				<Text style={styles.teamDetails}>No Logo</Text>
			)}
			<View style={styles.iconContainer}>
				<TouchableOpacity
					style={styles.icon}
					onPress={() => openEditTeamModal(item)}
				>
					<MaterialIcons name="edit" size={28} color="black" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.icon}
					onPress={() => openTeamUsersModal(item)}
				>
					<FontAwesome6 name="user-pen" size={24} color="black" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.icon}
					onPress={() => handleDeleteTeam(item.id)}
				>
					<FontAwesome6 name="trash" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);

	// Render list of joined teams
	const renderJoinedTeams = ({ item }) => (
		<View style={styles.teamContainer}>
			<Text style={styles.teamText}>{item.name}</Text>
			<Text style={styles.teamDetails}>Short Name: {item.short_name}</Text>
			{item.logo_url ? (
				<Image source={{ uri: item.logo_url }} style={styles.teamLogo} />
			) : (
				<Text style={styles.teamDetails}>No Logo</Text>
			)}
			<View style={styles.iconContainer}>
				{item.created_by_user_id === user.id ? (
					<FontAwesome5 name="crown" size={24} color="black" />
				) : (
					<TouchableOpacity
						style={styles.icon}
						onPress={() => handleRemoveUserFromTeam(item.id, user.id)}
					>
						<Entypo name="log-out" size={24} color="black" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);

	return (
		<BottomSheetModalProvider>
			<SafeAreaView
				style={[styles.container, { paddingTop: insets.top + 10 }]}
			>
				<TouchableOpacity
					style={[styles.button, { marginTop: -10 }]}
					onPress={openBottomSheet}
				>
					<Text style={styles.buttonText}>Create a New Team</Text>
				</TouchableOpacity>

				<View style={styles.toggleContainer}>
					<TouchableOpacity
						style={[
							styles.toggleButton,
							activeList === "myTeams" && styles.activeButton,
						]}
						onPress={() => setActiveList("myTeams")}
					>
						<Text
							style={[
								styles.toggleButtonText,
								activeList === "myTeams" && styles.activeButtonText,
							]}
						>
							My Teams
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.toggleButton,
							activeList === "joinedTeams" && styles.activeButton,
						]}
						onPress={() => setActiveList("joinedTeams")}
					>
						<Text
							style={[
								styles.toggleButtonText,
								activeList === "joinedTeams" && styles.activeButtonText,
							]}
						>
							Teams I'm In
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.flatListContainer}>
					{activeList === "myTeams" ? (
						<FlatList
							data={myTeams}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderCreatedTeams}
							ListEmptyComponent={
								<Text style={styles.emptyText}>
									No teams created by you.
								</Text>
							}
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					) : (
						<FlatList
							data={joinedTeams}
							keyExtractor={(item) => item.id.toString()}
							renderItem={renderJoinedTeams}
							ListEmptyComponent={
								<Text style={styles.emptyText}>
									You have not joined any teams.
								</Text>
							}
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					)}
				</View>

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={["60%"]}
				>
					<View style={styles.sheetContent}>
						{step === 1 ? (
							<>
								<Text style={styles.sheetTitle}>Enter Team Name</Text>
								<TextInput
									style={styles.input}
									placeholder="Team name"
									value={teamName}
									onChangeText={setTeamName}
								/>
								<TouchableOpacity
									style={styles.button}
									onPress={handleNextStep}
								>
									<Text style={styles.buttonText}>Next</Text>
								</TouchableOpacity>
							</>
						) : (
							<>
								<Text style={styles.sheetTitle}>
									Enter Team Details
								</Text>
								<TextInput
									style={styles.input}
									placeholder="Short Name"
									value={shortName}
									onChangeText={setShortName}
								/>
								<TouchableOpacity
									style={styles.imageButton}
									onPress={pickImage}
								>
									<Text style={styles.buttonText}>
										Select Team Logo
									</Text>
								</TouchableOpacity>
								{teamLogo && (
									<Image
										source={{ uri: teamLogo }}
										style={styles.previewImage}
									/>
								)}
								<TouchableOpacity
									style={[
										styles.button,
										uploadedLogoUrl ? null : styles.disabledButton,
									]}
									onPress={handleCreateTeam}
									disabled={!uploadedLogoUrl} // Disable button until image is uploaded
								>
									<Text style={styles.buttonText}>Create Team</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</BottomSheetModal>

				<PopUpModal
					isOpen={isEditTeamModalOpen}
					setIsOpen={setIsEditTeamModalOpen}
				>
					<View style={styles.popUpContainer}>
						<Text style={styles.label}>Edit Team</Text>

						<TextInput
							style={styles.input}
							placeholder="Team Name"
							value={selectedTeam?.name || ""}
							onChangeText={(text) =>
								setSelectedTeam({ ...selectedTeam, name: text })
							}
						/>

						<TextInput
							style={styles.input}
							placeholder="Short Name"
							value={selectedTeam?.short_name || ""}
							onChangeText={(text) =>
								setSelectedTeam({ ...selectedTeam, short_name: text })
							}
						/>

						<TouchableOpacity
							style={styles.saveButton}
							onPress={handleSaveTeamEdits}
						>
							<Text style={styles.saveButtonText}>Save Changes</Text>
						</TouchableOpacity>

						<Pressable
							style={styles.closeButton}
							onPress={closeEditTeamModal}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>
					</View>
				</PopUpModal>
				<PopUpModal
					isOpen={isTeamUsersModalOpen}
					setIsOpen={setIsTeamUsersModalOpen}
				>
					<View style={styles.popUpContainer}>
						<Text style={styles.title}>
							{filterType === "team" ? "Team Users" : "Invite Friends"}
						</Text>
						<TouchableOpacity
							onPress={toggleFilterType}
							style={styles.filterButton}
						>
							<Text style={styles.filterButtonText}>
								{filterType === "team"
									? "Invite Friends"
									: "Show Team Users"}
							</Text>
						</TouchableOpacity>

						<FlatList
							data={filterType === "team" ? teamUsers : friends}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<View style={styles.userContainer}>
									<Text style={styles.userText}>{item.name}</Text>
									{filterType === "team" ? (
										<Pressable
											onPress={() =>
												handleRemoveUserFromTeam(
													selectedTeam.id,
													item.id
												)
											}
										>
											<FontAwesome6
												name="trash"
												size={24}
												color="red"
											/>
										</Pressable>
									) : (
										<Pressable
											onPress={() => handleAddUserToTeam(item.id)}
										>
											<FontAwesome6
												name="plus"
												size={24}
												color="green"
											/>
										</Pressable>
									)}
								</View>
							)}
							ListEmptyComponent={
								<Text style={styles.noUsersText}>
									{filterType === "team"
										? "No users found in this team."
										: "No friends available to add."}
								</Text>
							}
						/>

						<Pressable
							style={styles.closeButton}
							onPress={() => setIsTeamUsersModalOpen(false)}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>
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
	toggleContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 10,
	},
	toggleButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginHorizontal: 5,
		backgroundColor: "#f0f0f0",
		borderColor: "black",
		borderWidth: 1,
	},
	toggleButtonText: {
		fontSize: 16,
		color: "#333",
		fontFamily: "InriaSans-Regular",
	},
	activeButton: {
		backgroundColor: "black",
	},
	activeButtonText: {
		color: "#fff",
		fontFamily: "InriaSans-Regular",
	},
	flatListContainer: {
		flex: 1,
	},
	teamContainer: {
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
		position: "relative",
	},
	teamText: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
		color: "#333",
	},
	teamDetails: {
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
		color: "#555",
		marginVertical: 5,
	},
	teamLogo: {
		width: 50,
		height: 50,
		marginTop: 10,
		alignSelf: "center",
	},
	iconContainer: {
		position: "absolute",
		top: 20,
		right: 10,
		flexDirection: "row",
	},
	icon: {
		marginHorizontal: 5,
	},
	emptyText: {
		color: "#999",
		textAlign: "center",
		marginTop: 10,
		fontFamily: "InriaSans-Regular",
	},
	// Bottom Sheet content for creating a new team
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
	previewImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginTop: 10,
		alignSelf: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	imageButton: {
		backgroundColor: "#FF8C00",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "center",
		marginBottom: 10,
	},
	disabledButton: {
		backgroundColor: "#ccc",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 10,
		textAlign: "center",
	},
	// PopUp Modal styling
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
	// User Container inside the PopUp Modal
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		width: "100%",
		paddingHorizontal: 10,
	},
	userText: {
		fontSize: 16,
		fontFamily: "InriaSans-Regular",
		color: "#333",
	},
	noUsersText: {
		fontSize: 18,
		color: "#999",
		fontFamily: "InriaSans-Regular",
		textAlign: "center",
		marginVertical: 20,
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
});

export default TeamsScreen;
