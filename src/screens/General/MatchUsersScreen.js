// React Imports
import React, { useEffect, useState } from "react";
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
import PopUpModal from "../../components/PopUpModal";
import FriendInvitation from "../../components/FriendInvitation";
// User Functions
import { getFriendsList } from "../../utils/UserFunctions";

const MatchUsersScreen = ({ route }) => {
	const user = route.params.user || {};
	const [users, setFriendList] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const handleRemoveUser = (userId) => {
		setUsers(users.filter((user) => user.id !== userId));
	};

	const handleRoomChat = () => {
		Alert.alert("Room Chat", "Coming soon...");
	};

	const handleAddFriendPress = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	// Update the friends list
	const updateFriendsList = async () => {
		await getFriendsList(user.id, setFriendList);
	};
	// Update the friends list on component mount
	useEffect(() => {
		updateFriendsList();
	},[]);

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<View style={styles.mainContainer}>
				<View style={styles.addFriendContainer}>
					<AddFriendButton onPress={handleAddFriendPress} />
				</View>
				<PopUpModal isOpen={modalOpen} setIsOpen={setModalOpen}>
					<View style={styles.popUpAddFriend}>
						<Text style={styles.title}>Friend List</Text>
						<View style={styles.friendInvitationContainer}>
							{users.length > 0 ? (
								<FlatList
									data={users}
									renderItem={({ item }) => (
										<View style={styles.gridItem}>
											<FriendInvitation friend={item} />
										</View>
									)}
									keyExtractor={(item) => item.id.toString()}
									showsVerticalScrollIndicator={false}
									numColumns={2}
									columnWrapperStyle={styles.row}
								/>
							) : (
								<Text style={styles.noFriendsText}>
									No friends found
								</Text>
							)}
						</View>
						<Pressable
							style={styles.closeButton}
							onPress={handleCloseModal}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>
					</View>
				</PopUpModal>
				<FlatList
					data={users}
					renderItem={({ item }) => (
						<UserMatchItem user={item} onRemove={handleRemoveUser} />
					)}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: "30%" }}
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
		fontSize: 22,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
		marginVertical: 10,
	},
	addFriendContainer: {
		alignSelf: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	popUpAddFriend: {
		flex: 1,
		borderRadius: 20,
		maxHeight: "50%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fafafa",
	},
	friendInvitationContainer: {
		width: "95%",
		height: "70%",
	},
	gridItem: {
		margin: 3,
		flexBasis: "48%",
	},
	row: {
		justifyContent: "space-between",
	},
	noFriendsText: {
		fontSize: 18,
		fontFamily: "InriaSans-Bold",
		color: "red",
		textAlign: "center",
		marginTop: 20,
	},
	closeButton: {
		backgroundColor: "#D9534F",
		paddingVertical: 10,
		paddingHorizontal: 30,
		width: "30%",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginTop: 10,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
});

export default MatchUsersScreen;