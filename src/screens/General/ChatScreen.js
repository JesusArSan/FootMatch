// React Imports
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import CustomBubbleChat from "../../components/CustomBubbleChat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// My headers
import HeaderCustom from "../../components/headers/HeaderCustom";

const ChatScreen = ({ route }) => {
	const user = route.params.user;
	const chat = route.params.chatInfo;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const formattedMessages = chat.messages.map((msg, index) => {
			let messageDate = new Date(msg.time);
			return {
				_id: index + 1,
				text: msg.content,
				createdAt: messageDate,
				user: {
					_id: msg.senderId === "other" ? 2 : 1,
					name: msg.senderId === "other" ? "Other Person" : user.username,
				},
			};
		});
		setMessages(formattedMessages.reverse());
	}, [chat, user]);

	const onSend = useCallback((newMessages = []) => {
		const messagesWithDate = newMessages.map((msg) => ({
			...msg,
			createdAt: new Date(),
		}));
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messagesWithDate)
		);
	}, []);

	const renderAvatar = (props) => {
		return <Image source={{ uri: chat.userPhoto }} style={styles.avatar} />;
	};
	const renderBubble = (props) => {
		return <CustomBubbleChat {...props} />;
	};
	const renderSend = (props) => {
		return (
			<Send
				{...props}
				containerStyle={{
					alignSelf: "flex-end",
					marginRight: 10,
               marginBottom: 5,
				}}
			>
				<View>
					<MaterialCommunityIcons
						name="send-circle"
						size={43}
						color="#0084ff"
						style={{}}
					/>
				</View>
			</Send>
		);
	};

	const renderFooter = () => {
		return <View style={{ height: 10 }} />;
	};

	return (
		<GiftedChat
			plat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: 1,
			}}
			renderAvatar={renderAvatar}
			renderBubble={renderBubble}
			renderSend={renderSend}
			minComposerHeight={50}
			maxComposerHeight={75}
			renderChatFooter={renderFooter}
			renderAvatarOnTop
			alwaysShowSend
		/>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 20,
	},
});
