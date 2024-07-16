// React Imports
import React from "react";
import { View, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
// My Sreens
import MainTabNavigator from "./MainTabNavigator";
import ReservationsScreen from "../screens/General/ReservationsScreen";
import FriendsScreen from "../screens/General/FriendsScreen";
import TeamsScreen from "../screens/General/TeamsScreen";
import StatisticsScreen from "../screens/General/StatisticsScreen";
import SettingsScreen from "../screens/General/SettingsScreen";
import AboutScreen from "../screens/General/AboutScreen";
import SupportScreen from "../screens/General/SupportScreen";
// My icons
import AppIcon from "../components/icons/AppIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// My components
import DrawerDivider from "../components/DrawerDivider";

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
	<DrawerContentScrollView {...props}>
		<View style={styles.logoContainer}>
			<View style={styles.logoApp}>
				<AppIcon customHeight={45} customWidth={28} />
			</View>
			<Text style={styles.textTitle}>OOTMATCH</Text>
		</View>
		<DrawerDivider />
		<DrawerItemList {...props} />
		<DrawerDivider />
		<View style={styles.darkIcon}>
			<TouchableOpacity
				onPress={() => {
					Alert.alert("Information", "Dark Mode in development");
				}}
			>
				<MaterialIcons name="dark-mode" size={40} color="white" />
			</TouchableOpacity>
		</View>
	</DrawerContentScrollView>
);

const DrawerNavigator = ({ userData }) => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: styles.drawerLabelStyle,
				drawerStyle: styles.drawerContainer,
				drawerActiveTintColor: "#ffffff",
				drawerInactiveTintColor: "#ffffff",
				drawerItemStyle: { paddingLeft: 8 },
			}}
		>
			<Drawer.Screen
				name="Tabs"
				component={MainTabNavigator}
				initialParams={{ user: userData }}
				options={{
					drawerItemStyle: { display: "none" },
				}}
			/>
			<Drawer.Screen
				name="My Reservations"
				component={ReservationsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<MaterialIcons name="date-range" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="My Friends"
				component={FriendsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<FontAwesome5 name="user-friends" size={24} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="My Teams"
				component={TeamsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="microsoft-teams"
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="My Statistics"
				component={StatisticsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<Ionicons name="stats-chart" size={30} color={color} />
					),
				}}
			/>

			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					drawerIcon: ({ color }) => (
						<Ionicons name="settings-sharp" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="About"
				component={AboutScreen}
				options={{
					drawerIcon: ({ color }) => (
						<AntDesign name="exclamationcircle" size={30} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Support"
				component={SupportScreen}
				options={{
					drawerIcon: ({ color }) => (
						<FontAwesome name="support" size={30} color={color} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

const styles = StyleSheet.create({
	drawerContainer: {
		backgroundColor: "#1E417F",
	},
	drawerLabelStyle: {
		fontSize: 15,
		fontFamily: "InriaSans-Bold",
		color: "#ffffff",
		marginLeft: -15,
	},
	logoContainer: {
		flexDirection: "row",
		marginTop: 8,
		paddingLeft: 27,
		paddingBottom: 13,
		height: 60,
	},
	logoApp: {
		width: 28,
		height: 45,
	},
	textTitle: {
		fontSize: 30,
		fontFamily: "InriaSans-Bold",
		color: "#ffffff",
		alignSelf: "flex-end",
		height: 32,
	},
	darkIcon: {
		alignSelf: "flex-start",
		marginLeft: 24,
		marginTop: "95%",
		marginBottom: 0,
	},
});

// Name file: DrawerNavigator.js
