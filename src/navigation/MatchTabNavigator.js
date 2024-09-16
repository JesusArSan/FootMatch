// React imports
import React, { useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import MatchMainScreen from "../screens/General/MatchMainScreen";
import MatchUsersScreen from "../screens/General/MatchUsersScreen";
import MatchConfigScreen from "../screens/General/MatchConfigScreen";
// My Components
import TabBarIconType from "../components/TabBarIconType";

// Tab Navigator
const TabNav = createBottomTabNavigator();

const MatchTabNavigator = ({ route }) => {
	// User creator match data for permissions
	const userIsCreator = route.params.reservation.user_id === route.params.user.id;

	return (
		<TabNav.Navigator
			initialRouteName="MatchMainScreen"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarLabelStyle: { display: "none" },
				tabBarStyle: styles.tabBarStyle,
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "#FFFFFF",
				tabBarIcon: ({ color, focused }) => (
					<View
						style={[
							styles.iconContainer,
							focused && styles.iconContainerFocused,
						]}
					>
						<TabBarIconType name={route.name} color={color} />
					</View>
				),
			})}
		>
			<TabNav.Screen
				name="MatchMainScreen"
				component={MatchMainScreen}
				initialParams={{ ...route.params, userIsCreator }}
			></TabNav.Screen>
			<TabNav.Screen
				name="MatchUsersScreen"
				component={MatchUsersScreen}
				initialParams={{ ...route.params, userIsCreator }}
			></TabNav.Screen>
			<TabNav.Screen
				name="MatchConfigScreen"
				component={MatchConfigScreen}
				initialParams={{ ...route.params, userIsCreator }}
			></TabNav.Screen>
		</TabNav.Navigator>
	);
};

export default MatchTabNavigator;

const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: "#3562A6",
		borderRadius: 35,
		height: 50,
		width: "70%",
		justifyContent: "center",
		alignContent: "center",
		elevation: 10,
		paddingHorizontal: 5,
		paddingTop: 5,
		paddingBottom: 5,
		position: "absolute",
		top: "8%",
		left: "15%",
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 28,
		paddingRight: 28,
		height: 40,
		borderRadius: 25,
	},
	iconContainerFocused: {
		backgroundColor: "#4A84DC", // Background color when active
	},
});
