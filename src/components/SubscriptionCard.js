import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SubscriptionCard = () => {
	const handleSubPress = () => {
		Alert.alert(
			"Join the Club",
			"Get 15% Off Instantly and Exclusive Benefits!\n\nUnder Development!"
		);
	};

	return (
		<TouchableOpacity style={styles.card} onPress={handleSubPress}>
			<ImageBackground
				source={{
					uri: "https://img.freepik.com/free-photo/3d-background-with-hexagonal-shapes-texture_23-2150473198.jpg?t=st=1722810436~exp=1722814036~hmac=31b7468f6d53618f2557cda9541fa5a64b390c1d1e57bdad41881a3228ec9748&w=1380",
				}}
				style={styles.backgroundImage}
				imageStyle={{ borderRadius: 20 }}
			>
				<View style={styles.overlay} />
				<View style={styles.content}>
					<View style={styles.textContainer}>
						<Text style={styles.title}>Join the Club Now!</Text>
						<Text style={styles.subtitle}>
							Get 15% Off Instantly and Exclusive Benefits!
						</Text>
					</View>
					<Ionicons name="chevron-forward" size={24} color="white" />
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default SubscriptionCard;

const styles = StyleSheet.create({
	card: {
		width: "100%",
		borderRadius: 20,
		justifyContent: "center",
		overflow: "hidden",
	},
	backgroundImage: {
		width: "100%",
		height: 100,
		justifyContent: "center",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(53, 98, 166, .75)", // Color layer on top with opacity
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		color: "white",
		fontSize: 14,
		fontFamily: "InriaSans-Bold",
	},
	subtitle: {
		color: "white",
		fontSize: 11,
		fontFamily: "InriaSans-Regular",
		marginTop: 5,
	},
});
