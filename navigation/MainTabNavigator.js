// React Imports
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screen Imports
import MainHomeScreen from "../screens/home/MainHomeScreen";
import UserProfileScreen from "../screens/home/UserProfileScreen";
import NotificationsScreen from "../screens/home/NotificationsScreen";
import CommunityScreen from "../screens/home/CommunityScreen";
// My Componentes
import TabBarIconType from "../components/TabBarIconType";
import HeaderTabTitle from "../components/HeaderTabTitle";

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
				headerTitle: () => <HeaderTabTitle />,
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
			/>
			<Tab.Screen name="Community" component={CommunityScreen} />
			<Tab.Screen name="Notifications" component={NotificationsScreen} />
			<Tab.Screen
				name="Profile"
				component={UserProfileScreen}
				initialParams={{ user: userData }}
			/>
		</Tab.Navigator>
	);
};

export default MainTabNavigator;
