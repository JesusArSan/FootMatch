// React Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screen Imports
import MainHomeScreen from "../screens/Home/MainHomeScreen";
import UserProfileScreen from "../screens/Home/UserProfileScreen";
import NotificationsScreen from "../screens/Home/NotificationsScreen";
import CommunityScreen from "../screens/Home/CommunityScreen";
import ConversationsScreen from "../screens/General/ConversationsScreen";
// My Componentes
import TabBarIconType from "../components/TabBarIconType";
import HeaderConversations from "../components/headers/HeaderConversations";
import HeaderCustom from "../components/headers/HeaderCustom";

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ route }) => {
	// Get the user data from the params
	const userData = route.params.user || {};

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				// Header personalized
				headerShown: true,
				headerStyle: {
					backgroundColor: "#3562A6",
				},
				// Background color of the tab and height
				tabBarStyle: {
					backgroundColor: "#3562A6",
					height: 65,
				},
				// Padding of the item tab
				tabBarItemStyle: { paddingVertical: 6 },
				// Font weight of the item tab's text
				tabBarLabelStyle: {
					fontFamily: "InriaSans-Bold",
				},
				// Color of the icon's text of the active tab
				tabBarActiveTintColor: "white",
				// Color of the icon's text of the inactive tab
				tabBarInactiveTintColor: "#D6D6D6",
				// Each tab has a different icon
				tabBarIcon: ({ color }) => (
					<TabBarIconType name={route.name} color={color} />
				),
			})}
		>
			<Tab.Screen
				name="Home"
				component={MainHomeScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderCustom
							{...props}
							type={""}
							screenRedirectedTo={"ConversationsScreen"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Community"
				component={CommunityScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderCustom {...props} type={"community"} />
					),
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderCustom {...props} type={"notifications"} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={UserProfileScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderCustom {...props} type={"profile"} />
					),
				}}
			/>
			<Tab.Screen
				name="ConversationsScreen"
				component={ConversationsScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderConversations {...props} text={"Chats"} />
					),
					tabBarButton: () => null,
				}}
			/>
		</Tab.Navigator>
	);
};

export default MainTabNavigator;
