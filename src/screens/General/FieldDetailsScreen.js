// FieldDetailScreen.js
import React from "react";
import { View, Text } from "react-native";

const FieldDetailsScreen = ({ route }) => {
	const center = route.params.centerInfo;

	if (!center) {
		return (
			<View>
				<Text>Field not found</Text>
			</View>
		);
	} else {
		return (
			<View>
				<Text>{center.title}</Text>
				<Text>{center.id}</Text>
			</View>
		);
	}
};

export default FieldDetailsScreen;
