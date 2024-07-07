// React Imports
import React, { useState, useLayoutEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My imports
import config from "../config.js";
// My Styles
import commonStyles from "../styles/CommonStyles.js";
import styles from "../styles/RegisterStyles";
// My components
import RegisterComponentInput from "../components/RegisterComponentInput";
import InitialHeader from "../components/InitialHeader";

const RegisterScreen = () => {
	// Navegación entre pantallas
	const navigation = useNavigation();

	// Ocultar la flecha hacia atrás en la barra de navegación
	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	// Estado para los datos del formulario
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	// Estado para los errores
	const [errors, setErrors] = useState({
		name: false,
		username: false,
		email: false,
		password: false,
	});

	const setUserDataForm = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: false }));
	};

	const handleSignUp = async () => {
		let hasErrors = false;

		// Verificar si hay campos vacíos
		const newErrors = { ...errors };
		for (const key in formData) {
			if (!formData[key]) {
				newErrors[key] = true;
				hasErrors = true;
			}
		}

		// Actualizar los errores
		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Lógica de registro
		try {
			const response = await fetch(`${config.serverUrl}/users/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					username: formData.username,
					email: formData.email,
					password: formData.password, // Solo envía username, email, y password
				}),
			});

			if (response.ok) {
				// Si la respuesta es exitosa, parseamos la respuesta
				const formdataParse = await response.json();
				console.log("Datos de registro:", formdataParse);

				// Save the userToken in AsyncStorage and the userData
				await AsyncStorage.setItem("@userToken", formdataParse.token);
				await AsyncStorage.setItem(
					"@userData",
					JSON.stringify(formdataParse)
				);

				// Cambio de pantalla
				navigation.navigate("MainNavigatorScreen", formdataParse);
			} else {
				throw new Error("Error al crear el usuario");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<SafeAreaView style={commonStyles.container}>
			{/* Component Header */}
			<InitialHeader mainText="Sign Up to book and organize matches with your friends!" />

			{/* Body */}
			<View style={[commonStyles.mainContainer, { padding: 40 }]}>
				<View style={styles.containerSignup}>
					<Text style={styles.signupText}>Sign Up</Text>
				</View>

				<RegisterComponentInput
					formData={formData}
					onInputChange={setUserDataForm}
					errors={errors}
				/>

				<TouchableOpacity
					style={styles.buttonSignup}
					onPress={handleSignUp}
				>
					<Text style={styles.buttonTextSignUp}>Sign Up</Text>
				</TouchableOpacity>
			</View>

			{/* Change to Sign In */}
			<View style={commonStyles.termsContainer}>
				<Text style={commonStyles.termsText}>Already have an account?</Text>
				<TouchableOpacity
					style={styles.termsSignButton}
					onPress={() => {
						/* Navegación Sign In */
						navigation.navigate("LoginScreen");
					}}
				>
					<Text style={styles.termsTextSign}>Sign In</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RegisterScreen;

// Name file: RegisterScreen.js