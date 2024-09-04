// React imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import Screens
import BookFieldScreen from "../screens/General/BookFieldScreen";
import CenterDetailsScreen from "../screens/General/CenterDetailsScreen";
import PitchTimeScreen from "../screens/General/PitchTimeScreen";
// Navigator
import MatchTabNavigator from "./MatchTabNavigator";
// My Components
import HeaderTitleScreen from "../components/headers/HeaderTitleScreen";

// Create the Stack Navigator
const BookStack = createStackNavigator();

const BookingStackNavigator = ({ route }) => {
	const userData = route.params.user || {};
	const routeName = route.params.routeName || "BookFieldScreen";
	const userLocation = route.params.userLocation || {};
	let center = [];

	if (routeName === "CenterDetailsScreen") {
		center = route.params.centerInfo || {};
	}

	return (
		<BookStack.Navigator initialRouteName={routeName}>
			<BookStack.Screen
				name="BookFieldScreen"
				component={BookFieldScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Book a Field"} />
					),
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/>
			<BookStack.Screen
				name="CenterDetailsScreen"
				component={CenterDetailsScreen}
				initialParams={{
					userData: userData,
					centerInfo: center,
					userLocation: userLocation,
				}}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Center Details"} />
					),
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/>
			<BookStack.Screen
				name="PitchTimeScreen"
				component={PitchTimeScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Book a Field"} />
					),
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/>
			{/* MatchTabNavigator must be on app.js */}
			{/* <BookStack.Screen
				name="MatchTabNavigator"
				component={MatchTabNavigator}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Match"} />
					),
					headerStyle: {
						backgroundColor: "#3562A6",
					},
					headerTintColor: "white",
				}}
			/> */}
		</BookStack.Navigator>
	);
};

export default BookingStackNavigator;
