import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Dimensions,
	RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// My imports
import DrawerDivider from "../../components/DrawerDivider";
import FriendRequest from "../../components/FriendRequest";
import FriendFollower from "../../components/FriendFollower";
import {
	getFriendsList,
	getFriendsRequests,
} from "../../utils/UserFunctions.js";
// Icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const FriendsScreen = ({ route }) => {
	// User Data
	const user = route.params.user;

	// Friends
	const [friendList, setFriendList] = useState([]);
	// Friend Requests
	const [friendsRequests, setFriendsRequests] = useState([]);
	// Refreshing state
	const [refreshing, setRefreshing] = useState(false);

	// Safe Area
	const insets = useSafeAreaInsets();
	const screenHeight = Dimensions.get("window").height;

	// Header Height
	const headerHeight = 100;
	const availableHeight = screenHeight - insets.top - headerHeight;

	// Get Friends List and FriendRequests
	const updateFriendsData = async () => {
		setRefreshing(true);
		await getFriendsList(user.id, setFriendList);
		await getFriendsRequests(user.id, setFriendsRequests);
		setRefreshing(false);
	};

	useEffect(() => {
		updateFriendsData();
	}, []);

	const renderContent = () => {
		if (friendsRequests.length === 0 && friendList.length === 0) {
			return (
				<View style={styles.emptyContainer}>
					<FontAwesome6
						name="user-large-slash"
						size={80}
						color="black"
						style={{ alignSelf: "center", marginBottom: "8%" }}
					/>
					<Text style={styles.text}>You have no friends yet.</Text>
				</View>
			);
		}

		return (
			<View>
				{friendsRequests.length > 0 && (
					<View
						style={[
							styles.friendRequestContainer,
							{ maxHeight: availableHeight * 0.388 },
						]}
					>
						<Text style={styles.title}>Friend Requests</Text>
						<FlatList
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							data={friendsRequests}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<FriendRequest
									requestData={item}
									updateFriendsData={updateFriendsData}
									userLogged={user}
								/>
							)}
							contentContainerStyle={{ paddingBottom: 10 }}
							style={{ marginVertical: 10 }}
						/>
						<DrawerDivider color={"black"} customWidth="100%" />
					</View>
				)}
				{friendList.length > 0 && (
					<View
						style={[
							styles.friendsContainer,
							{ maxHeight: availableHeight * 0.81 },
						]}
					>
						<Text style={styles.title}>My Friends</Text>
						<FlatList
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							data={friendList}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<FriendFollower userData={item} userLogged={user} />
							)}
							contentContainerStyle={{ paddingBottom: 10 }}
							style={{ marginVertical: 10 }}
						/>
					</View>
				)}
			</View>
		);
	};

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
			<FlatList
				data={[]} // Use an empty array to enable the FlatList
				renderItem={null} // No rendering needed for the list itself
				ListHeaderComponent={renderContent} // Render your content within ListHeaderComponent
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={updateFriendsData}
					/>
				}
				contentContainerStyle={{ flexGrow: 1 }} // Ensure it takes the full height
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	friendRequestContainer: {},
	friendsContainer: {
		marginTop: 10,
	},
	title: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
	},
	text: {
		fontSize: 25,
		fontFamily: "InriaSans-Bold",
	},
	emptyContainer: {
		alignSelf: "center",
		marginTop: "8%",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
});

export default FriendsScreen;
