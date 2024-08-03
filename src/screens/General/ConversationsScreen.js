import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
// My components
import ChatConver from "../../components/ChatConver";
// Dummy data
import chats1 from "../../assets/data/chats";

const ConversationsScreen = ({ route }) => {
	// Retrieve user and chat details from navigation route
	const user = route.params.user;
	const chats = route.params.chatInfo;

	console.log("User: ", user);
	console.log("Chat: ", chats);

	// Convert ISO 8601 string to a Date object
	const getFullDate = (isoTimeString) => {
		return new Date(isoTimeString);
	};

	// Sort chats based on the timestamp of the last message in each chat
	const sortedChats = chats1.sort((a, b) => {
		const lastMessageTimeA = a.messages[a.messages.length - 1].time;
		const lastMessageTimeB = b.messages[b.messages.length - 1].time;

		const dateA = getFullDate(lastMessageTimeA).getTime();
		const dateB = getFullDate(lastMessageTimeB).getTime();
		return dateB - dateA;
	});

	return (
		<SafeAreaView>
			<FlatList
				data={sortedChats}
				renderItem={({ item }) => <ChatConver chat={item} />}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	);
};

export default ConversationsScreen;

// Name file: components/ConversationsScreen.js
