// React Imports
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	FlatList,
	Alert,
	Pressable,
} from "react-native";
// My components
import UserMatchItem from "../../components/UserMatchItem";
import FloatButton from "../../components/FloatButton";
import AddFriendButton from "../../components/AddFriendButton";
import PopUpModal from "../../components/PopUpModal"; // PopUpModal
// Dummy data
import Friends from "../../assets/data/friends.json";

const MatchUsersScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};
	const [users, setUsers] = useState(Friends); // Dummy data

	// useState
	const [modalOpen, setModalOpen] = useState(false);

	console.log("UserData en MatchUsersScreen", user.id);

	const handleRemoveUser = (userId) => {
		// Function to remove user from the list
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleRoomChat = () => {
		// Function to handle room chat
		Alert.alert("Room Chat", "Coming soon...");
	};

	const handleAddFriendPress = () => {
		// Abre el modal para agregar un amigo
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		// Cierra el modal
		setModalOpen(false);
	};

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<View style={styles.mainContainer}>
				<View style={styles.addFriendContainer}>
					<AddFriendButton onPress={handleAddFriendPress} />
				</View>
				<View>
					<PopUpModal isOpen={modalOpen} setIsOpen={setModalOpen}>
						<View style={styles.popUpAddFriend}>
							<Text>Lista de amigos</Text>
							{/* Flat List with my Frinds */}
							<FlatList
								data={users}
								renderItem={({ item }) => <Text>{item.username}</Text>}
								keyExtractor={(item) => item.id.toString()}
								showsVerticalScrollIndicator={false}
								style={{ marginHorizontal: 30 }}
							/>
							<Pressable
								style={styles.closeButton}
								onPress={handleCloseModal}
							>
								<Text style={styles.closeButtonText}>Close</Text>
							</Pressable>
						</View>
					</PopUpModal>
				</View>
				<FlatList
					data={users}
					renderItem={({ item }) => (
						<UserMatchItem user={item} onRemove={handleRemoveUser} />
					)}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					style={{ marginHorizontal: 30 }}
				/>
				<FloatButton title="Room Chat" onPress={handleRoomChat} />
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingTop: "26%",
		paddingBottom: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "rgba(250, 250, 250, 0.8)",
		marginTop: 30,
		marginHorizontal: 20,
	},
	title: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
		marginBottom: 10,
	},
	addFriendContainer: {
		alignSelf: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	popUpAddFriend: {
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "white",
	},
	closeButton: {
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginHorizontal: 10, // Space between buttons
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
});

export default MatchUsersScreen;
