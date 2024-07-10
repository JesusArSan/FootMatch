// React Imports
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CustomCenter = ({ name, address, imgUrl }) => {
	return (
		<TouchableOpacity style={styles.centerContainer} activeOpacity={0.7}>
			<View style={styles.infoCenter}>
				<Text style={styles.nameCenter}>{name}</Text>
				<Text style={styles.addressCenter}>{address}</Text>
			</View>
			<Image source={imgUrl} style={styles.image} />
		</TouchableOpacity>
	);
};

export default CustomCenter;

// Shadow styles
const shadowStyles = {
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 6,
};

const styles = StyleSheet.create({
	centerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 25,
		padding: 18,
		paddingVertical: 25,
		...shadowStyles,
		backgroundColor: "#FAFAFA",
	},
	infoCenter: {
		width: "50%",
	},
	nameCenter: {
		fontSize: 17,
		fontFamily: "InriaSans-Bold",
		marginBottom: 8,
	},
	addressCenter: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
	},
	image: {
		width: 148,
		height: 85,
		borderRadius: 20,
	},
});
