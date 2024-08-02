import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
// My components
import ChatConver from "../../components/ChatConver";
// Dummy data
import chats1 from "../../assets/data/chats";

const ConversationsScreen = ({ chats }) => {
	const chatsDummy = chats1;

	const getFullDate = (timeString) => {
		const now = new Date();
		let date;

		if (timeString === "yesterday") {
			date = new Date(now.setDate(now.getDate() - 1)); // Yesterday
		} else {
			// Asume que el horario es para el día actual
			const [hours, minutes] = timeString.split(":").map(Number);
			date = new Date(now.setHours(hours, minutes, 0, 0));
		}

		return date;
	};

	// Ordenar chats por lastMessageTime en orden descendente
	const sortedChats = [...chatsDummy].sort((a, b) => {
		const dateA = getFullDate(a.lastMessageTime).getTime();
		const dateB = getFullDate(b.lastMessageTime).getTime();
		return dateB - dateA;
	});

	return (
		<SafeAreaView>
			<FlatList
				data={sortedChats}
				renderItem={({ item }) => <ChatConver chat={item} />}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default ConversationsScreen;

// Name file: components/ConversationsScreen.js
