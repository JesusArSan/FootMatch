// React Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My components
import CustomButton from "../../components/CustomButton.js";

const UserProfileScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	const user = route.params.user || {};

	// Logout handler
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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Perfil</Text>
			<Text style={styles.text}>
				Esta es la pantalla de perfil del usuario '{user.name}'.
			</Text>

			<View style={styles.logout}>
				<Text>Bienvenido, {user.username}</Text>
				{/* Button Log out */}
				<CustomButton
					text="Log Out"
					onPress={handleLogout}
					typeStyle="2"
					buttonWidth="50%"
				/>

				<Text style={styles.footer}>
					Gracias por usar nuestra aplicación.
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		textAlign: "center",
	},
	logout: {
		marginTop: 25,
		alignItems: "center",
		backgroundColor: "#fafafa",
		padding: 20,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 10,
	},
	footer: {
		fontSize: 16,
		color: "gray",
		textAlign: "center",
	},
});

export default UserProfileScreen;
