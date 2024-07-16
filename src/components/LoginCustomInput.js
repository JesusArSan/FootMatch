import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const LoginCustomInput = ({ userData, setUserData, error }) => {
  return (
    <View style={styles.container}>
      <View // Apply the style type according to the error state and if the field is empty
        style={
          error && userData.username === ""
            ? styles.inputError
            : styles.inputContainer
        }
      >
        <FontAwesome style={styles.icon} name="user" size={25} color="black" />
        <TextInput
          placeholder="Username"
          value={userData.username}
          // If it changes, I call the setUserData function to update the state
          onChangeText={(newUsername) =>
            setUserData((prev) => ({ ...prev, username: newUsername }))
          }
          autoCapitalize="none" // Deactivate the first letter in uppercase
          maxLength={15} // Maximum of characters
        />
      </View>

      <View // Apply the style type according to the error state and if the field is empty
        style={
          error && userData.password === ""
            ? styles.inputError
            : styles.inputContainer
        }
      >
        <FontAwesome style={styles.icon} name="lock" size={25} color="black" />
        <TextInput
          placeholder="Password"
          value={userData.password}
          // if it changes, I call the setUserData function to update the state
          onChangeText={(newPassword) =>
            setUserData((prev) => ({ ...prev, password: newPassword }))
          }
          // Contraseña oculta
          secureTextEntry={true}
          autoCapitalize="none" // Deactivate the first letter in uppercase
          maxLength={15} // Maximum of characters
        />
      </View>
      {error && (
        <Text style={styles.errorText}>
          Debe de introducir un usuario y una contraseña.
        </Text>
      )}
    </View>
  );
};

export default LoginCustomInput;

// Shadow styles
const shadowStyles = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginVertical: 8,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 60,
    backgroundColor: "#EEEEEE",
    ...shadowStyles,
    borderColor: "#EEEEEE",
    borderWidth: 1,
  },
  inputError: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginVertical: 8,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 60,
    backgroundColor: "#EEEEEE",
    ...shadowStyles,
    borderColor: "red",
    borderWidth: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 3,
    marginTop: 4,
  },
  errorText: {
    position: "absolute",
    top: 130,
    fontSize: 10,
    fontFamily: "InriaSans-Bold",
    color: "red",
  },
});
