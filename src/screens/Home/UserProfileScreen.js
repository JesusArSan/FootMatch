// React Imports
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
	TextInput,
	Alert,
	ImageBackground,
	ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// My Utils
import {
	handleLogout,
	getFriendsList,
	sendFriendRequest,
	isFriend,
	updateUser,
	removeFriend,
	updateProfilePhoto,
	deleteFriendRequest,
	updateUserRole,
} from "../../utils/UserFunctions";
import { uploadImage } from "../../utils/UploadImage";
// My components
import CustomButton from "../../components/CustomButton";
import PopUpModal from "../../components/PopUpModal";
// Icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Function to truncate text
const truncate = (text, maxLength) => {
	// Avoid undefined text
	if (!text) {
		return "";
	}
	return text.length > maxLength
		? text.substring(0, maxLength - 3) + "..."
		: text;
};

const UserProfileScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	const { otherUser, userLogged } = route.params;
	let user = otherUser || userLogged;
	const isAdmin = userLogged.role_id === 1;

	// Request status
	const [requestStatus, setRequestStatus] = useState(user.requestStatus);
	const [isUserFriend, setIsFriend] = useState(user.friendStatus);
	const [typeStyle, setTypeStyle] = useState(
		requestStatus === "pending" ? 3 : 1
	);

	// FriendList to know the number and other future features
	const [friendList, setFriendList] = useState([]);
	// Get Friend list and update it on Friends data of user stats
	const fetchFriends = async () => {
		if (userLogged) {
			await getFriendsList(userLogged.id, setFriendList);
		} else {
			await getFriendsList(otherUser.id, setFriendList);
		}

		if (otherUser && userLogged) {
			setIsFriend(await isFriend(userLogged.id, otherUser.id));
		}
	};

	// Image picker state and function
	const [selectedImage, setSelectedImage] = useState(null);
	// Update username
	const [newUsername, setNewUsername] = useState("");

	// Image picker
	const pickImage = async () => {
		// Request permission to access the gallery
		let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (result.granted === false) {
			alert("You need access to the gallery to select an image.");
			return;
		}

		// Open the image picker
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!pickerResult.canceled) {
			setSelectedImage(pickerResult.assets[0].uri); // Save the selected image URI
		}
	};

	// Popup
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);

		// Reset the selected image
		setSelectedImage(null);
	};

	const handleSaveModal = async () => {
		let updatedData = {}; // Object to store updated fields

		// Check if username has been changed
		if (newUsername.trim()) {
			updatedData.username = newUsername;
		}

		// First, upload the image if a new one is selected
		if (selectedImage) {
			try {
				const newImageUrl = await uploadImage(selectedImage); // Upload the image
				await updateProfilePhoto(userLogged.id, newImageUrl); // Update the photo separately
				user.photo = newImageUrl; // Update local user photo URL
			} catch (error) {
				alert("Error uploading image");
				return;
			}
		}

		// Then, update user information if there are any changes
		if (Object.keys(updatedData).length > 0) {
			try {
				await updateUser(userLogged.id, updatedData); // Call `updateUser` for other user info

				// Update local user data if username changed
				if (updatedData.username) user.username = updatedData.username;

				alert("User updated successfully!");
			} catch (error) {
				alert("Error updating user.");
			}
		}

		handleCloseModal(); // Close the modal
	};

	// Focus effect
	useFocusEffect(
		React.useCallback(() => {
			fetchFriends();
		}, [])
	);

	useEffect(() => {
		if (isUserFriend === true) {
			setRequestStatus("accepted");
			setTypeStyle(4); // Verde para amigos confirmados
		} else if (requestStatus === "pending") {
			setTypeStyle(3); // Naranja para solicitudes pendientes
		} else {
			setTypeStyle(1); // Estilo predeterminado
		}
	}, [requestStatus, isUserFriend]);

	// Handle button press
	const handleButtonPress = async () => {
		if (requestStatus === "accepted") {
			console.log("Need to Delete friend request");
			// Delete friend
			await removeFriend(userLogged.id, otherUser.id);
			setIsFriend(false);
			setRequestStatus("none");
			setTypeStyle(4);
		} else if (requestStatus === "pending") {
			// Delete friend request
			await deleteFriendRequest(userLogged.id, otherUser.id);
			setRequestStatus("none");
			setTypeStyle(1);
		} else {
			// Send friend request
			await sendFriendRequest(userLogged.id, otherUser.id);
			setRequestStatus("pending");
			setTypeStyle(3);
		}
	};

	// Get the content of the button
	const getButtonContent = () => {
		if (isUserFriend) {
			return <AntDesign name="checkcircle" size={24} color="white" />;
		} else if (requestStatus === "pending") {
			return <MaterialIcons name="schedule-send" size={24} color="white" />;
		}
		return <Text style={styles.buttonText}>Be Friend</Text>;
	};

	// Modify user when the user is the logged user
	useEffect(() => {
		if (!otherUser) {
			navigation.setOptions({
				headerRight: () => (
					<TouchableOpacity
						style={styles.headerRightContainer}
						onPress={handleOpenModal}
					>
						<View style={{ marginRight: "8%" }}>
							<Feather name="edit" size={24} color="white" />
						</View>
					</TouchableOpacity>
				),
			});
		}
	}, [navigation, otherUser]);

	// State to manage the second pop-up visibility
	const [secondModalOpen, setSecondModalOpen] = useState(false);

	// Functions to handle opening and closing the second pop-up
	const handleOpenSecondModal = () => {
		setSecondModalOpen(true);
	};
	const handleCloseSecondModal = () => {
		setSecondModalOpen(false);
	};

	// State to manage selected role
	const [selectedRole, setSelectedRole] = useState("User"); // Default is "User"

	// Update selectedRole only when otherUser exists
	useEffect(() => {
		if (otherUser) {
			if (otherUser.role_id === 1) {
				setSelectedRole("Admin");
			} else if (otherUser.role_id === 2) {
				setSelectedRole("Moderator");
			} else {
				setSelectedRole("User");
			}
		}
	}, [otherUser]);

	// Handle role change
	const handleRoleChange = (role) => {
		setSelectedRole(role);
	};

	const handleSaveSecondModal = async () => {
		let updatedData = { role: selectedRole }; // Save selected role

		console.log("Updated data: ", updatedData);

		try {
			await updateUserRole(
				otherUser.id,
				selectedRole === "Admin" ? 1 : selectedRole === "Moderator" ? 2 : 3
			);

			alert("Role updated successfully!");
			handleCloseSecondModal(); // Close the modal after saving
		} catch (error) {
			alert("Error updating role.");
			console.error("Error updating role:", error);
		}
	};

	return (
		<View style={styles.container}>
			<PopUpModal isOpen={modalOpen} setIsOpen={setModalOpen}>
				<View style={styles.popUpContainer}>
					<View style={styles.formContainer}>
						<Text style={styles.label}>Change Username:</Text>
						<TextInput
							style={styles.input}
							placeholder="New username"
							value={newUsername}
							onChangeText={setNewUsername}
							autoCapitalize="none"
						/>

						<Text style={styles.label}>Change Profile Image:</Text>
						<TouchableOpacity
							style={styles.filePickerButton}
							onPress={pickImage}
						>
							<Text style={styles.filePickerButtonText}>
								Seleccionar Imagen
							</Text>
						</TouchableOpacity>
						{selectedImage && (
							<Image
								source={{ uri: selectedImage }}
								style={styles.previewImage}
							/>
						)}
					</View>

					<View style={styles.buttonBoxPopUp}>
						<Pressable
							style={styles.closeButton}
							onPress={handleCloseModal}
						>
							<Text style={styles.closeButtonText}>Cerrar</Text>
						</Pressable>

						<Pressable
							style={styles.saveButton}
							onPress={handleSaveModal}
						>
							<Text style={styles.saveButtonText}>Guardar</Text>
						</Pressable>
					</View>
				</View>
			</PopUpModal>

			<PopUpModal isOpen={secondModalOpen} setIsOpen={setSecondModalOpen}>
				<View style={styles.popUpContainer}>
					<Text style={styles.label}>Change User Role</Text>

					<View style={styles.dropdownContainer}>
						<TouchableOpacity onPress={() => handleRoleChange("Admin")}>
							<Text
								style={
									selectedRole === "Admin"
										? styles.selectedRole
										: styles.roleOption
								}
							>
								Admin
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleRoleChange("Moderator")}
						>
							<Text
								style={
									selectedRole === "Moderator"
										? styles.selectedRole
										: styles.roleOption
								}
							>
								Moderator
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleRoleChange("User")}>
							<Text
								style={
									selectedRole === "User"
										? styles.selectedRole
										: styles.roleOption
								}
							>
								User
							</Text>
						</TouchableOpacity>
					</View>

					{/* Button Box with Close and Save options */}
					<View style={styles.buttonBoxPopUp}>
						<Pressable
							style={styles.closeButton}
							onPress={handleCloseSecondModal}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>

						<Pressable
							style={styles.saveButton}
							onPress={handleSaveSecondModal}
						>
							<Text style={styles.saveButtonText}>Save</Text>
						</Pressable>
					</View>
				</View>
			</PopUpModal>

			<ImageBackground
				source={{
					uri:
						user.backImage ||
						"https://images.unsplash.com/photo-1543351611-58f69d7c1781?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D",
				}} // Back url image
				style={styles.backgroundImage}
			>
				{isAdmin && otherUser && (
					<View style={styles.boxButtonRol}>
						<TouchableOpacity
							style={styles.buttonRol}
							onPress={handleOpenSecondModal}
						>
							<FontAwesome name="exchange" size={24} color="black" />
							<Text>Role</Text>
						</TouchableOpacity>
					</View>
				)}
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					showsVerticalScrollIndicator={false}
				>
					<View
						style={[
							styles.profileContainer,
							userLogged && styles.loggedProfileContainer,
						]}
					>
						<View style={styles.imageContainer}>
							<Image
								source={{
									uri: user.photo || "https://via.placeholder.com/150",
								}}
								style={styles.profileImage}
							/>
						</View>
						<Text style={styles.name}>{truncate(user.name, 20)}</Text>
						<Text style={styles.username}>
							@{truncate(user.username, 15)}
						</Text>
						<View style={styles.statsContainer}>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{friendList.length}
								</Text>
								<Text style={styles.statLabel}>Friends</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{user.gamesWon || "0"}
								</Text>
								<Text style={styles.statLabel}>Games</Text>
							</View>
						</View>
						{otherUser && (
							<View style={styles.buttonContainer}>
								<CustomButton
									text={getButtonContent()}
									onPress={handleButtonPress}
									typeStyle={typeStyle}
									buttonWidth="45%"
									fontTam={17}
								/>
								<CustomButton
									text="Message"
									onPress={() => {}}
									typeStyle={1}
									buttonWidth="45%"
									fontTam={17}
								/>
							</View>
						)}
					</View>
					<View style={styles.characteristicsContainer}>
						<Text style={styles.characteristicsTitle}>
							Player Characteristics
						</Text>
						<View style={styles.characteristicsForm}>
							<View style={styles.characteristicItem}>
								<Text style={styles.characteristicLabel}>Level:</Text>
								<Text style={styles.characteristicValue}>35</Text>
							</View>
							<View style={styles.characteristicItem}>
								<Text style={styles.characteristicLabel}>
									Experience:
								</Text>
								<Text style={styles.characteristicValue}>1200 XP</Text>
							</View>
							<View style={styles.characteristicItem}>
								<Text style={styles.characteristicLabel}>
									Achievements:
								</Text>
								<Text style={styles.characteristicValue}>15</Text>
							</View>
							<View style={styles.characteristicItem}>
								<Text style={styles.characteristicLabel}>Ranking:</Text>
								<Text style={styles.characteristicValue}>Diamond</Text>
							</View>
						</View>
					</View>
				</ScrollView>
				{userLogged && !otherUser && (
					<TouchableOpacity
						style={styles.logoutButton}
						onPress={() => handleLogout(navigation, route)}
					>
						<Text style={styles.logoutText}>Log Out</Text>
					</TouchableOpacity>
				)}
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	scrollViewContent: {
		alignItems: "center",
		paddingVertical: 20,
	},
	profileContainer: {
		alignItems: "center",
		paddingTop: 80,
		paddingBottom: 20,
		backgroundColor: "rgba(250, 250, 250, 0.92)",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#ddd",
		width: "90%",
		position: "relative",
		marginTop: "20%",
	},
	loggedProfileContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.92)",
	},
	imageContainer: {
		position: "absolute",
		top: -60,
		alignItems: "center",
	},
	profileImage: {
		width: 130,
		height: 130,
		borderRadius: 70,
		borderWidth: 3,
		borderColor: "#fff",
	},
	name: {
		fontSize: 27,
		marginBottom: 5,
		marginTop: 10,
		fontFamily: "InriaSans-Bold",
	},
	username: {
		fontSize: 14,
		color: "gray",
		marginBottom: 5,
		fontFamily: "InriaSans-Regular",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginVertical: 20,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "InriaSans-Bold",
	},
	statLabel: {
		fontSize: 14,
		color: "gray",
		fontFamily: "InriaSans-Regular",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		height: 55,
		marginTop: 10,
	},
	characteristicsContainer: {
		alignItems: "center",
		padding: 20,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderRadius: 10,
		width: "90%",
		marginTop: "10%",
	},
	characteristicsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	characteristicsForm: {
		width: "100%",
	},
	characteristicItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	characteristicLabel: {
		fontSize: 16,
		color: "gray",
		fontWeight: "bold",
	},
	characteristicValue: {
		fontSize: 16,
		color: "black",
	},
	buttonText: {
		color: "white",
		fontFamily: "InriaSans-Bold",
	},
	logoutButton: {
		position: "absolute",
		top: 40,
		right: 20,
		backgroundColor: "#ff3b30",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	logoutText: {
		color: "#fff",
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
	},
	popUpContainer: {
		borderRadius: 20,
		maxHeight: "40%",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "#fafafa",
		padding: 20,
		width: "90%",
	},
	formContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginBottom: 20,
	},
	input: {
		height: 40,
		width: "100%",
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		fontFamily: "InriaSans-Regular",
	},
	label: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		marginBottom: 5,
		color: "#333",
		textAlign: "left",
		width: "100%",
	},
	buttonBoxPopUp: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		marginTop: 10,
	},
	closeButton: {
		width: 100,
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
	saveButton: {
		width: 100,
		backgroundColor: "#5cb85c",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	saveButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
	filePickerButton: {
		backgroundColor: "grey",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	filePickerButtonText: {
		color: "white",
		fontSize: 12,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
	previewImage: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginTop: 10,
		alignSelf: "left",
		borderWidth: 1,
		borderColor: "#ccc",
	},
	boxButtonRol: {
		width: "15%",
		height: "6%",
		justifyContent: "flex-start",
		alignItems: "center",
		alignSelf: "flex-end",
		margin: "2%",
		marginBottom: "-10%",
	},
	buttonRol: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	dropdownContainer: {
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 5,
		marginVertical: 10,
		width: "100%",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	roleOption: {
		fontSize: 16,
		color: "#333",
		paddingHorizontal: 5,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	selectedRole: {
		fontSize: 16,
		color: "#fff",
		paddingHorizontal: 5,
		paddingVertical: 12,
		backgroundColor: "#007BFF",
		fontWeight: "bold",
		borderRadius: 4,
	},
});

export default UserProfileScreen;
