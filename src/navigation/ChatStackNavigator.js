// React imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import Screens
import ChatScreen from "../screens/General/ChatScreen";
import ConversationsScreen from "../screens/General/ConversationsScreen";
// My Components
import HeaderConversations from "../components/headers/HeaderConversations";

// Create the Stack Navigator
const ChatStack = createStackNavigator();

const ChatStackNavigator = ({ route }) => {
	const userData = route.params.user || {};

	return (
		<ChatStack.Navigator>
			<ChatStack.Screen
				name="Conversations"
				component={ConversationsScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderConversations {...props} text={"Chats"} />
					),
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/>
			<ChatStack.Screen
				name="ChatScreen"
				component={ChatScreen}
				initialParams={{ user: userData }}
				options={{
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/>
		</ChatStack.Navigator>
	);
};

export default ChatStackNavigator;
