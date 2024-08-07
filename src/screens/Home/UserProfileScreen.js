// React Imports
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// My Utils
import { handleLogout } from "../../utils/UserFunctions";
// My components
import CustomButton from "../../components/CustomButton";

// Function to truncate text
const truncate = (text, maxLength) => {
	return text.length > maxLength
		? text.substring(0, maxLength - 3) + "..."
		: text;
};

const UserProfileScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	const user = route.params.user || {};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{
					uri:
						user.backImage ||
						"https://images.unsplash.com/photo-1543351611-58f69d7c1781?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D",
				}} // URL de la imagen de fondo
				style={styles.backgroundImage}
			>
				<View style={styles.profileContainer}>
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
					<Text style={styles.designation}>{user.designation}</Text>
					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{user.follow || "0"}</Text>
							<Text style={styles.statLabel}>Follow</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{user.likes || "0"}</Text>
							<Text style={styles.statLabel}>Likes</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>
								{user.friends || "0"}
							</Text>
							<Text style={styles.statLabel}>Friends</Text>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<CustomButton
							text="Add Friend"
							onPress={() => {}}
							typeStyle="1"
							buttonWidth="45%"
						/>
						<CustomButton
							text="Message"
							onPress={() => {}}
							typeStyle="1"
							buttonWidth="45%"
						/>
					</View>
				</View>
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={() => handleLogout(navigation, route)}
				>
					<Text style={styles.logoutText}>Log Out</Text>
				</TouchableOpacity>
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
	designation: {
		fontSize: 16,
		color: "gray",
		marginBottom: 20,
		fontFamily: "InriaSans-Regular",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
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
		marginTop: 10,
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
});

export default UserProfileScreen;
