// React Imports
import React, { useLayoutEffect, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
	useNavigation,
	CommonActions,
} from "@react-navigation/native";
// My Styles
import commonStyles from "../styles/CommonStyles.js";
import styles from "../styles/InitialScreenStyles.js";
// My components
import InitialHeader from "../components/InitialHeader.js";
import CustomButton from "../components/CustomButton.js";
import SocialButtons from "../components/SocialButtons.js";

// INITIAL SCREEN
const InitialScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Extract user and tokenValid from the route params
	const { user, tokenValid } = route.params || {};

	// If the token is valid and user not null, navigate to the MainNavigatorScreen
	useEffect(() => {
		if (tokenValid && user) {
			try {
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: "MainNavigatorScreen", params: user }],
					})
				);
			} catch (error) {
				console.error("Error al redirigir a MainNavigatorScreen: ", error);
			}
		}
	}, [tokenValid, user, navigation]);

	// Hide the arrow back button
	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);

	return (
		<SafeAreaView style={commonStyles.container}>
			{/* Component Header */}
			<InitialHeader mainText="Book and organize matches with your friends!" />

			{/* Body */}
			<View style={commonStyles.mainContainer}>
				<Text style={styles.welcomeText}>Welcome to FootMatch!</Text>
				<Text style={styles.subHeaderText}>Join us and start playing.</Text>

				{/* Button Sign In */}
				<CustomButton
					styles={styles.buttonContainer}
					text="Sign In"
					dirNavigation="LoginScreen"
					typeStyle="1"
					buttonWidth="85%"
				/>

				{/* Button Sign Up */}
				<CustomButton
					styles={styles.buttonContainer}
					text="Sign Up"
					dirNavigation="RegisterScreen"
					typeStyle="2"
					buttonWidth="85%"
				/>

				{/* Social Buttons Component */}
				<SocialButtons />
			</View>

			<View style={commonStyles.termsContainer}>
				<Text style={commonStyles.termsText}>
					By registering, you agree to our{" "}
					<Text style={styles.underlinedTerms}>terms of use</Text> and{" "}
					<Text style={styles.underlinedTerms}>privacy policy</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default InitialScreen;

// Name file: InitialScreen.js