// React Imports
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Alert } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
// My components
import CustomMarker from "../../components/icons/CustomMarker";
// Dummy Data
import centers from "../../assets/data/sportCenters.json";

// useEffect(() => {
// 	// Get user location
// });

// const ubication
userUbication = {
	latitude: 37.1771,
	longitude: -3.6008,
	latitudeDelta: 0.07,
	longitudeDelta: 0.07,
};

const BookFieldScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>My Ubication</Text>
			<View style={styles.locationContainer}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.mapDimensions}
					initialRegion={userUbication}
				>
					{centers.map((center) => (
						<Marker
							key={center.id}
							coordinate={{
								latitude: center.latitude,
								longitude: center.longitude,
							}}
							// title={center.title}
							tracksViewChanges={false}
							onPress={() => {
								alert("test");
							}}
						>
							<CustomMarker customWidth={27} customHeight={34} />
							<Callout tooltip>
								<View style={styles.calloutContainer}>
									<View style={styles.bubbleCenter}>
										<Text style={styles.titleMarker}>
											{center.title}
										</Text>
									</View>
									<View style={styles.arrow} />
								</View>
							</Callout>
						</Marker>
					))}
				</MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	locationContainer: {
		width: "100%",
		height: 200,
		borderRadius: 30,
		overflow: "hidden",
	},
	mapDimensions: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	calloutContainer: {
		flex: 1,
		alignItems: "center",
		marginBottom: 2,
	},
	bubbleCenter: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#3562A6",
		width: 150,
		borderRadius: 5,
		padding: 5,
	},
	titleMarker: {
		color: "#fff",
		fontSize: 13,
		fontFamily: "InriaSans-Bold",
	},
	arrow: {
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderTopWidth: 10,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderTopColor: "#3562A6",
		alignSelf: "center",
		marginTop: -0.5,
	},
});

export default BookFieldScreen;
