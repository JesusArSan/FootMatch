// React Imports
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// My Utils
import {
	handleLogout,
	sendFriendRequest,
	deleteFriendRequest,
} from "../../utils/UserFunctions";
// My components
import CustomButton from "../../components/CustomButton";
// Icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
	const { otherUser, userLogged } = route.params;
	const user = otherUser || userLogged;

	// Request status
	const [requestStatus, setRequestStatus] = useState(user.requestStatus);
	const [typeStyle, setTypeStyle] = useState(
		requestStatus === "pending" ? 3 : 1
	);

	// Handle button press
	const handleButtonPress = async () => {
		if (requestStatus === "pending") {
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
		if (requestStatus === "pending") {
			return <MaterialIcons name="schedule-send" size={24} color="white" />;
		}
		return <Text style={styles.buttonText}>Be Friend</Text>;
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{
					uri:
						user.backImage ||
						"https://images.unsplash.com/photo-1543351611-58f69d7c1781?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D",
				}} // Back url image
				style={styles.backgroundImage}
			>
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
									{user.friends || "0"}
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
});

export default UserProfileScreen;
