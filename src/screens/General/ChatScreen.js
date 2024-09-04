// React Imports
import React, {
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
} from "react";
import { View, Pressable, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import CustomBubbleChat from "../../components/CustomBubbleChat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// My headers
import HeaderChat from "../../components/headers/HeaderChat";

const ChatScreen = ({ route }) => {
	const navigation = useNavigation();
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

	const handleUserPress = () => {
		Alert.alert("User Pressed " + chat.username);
	};

	const renderAvatar = (props = {}) => {
		return (
			<Pressable onPress={handleUserPress}>
				<Image
					source={{ uri: chat.userPhoto }}
					style={styles.avatar}
					{...props}
				/>
			</Pressable>
		);
	};
	const renderBubble = (props = {}) => {
		return <CustomBubbleChat {...props} />;
	};
	const renderSend = (props = {}) => {
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

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => <HeaderChat userData={user} chatInfo={chat} />,
		});
	}, [navigation, user, chat]);

	return (
		<GiftedChat
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
