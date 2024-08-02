import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
// My components
import BallonMsgAlert from "./icons/BalloonMsgAlert";

const MAX_MESSAGE_LENGTH = 40;

const ChatConver = ({ chat }) => {
	const handlePressUser = () => {
		console.log("Chat pressed: ", chat.id);
	};

	const truncateMessage = (message) => {
		if (message.length > MAX_MESSAGE_LENGTH) {
			return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
		}
		return message;
	};

	return (
		<Pressable style={styles.chatContainer} onPress={handlePressUser}>
			<View style={styles.userPhoto}>
				<Image
					style={styles.userPhotoImage}
					source={{ uri: chat.userPhoto }}
				/>
			</View>
			<View style={styles.chatInfo}>
				<Text style={styles.chatUser}>{chat.username}</Text>
				<Text style={styles.message}>
					{truncateMessage(chat.lastMessage)}
				</Text>
			</View>
			<View style={styles.messagesInfo}>
				<Text style={chat.unreadCount > 0 ? styles.timeBold : styles.time}>
					{chat.lastMessageTime}
				</Text>
				<BallonMsgAlert
					unreadCount={chat.unreadCount}
					style={styles.msgAlert}
				/>
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
		width: 235,
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
