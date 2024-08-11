// React imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import Screens
import BookFieldScreen from "../screens/General/BookFieldScreen";
import FieldDetailsScreen from "../screens/General/FieldDetailsScreen";
import PitchTimeScreen from "../screens/General/PitchTimeScreen";
// Navigator
import MatchTabNavigator from "./MatchTabNavigator";
// My Components
import HeaderTitleScreen from "../components/headers/HeaderTitleScreen";

// Create the Stack Navigator
const BookStack = createStackNavigator();

const BookingStachNavigator = ({ route }) => {
	const userData = route.params.user || {};

	return (
		<BookStack.Navigator initialRouteName="BookFieldScreen">
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
				name="FieldDetailsScreen"
				component={FieldDetailsScreen}
				initialParams={{ user: userData }}
				options={{
					headerTitle: (props) => (
						<HeaderTitleScreen {...props} text={"Field Details"} />
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
			<BookStack.Screen
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
			/>
		</BookStack.Navigator>
	);
};

export default BookingStachNavigator;
