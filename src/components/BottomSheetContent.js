import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

const BottomSheetContent = ({
	maxDistance = 20000,
	onFinalDistanceSelect,
	onClose,
}) => {
	const [distance, setDistance] = useState(maxDistance); // Initial distance state 20km

	const handleOkPress = () => {
		onFinalDistanceSelect(distance); // Send the final selected distance
		onClose();
	};

	return (
		<View style={styles.sheetContent}>
			<Text style={styles.title}>Adjust Distance</Text>
			<Slider
				style={styles.slider}
				minimumValue={1000}
				maximumValue={80000}
				minimumTrackTintColor="#3562A6"
				maximumTrackTintColor="grey"
				thumbTintColor="#3562A6"
				step={1000}
				value={distance}
				onValueChange={setDistance}
			/>
			<Text style={styles.distanceDisplay}>
				Current Distance: {distance / 1000} Km
			</Text>
			<Text style={styles.subTitle}>
				Slide to increase the viewing radius of sports centers.
			</Text>
			<TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
				<Text style={styles.okButtonText}>Ok</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	sheetContent: {
		padding: 20,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginBottom: 15,
	},
	subTitle: {
		fontSize: 13,
		marginTop: 10,
		color: "grey",
		fontFamily: "InriaSans-Regular",
	},
	slider: {
		width: "100%",
		height: 40,
		backgroundColor: "#BAD5FF",
		borderRadius: 10,
	},
	distanceDisplay: {
		fontSize: 15,
		color: "#3562A6",
		marginTop: 10,
		textAlign: "center",
		fontFamily: "InriaSans-Bold",
	},
	okButton: {
		backgroundColor: "#3562A6",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		marginTop: 25,
		width: "30%",
		alignItems: "center",
		alignSelf: "center",
	},
	okButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default BottomSheetContent;
