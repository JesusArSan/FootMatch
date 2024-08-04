// React Imports
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
// My components
import Subscription from "../../components/SubscriptionCard";

const PitchTimeScreen = ({ route }) => {
	const pitchInfo = route.params.pitchInfo;
	const center = route.params.centerInfo;

	// console.log("pitchInfo: ", pitchInfo);

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: center.image }} style={styles.image} />
			</View>

			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Choose the best time</Text>
					<Feather name="calendar" size={30} color="black" />
				</View>
				<View
					style={{
						marginTop: 20,
						height: "14%",
					}}
				>
					<Subscription />
				</View>
				{/* <DaySelector />
				<HoursAvailable />
				<CheckoutButton /> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EEEEEE",
	},
	imageContainer: {
		width: "100%",
		height: "40%",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	mainContainer: {
		flex: 1,
		marginTop: -30,
		marginHorizontal: 20,
		paddingHorizontal: 30,
		paddingTop: 30,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#fafafa",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "bold",
	},
});

export default PitchTimeScreen;
