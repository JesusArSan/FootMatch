// React Imports
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const MatchUsersScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};

	console.log("UserData en MatchUsersScreen", user.id);

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<View style={styles.mainContainer}>
				<Text>USUARIOS CONFIRMADOS PARA EL PARTIDO</Text>
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

export default MatchUsersScreen;
