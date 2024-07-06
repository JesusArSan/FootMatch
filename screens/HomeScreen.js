// React Imports
import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My components
import CustomButton from "../components/CustomButton";

// HOME SCREEN
const HomeScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Hide the back arrow in the navigation bar
	React.useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	const handleLogout = async () => {
		try {
			// Remove the userToken and userData from AsyncStorage
			await AsyncStorage.removeItem("@userToken");
			await AsyncStorage.removeItem("@userData");

			// Remove data of route.params
			route.params = {};

			// Navigate to the Login screen, and reset the navigation stack
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [
						{
							name: "InitialScreen",
							params: { user: null, tokenValid: false },
						},
					],
				})
			);
		} catch (e) {
			console.error("Error al cerrar sesión: ", e);
			Alert.alert(
				"Error",
				"No se pudo cerrar la sesión. Por favor, intentalo de nuevo."
			);
		}
	};

	// Get the user data from the route params
	const user = route.params || {};

	return (
		<View style={styles.container}>
			<Text>Bienvenido, {user.username}</Text>

			{/* Button Log out */}
			<CustomButton
				text="Log Out"
				onPress={handleLogout}
				typeStyle="2"
				buttonWidth="50%"
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B0E0E6",
		alignItems: "center",
		justifyContent: "center",
	},
});
