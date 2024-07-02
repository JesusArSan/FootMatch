import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const SocialButtons = ({}) => {
  return (
    <View style={styles.socialContainer}>
      {/* Connect with other social media */}
      <View style={styles.socialHeaderCont}>
        <Ionicons name="remove-outline" size={20} color="black" />
        <Text style={styles.socialText}>Or Sign In using</Text>
        <Ionicons name="remove-outline" size={20} color="black" />
      </View>

      <View style={styles.socialButtonsContainer}>
        {/* Button Facebook */}
        <TouchableOpacity
          onPress={() => {
            /* Handle Facebook Login */
          }}
        >
          <View style={styles.facebookIcon}>
            <AntDesign
              name="facebook"
              size={20}
              resizeMode="contain"
              color="white"
            />
          </View>
        </TouchableOpacity>

        {/* Button Google */}
        <TouchableOpacity
          onPress={() => {
            /* Handle Google Login */
          }}
        >
          <View style={styles.googleIcon}>
            <AntDesign
              name="google"
              size={20}
              resizeMode="contain"
              color="white"
            />
          </View>
        </TouchableOpacity>

        {/* Button Mobile */}
        <TouchableOpacity
          onPress={() => {
            /* Handle Mobile Login */
          }}
        >
          <View style={styles.mobileIcon}>
            <AntDesign
              style={styles.mobile}
              name="mobile"
              size={30}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  socialContainer: {
    alignItems: "center",
  },

  socialHeaderCont: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  socialText: {
    fontSize: 15,
    fontFamily: "InriaSans-Bold",
    color: "black",
  },

  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  facebookIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0080FF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  googleIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5353",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  mobileIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#505050",
    borderRadius: 10,
  },
});
