// React Imports
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// My imports
import DrawerDivider from "../../components/DrawerDivider";
import FriendRequest from "../../components/FriendRequest";
import FriendFollower from "../../components/FriendFollower";
// Dummy data
import requestFriendsList from "../../assets/data/friends.json";

const FriendsScreen = () => {
	// Safe Area
	const insets = useSafeAreaInsets();
	const screenHeight = Dimensions.get("window").height;

	// Header Height
	const headerHeight = 100;
	const availableHeight = screenHeight - insets.top - headerHeight;

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
			{requestFriendsList.length === 0 ? null : (
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
						data={requestFriendsList}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <FriendRequest userData={item} />}
						contentContainerStyle={{ paddingBottom: 10 }}
						style={{ marginVertical: 10 }}
					/>
					<DrawerDivider color={"black"} customWidth="100%" />
				</View>
			)}
			{requestFriendsList.length === 0 ? (
				<View>
					<Text style={styles.text}>You have no friends yet.</Text>
				</View>
			) : (
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
						data={requestFriendsList}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <FriendFollower userData={item} />}
						contentContainerStyle={{ paddingBottom: 10 }}
						style={{ marginVertical: 10 }}
					/>
				</View>
			)}
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
		fontSize: 18,
	},
});

export default FriendsScreen;
