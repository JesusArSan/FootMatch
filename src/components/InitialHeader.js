import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const InitialHeader = ({ mainText }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/images/InitialPhoto.webp")}
        style={styles.image}
      />

      <Image
        source={require("../assets/images/icons/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.headerText}>{mainText}</Text>
    </View>
  );
};

export default InitialHeader;

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
  imageContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
  },
  image: {
    width: "150%",
    height: 400,
    position: "absolute",
    top: 0,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
  },
  logo: {
    width: 60,
    position: "absolute",
    top: 5,
  },

  headerText: {
    width: "80%",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    top: "61%",
    marginBottom: 10,
    fontFamily: "InriaSans-Bold",
  },
});
