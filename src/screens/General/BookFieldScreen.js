// React Imports
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
							title={center.title}
						>
							<View style={styles.marker}>
								<Text>${center.price}</Text>
							</View>
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
	marker: {
		backgroundColor: "lightgreen",
		padding: 5,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "grey",
	},
});

export default BookFieldScreen;
