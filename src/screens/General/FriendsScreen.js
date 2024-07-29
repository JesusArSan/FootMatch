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
const requestFriendsList = [
	{
		id: 1,
		username: "ester_exposito",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 2,
		username: "danna_paola",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 3,
		username: "lana_rhoades",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 4,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 5,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 6,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 7,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 8,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 9,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 10,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 11,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 12,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 13,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 14,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
	{
		id: 15,
		username: "daniela_lopez",
		photo: "https://pbs.twimg.com/profile_images/1183371288934531073/LR2heIM4_400x400.jpg",
	},
];

const FriendsScreen = () => {
	// Safe Area
	const insets = useSafeAreaInsets();
	const screenHeight = Dimensions.get("window").height;

	// Header Height
	const headerHeight = 100;
	const availableHeight = screenHeight - insets.top - headerHeight;

	return (
		<SafeAreaView style={[styles.container, { paddingTop: insets.top + 10 }]}>
			<View
				style={[
					styles.friendRequestContainer,
					{ maxHeight: availableHeight * 0.37 },
				]}
			>
				<Text style={styles.title}>Friend Requests</Text>
				<FlatList
					data={requestFriendsList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <FriendRequest userData={item} />}
					contentContainerStyle={{ paddingBottom: 10 }}
					style={{ marginVertical: 10 }}
				/>
			</View>
			<DrawerDivider color={"black"} customWidth="100%" />
			<View
				style={[
					styles.friendsContainer,
					{ maxHeight: availableHeight * 0.81 },
				]}
			>
				<Text style={styles.title}>My Friends</Text>
				<FlatList
					data={requestFriendsList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <FriendFollower userData={item} />}
					contentContainerStyle={{ paddingBottom: 10 }}
					style={{ marginVertical: 10 }}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
	},
	friendRequestContainer: {
	},
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
