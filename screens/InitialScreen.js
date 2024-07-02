// React Imports
import React, { useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My imports
import config from "../config.js";
// My Styles
import commonStyles from "../styles/CommonStyles.js";
import styles from "../styles/InitialScreenStyles.js";
// My components
import InitialHeader from "../components/InitialHeader.js";
import CustomButton from "../components/CustomButton.js";
import SocialButtons from "../components/SocialButtons.js";

const InitialScreen = () => {
  // Navegación entre pantallas
  const navigation = useNavigation();

  // Get the userToken from AsyncStorage
  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem("@userToken");
      if (token) {
        try {
          // Make a request to the server to validate the token
          const response = await fetch(`${config.serverUrl}/users/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          // If the token is valid, navigate to the Home screen
          if (response.status === 200) {
            const data = JSON.parse(await AsyncStorage.getItem("@userData"));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen", params: { user: data } }],
              })
            );
          }
        } catch (error) {
          console.error("Error validating token", error);
        }
      }
    };

    checkUserToken();
  }, [navigation]);

  // Ocultar la flecha hacia atrás en la barra de navegación
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
