// React imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import Screens
import BookFieldScreen from "../screens/General/BookFieldScreen";
import FieldDetailsScreen from "../screens/General/FieldDetailsScreen";
import PitchTimeScreen from "../screens/General/PitchTimeScreen";
import MatchScreen from "../screens/General/MatchScreen";
// My Components
import HeaderTitleScreen from "../components/headers/HeaderTitleScreen";

// Create the Stack Navigator
const BookStack = createStackNavigator();

const BookingStachNavigator = ({ route }) => {
	const userData = route.params.user || {};

	console.log("userData en BookingStackNavigator: ", userData);

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
				name="MatchScreen"
				component={MatchScreen}
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
