// React Imports
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

// My Styles
import commonStyles from "../../styles/CommonStyles.js";
import styles from "../../styles/InitialScreenStyles.js";
// My components
import InitialHeader from "../../components/InitialHeader.js";
import CustomButton from "../../components/CustomButton.js";
import SocialButtons from "../../components/SocialButtons.js";

// INITIAL SCREEN
const InitialScreen = ({}) => {
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
