// Imports React
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({
	text = "Button",
	dirNavigation = "",
	onPress = null,
	typeStyle = 1,
	buttonWidth = "85%",
	marginBottom = 0,
}) => {
	// Navigation hook
	const navigation = useNavigation();

	// ButtonStyle and TextStyle selected
	const buttonStyle = [
		styles.buttonCommonStyle,
		typeStyle == 2 ? styles.buttonSecondStyle : styles.buttonFirstStyle,
		{ width: buttonWidth, marginBottom: marginBottom },
	];
	const textStyle = [
		styles.textCommonStyle,
		typeStyle == 2 ? styles.textSecondStyle : styles.textFirstStyle,
	];

	// HandlePress function
	const handlePress = () => {
		if (onPress) {
			onPress();
		} else if (dirNavigation) {
			navigation.navigate(dirNavigation);
		}
	};

	return (
		<TouchableOpacity
			style={[buttonStyle, { width: buttonWidth }]}
			onPress={handlePress}
		>
			<Text style={textStyle}> {text} </Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

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
	buttonCommonStyle: {
		padding: 15,
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		...shadowStyles,
	},
	buttonFirstStyle: {
		backgroundColor: "#3562A6",
		borderColor: "#3562A6",
	},
	buttonSecondStyle: {
		backgroundColor: "white",
		borderColor: "#3562A6",
	},
	textCommonStyle: {
		fontFamily: "InriaSans-Bold",
		fontSize: 19,
	},
	textFirstStyle: {
		color: "white",
	},
	textSecondStyle: {
		color: "#3562A6",
	},
});
