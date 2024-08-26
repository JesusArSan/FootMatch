// React Imports
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
// My components
import FloatButton from "../../components/FloatButton";
import { cancelMatch } from "../../utils/MatchesFunctions";

const MatchConfigScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};
	const reservation = route.params.reservation || {};
	const matchId = route.params.matchId || {};

	const navigation = useNavigation();

	const [cancelResult, setCancelResult] = useState(null);

	const handleCancelMatch = async () => {
		if (!matchId) {
			Alert.alert("Error", "No match ID provided.");
			return;
		}

		try {
			const response = await cancelMatch(matchId);

			// Alert, success
			Alert.alert("Success", "Match canceled successfully");

			// Navigate to home
			navigation.navigate("MainNavigatorScreen");
		} catch (error) {
			Alert.alert("Error", `Error canceling match: ${error.message}`);
		}
	};

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<View style={styles.mainContainer}>
				<Text>AJUSTES DEL PARTIDO</Text>
				<FloatButton
					title="Cancel Match"
					backgroundCustomColor="red"
					onPress={handleCancelMatch}
				/>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingVertical: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "rgba(250, 250, 250, 0.8)",
		marginTop: 30,
		marginHorizontal: 20,
	},
	divider: {
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		width: "100%",
	},
});

export default MatchConfigScreen;
