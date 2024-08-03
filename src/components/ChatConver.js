// React imports
import * as React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Date-time functions
import {
	isBefore,
	isAfter,
	format,
	startOfDay,
	endOfDay,
	subDays,
} from "date-fns";
// My components
import BallonMsgAlert from "./icons/BalloonMsgAlert";

const MAX_MESSAGE_LENGTH = 32;

const ChatConver = ({ chat }) => {
	const navigation = useNavigation();

	// Navigate to ChatScreen with current chat info
	const handlePressUserChat = () => {
		console.log("Chat pressed: ", chat.id);
		navigation.navigate("ChatScreen", { chatInfo: chat });
	};

	// Truncate message if it exceeds the maximum length
	const truncateMessage = (message) => {
		if (typeof message !== "string") {
			console.error("Provided message is not a string:", message);
			return "";
		}
		if (message.length > MAX_MESSAGE_LENGTH) {
			return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
		}
		return message;
	};

	// Format date based on whether it's today, yesterday, or another date. Europe/Madrid timezone
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const today = new Date();
		const yesterday = subDays(startOfDay(today), 1);

		if (
			isBefore(date, endOfDay(today)) &&
			isAfter(date, endOfDay(yesterday))
		) {
			return format(date, "HH:mm");
		} else if (
			isBefore(date, endOfDay(yesterday)) &&
			isAfter(date, endOfDay(subDays(yesterday, 1)))
		) {
			return "Yesterday";
		} else {
			return format(date, "dd/MM/yyyy");
		}
	};

	const lastMessage = chat.messages[chat.messages.length - 1].content;
	const lastMessageTime = formatDate(
		chat.messages[chat.messages.length - 1].time
	);

	return (
		<Pressable style={styles.chatContainer} onPress={handlePressUserChat}>
			<Image
				style={styles.userPhotoImage}
				source={{ uri: chat.userPhoto }}
			/>
			<View style={styles.chatInfo}>
				<Text style={styles.chatUser}>{chat.username}</Text>
				<Text style={styles.message}>{truncateMessage(lastMessage)}</Text>
			</View>
			<View style={styles.messagesInfo}>
				<Text style={chat.unreadCount > 0 ? styles.timeBold : styles.time}>
					{lastMessageTime}
				</Text>
				{chat.unreadCount > 0 && (
					<BallonMsgAlert
						unreadCount={chat.unreadCount}
						style={styles.msgAlert}
					/>
				)}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	chatContainer: {
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		height: 75,
		borderBottomWidth: 1,
		borderBottomColor: "#CFCFCF",
	},
	userPhotoImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		resizeMode: "cover",
	},
	chatInfo: {
		width: 220,
		marginHorizontal: 10,
	},
	chatUser: {
		fontSize: 15,
		fontFamily: "InriaSans-Bold",
	},
	message: {
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
		color: "#666",
	},
	messagesInfo: {
		marginLeft: "auto",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	time: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
		color: "#888",
	},
	timeBold: {
		fontSize: 13,
		color: "#0E1E5B",
		fontFamily: "InriaSans-Bold",
	},
});

export default ChatConver;

// Name file: components/ChatConver.js
