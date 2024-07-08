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
import { ScrollView } from "react-native-gesture-handler";

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
		<View style={styles.totalContainer}>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{/* MyLastGame */}
				<View style={styles.lastGameContainer}>
					<Text style={styles.sectionTitle}>Your Last Game</Text>
					<MyLastGame />
				</View>

				{/* ActionsApp */}
				<View style={styles.actionsAppContainer}>
					<Text style={styles.sectionTitle}>Time To Play!</Text>
					<View style={styles.actionsSpace}>
						{/* <CustomActionApp actionType="1" />
					<CustomActionApp actionType="2" /> */}
						<Text style={styles.text}>Hola1</Text>
						<Text>Hola2</Text>
					</View>
					<View style={styles.actionsSpace}>
						{/* <CustomActionApp actionType="3" />
					<CustomActionApp actionType="4" /> */}
						<Text>Hola1</Text>
						<Text>Hola2</Text>
					</View>
					<View style={styles.actionsSpace}>
						{/* <CustomActionApp actionType="5" />
					<CustomActionApp actionType="6" /> */}
						<Text>Hola1</Text>
						<Text>Hola2</Text>
					</View>
					<View style={styles.actionsSpace}>
						{/* <CustomActionApp actionType="7" />
					<CustomActionApp actionType="8" /> */}
						<Text>Hola1</Text>
						<Text>Hola2</Text>
					</View>
				</View>

				{/* Some Nearby Centers */}
				<View style={styles.centersContainer}>
					<Text style={styles.sectionTitle}>Nearby Centers</Text>
					<View style={styles.centersSpace}>
						{/* <CustomCenter /> */}
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
						<Text>Hola1</Text>
					</View>
				</View>

				{/* BORRAR */}
				<View style={styles.others}>
					<Text>Bienvenido, {user.username}</Text>
					{/* Button Log out */}
					<CustomButton
						text="Log Out"
						onPress={handleLogout}
						typeStyle="2"
						buttonWidth="50%"
					/>
					<Button
						title="Comunidad"
						onPress={() => alert("Navegar a Comunidad")}
					/>

					<Text style={styles.footer}>
						Gracias por usar nuestra aplicación.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	// Main Container
	totalContainer: {
		backgroundColor: "#EEEEEE",
		width: "100%",
		height: "100%",
	},
	// LastGame Styles
	sectionTitle: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		marginBottom: 10,
	},
	lastGameContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	// ActionsApp Styles
	actionsAppContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	actionsSpace: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "red",
		width: "100%",
	},
	// Nearby Centers Styles
	centersContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	centersSpace: {
		backgroundColor: "cyan",
		width: "100%",
	},

	// borrar
	others: {
		marginTop: 20,
		alignItems: "center",
		backgroundColor: "yellow",
	},
	footer: {
		fontSize: 16,
		marginTop: 20,
		color: "gray",
		textAlign: "center",
	},
});

export default MainHomeScreen;
