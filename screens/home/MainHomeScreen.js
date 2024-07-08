// React Imports
import React from "react";
import { StyleSheet, View, Text, Alert, Button } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My components
import CustomButton from "../../components/CustomButton.js";
import MyLastGame from "../../components/MyLastGame.js";
// My Styles
import homeStyles from "../../styles/homeStyles.js";

const MainHomeScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

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

	// Get the user data from the route params
	const user = route.params.user || {};

	return (
		<View style={styles.container}>
			{/* MyLastGame */}
			<MyLastGame />

			<View style={homeStyles.mainContainerHome}>
				<Text>Bienvenido, {user.username}</Text>

				{/* Button Log out */}
				<CustomButton
					text="Log Out"
					onPress={handleLogout}
					typeStyle="2"
					buttonWidth="50%"
				/>
			</View>

			<Button
				title="Comunidad"
				onPress={() => alert("Navegar a Comunidad")}
			/>
			<Text style={styles.footer}>Gracias por usar nuestra aplicación.</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#EEEEEE",
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
	},
	footer: {
		fontSize: 16,
		marginTop: 20,
		color: "gray",
		textAlign: "center",
	},
});

export default MainHomeScreen;
