// React imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import Screens
import ChatScreen from "../screens/General/ChatScreen";
import ConversationsScreen from "../screens/General/ConversationsScreen";
// My Components
import HeaderTitleScreen from "../components/headers/HeaderTitleScreen";

// Create the Stack Navigator
const ChatStack = createStackNavigator();

const ChatStackNavigator = ({ route }) => {
	const userData = route.params.user || {};

	console.log("userData: ", userData);

	return (
		<ChatStack.Navigator>
			<ChatStack.Screen
				name="Conversations"
				component={ConversationsScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Chats"} />
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
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Chat"} />
					),
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
