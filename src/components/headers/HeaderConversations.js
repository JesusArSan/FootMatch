// React Imports
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Icon Components
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

// Header Tab Tittle
const HeaderMessage = ({ props, text = "Prueba" }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{text}</Text>
			<View style={styles.screenOptions}>
				<TouchableOpacity>
					<MagnifyingGlassIcon size={28} />
				</TouchableOpacity>
				<TouchableOpacity>
					<SimpleLineIcons
						name="options-vertical"
						size={25}
						color="#fafafa"
						style={{ marginLeft: 20 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HeaderMessage;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		color: "#fafafa",
		paddingBottom: 2,
		marginLeft: 0,
	},
	screenOptions: {
		flexDirection: "row",
		alignItems: "center",
	},
});

// Name file: components/HeaderMessage.js
