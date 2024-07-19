import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RegisterComponentInput = ({ formData, onInputChange, errors }) => {
  return (
    <View style={styles.container}>
      {/* Full name Input Container */}
      <View
        style={[
          styles.inputContainer,
          errors.name && formData.name === "" ? styles.inputError : null,
        ]}
      >
        <FontAwesome style={styles.icon} name="user" size={25} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => onInputChange("name", text)}
          maxLength={30}
        />
      </View>

      {/* Username Input Container */}
      <View
        style={[
          styles.inputContainer,
          errors.username && formData.username === ""
            ? styles.inputError
            : null,
        ]}
      >
        <Ionicons
          style={styles.iconBall}
          name="football"
          size={25}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => onInputChange("username", text)}
          autoCapitalize="none"
          maxLength={15} // Máximo de caracteres
        />
      </View>

      {/* Email Input Container */}
      <View
        style={[
          styles.inputContainer,
          errors.email && formData.email === "" ? styles.inputError : null,
        ]}
      >
        <MaterialCommunityIcons
          style={styles.iconEmail}
          name="email"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => onInputChange("email", text)}
          autoCapitalize="none" // Deactivate the first letter in uppercase
          keyboardType="email-address"
          maxLength={40}
        />
      </View>

      {/* Password Input Container */}
      <View
        style={[
          styles.inputContainer,
          errors.password && formData.password === ""
            ? styles.inputError
            : null,
        ]}
      >
        <FontAwesome style={styles.icon} name="lock" size={25} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => onInputChange("password", text)}
          secureTextEntry={true}
          autoCapitalize="none" // Deactivate the first letter in uppercase
          maxLength={15} // Máximo de caracteres
        />
      </View>
    </View>
  );
};

export default RegisterComponentInput;

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
    marginTop: 3,
  },
  iconEmail: {
    width: 30,
    height: 30,
    marginRight: 6,
    marginLeft: -3,
    marginTop: 5,
  },
  iconBall: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginTop: 4,
    marginLeft: -4,
  },
});
