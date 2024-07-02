// React Imports
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My imports
import config from "../config.js";
// My Styles
import commonStyles from "../styles/CommonStyles.js";
import styles from "../styles/LoginStyles";
// My components
import LoginComponentInput from "../components/LoginCustomInput";
import InitialHeader from "../components/InitialHeader.js";
import SocialButtons from "../components/SocialButtons.js";

const LoginScreen = () => {
  // Navigation between screens
  const navigation = useNavigation();

  // Hide the back arrow in the navigation bar
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Userdata
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setError(false);

    if (userData.username === "" || userData.password === "") {
      setError(true);
      return;
    }

    try {
      const response = await fetch(`${config.serverUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // If the response is ok, get the user data parsed
        const data = await response.json();
        console.log(data); // Only for debugging

        // Save the userToken in AsyncStorage and the userData
        await AsyncStorage.setItem("@userToken", data.token);
        await AsyncStorage.setItem("@userData", JSON.stringify(data));

        // Change to HomeScreen and send the user data as a parameter
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "HomeScreen", params: { user: data } }],
          })
        );
      } else {
        throw new Error("Usuario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Reset the userData
    setUserData({ username: "", password: "" });
  };

  // useEffect(() => {
  //   const checkUserToken = async () => {
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (token) {
  //       navigation.replace("HomeScreen", { userData });
  //     }
  //   };

  //   checkUserToken();
  // }, [navigation]);

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header Component */}
      <InitialHeader mainText="Sign In to book and organize matches with your friends!" />

      {/* Body */}
      <View style={[commonStyles.mainContainer, { padding: 40 }]}>
        <View style={styles.containerSignin}>
          <Text style={styles.signinText}>Sign In</Text>
        </View>
        <LoginComponentInput
          userData={userData}
          setUserData={setUserData}
          error={error}
        />
        <View style={styles.containerForgot}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonSignin} onPress={handleLogin}>
          <Text style={styles.buttonTextSignin}>Sign In</Text>
        </TouchableOpacity>

        {/* Social Buttons Component */}
        <SocialButtons />
      </View>

      {/* Change to sign up */}
      <View style={commonStyles.termsContainer}>
        <Text style={commonStyles.termsText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.termsSignButton}
          onPress={() => {
            /* Navegación Sign Up */
            navigation.navigate("RegisterScreen");
          }}
        >
          <Text style={styles.termsTextSign}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
