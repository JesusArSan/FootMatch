import { StyleSheet } from "react-native";

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

// Styles
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },

  mainContainer: {
    backgroundColor: "#FAFAFA",
    width: "80%",
    height: 440,
    padding: 20,
    paddingTop: 20,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    top: 317,
    ...shadowStyles,
  },

  termsContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "flex-left",
    position: "absolute",
    top: 790,
  },

  termsText: {
    fontSize: 15,
    fontFamily: "InriaSans-Bold",
    color: "black",
  },
});

// Path: footmatch-app/styles/CommonStyles.js
