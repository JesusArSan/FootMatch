// React Imports
import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Alert,
	Touchable,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Expo Imports
import UserLocation from "../../utils/UserLocation";
// My components
import CustomCenter from "../../components/CustomCenter";
// Dummy Data
import centers from "../../assets/data/sportCenters.json";
import { ScrollView } from "react-native-gesture-handler";

// const ubication
userUbication = {
	latitude: 37.1771,
	longitude: -3.6008,
	latitudeDelta: 0.07,
	longitudeDelta: 0.07,
};

const LOCATION_KEY = "@userLocation";

const BookFieldScreen = ({ route }) => {
	const mapRef = React.useRef(null);

	// Initialize the location of Spain
	const [location, setLocation] = React.useState({
		latitude: 40.4168,
		longitude: -3.7038,
		latitudeDelta: 8,
		longitudeDelta: 8,
	});

	// Get the user data from the route params
	const userData = route.params.user || {};

	if (userData.location) {
		const userLatitude = userData.location.latitude;
		const userLongitude = userData.location.longitude;
		if (
			location.latitude !== userLatitude ||
			location.longitude !== userLongitude
		) {
			setLocation({
				latitude: userLatitude,
				longitude: userLongitude,
				latitudeDelta: 0.07,
				longitudeDelta: 0.07,
			});
			mapRef.current?.animateToRegion({ ...location }, 1000);
		}
	}

	React.useEffect(() => {
		const fetchLocation = async () => {
			const coords = await UserLocation();
			if (coords) {
				const { latitude, longitude } = coords;
				setLocation({
					latitude,
					longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				});

				try {
					await AsyncStorage.setItem(
						LOCATION_KEY,
						JSON.stringify({ latitude, longitude }) // Guardar como objeto
					);
				} catch (error) {
					console.error("Error storing coordinates: ", error);
				}
			}
		};

		// Fetch the location if the user location is not set
		if (!userData.location) {
			Alert.alert("No location found", "Fetching location...");
			fetchLocation();
		}
	}, [userData.location]); // Dependencia del useEffect

	React.useEffect(() => {
		if (location && mapRef.current) {
			mapRef.current.animateToRegion(
				{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				},
				1000
			);
		}
	}, [location]); // Añadir location a las dependencias para reaccionar a sus cambios

	return (
		<View style={styles.container}>
			<View style={styles.myUbication}>
				<Text style={styles.title}>
					My Ubication, {location.latitude}, {location.longitude}
				</Text>
				<View style={styles.locationContainer}>
					<MapView
						ref={mapRef}
						provider={PROVIDER_GOOGLE}
						style={styles.mapDimensions}
						initialRegion={{ ...location }}
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
			<View style={styles.searchBox}>
				{/* <TouchableOpacity
					onPress={() =>
						mapRef.current?.animateToRegion(userUbication, 1000)
					}
				>
					<Text>Search Box</Text>
				</TouchableOpacity> */}
			</View>
			<ScrollView
				style={styles.centerList}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{centers.map((center) => (
					<View key={center.id} style={styles.centerInformation}>
						<CustomCenter
							name={center.title}
							address={center.latitude}
							imgUrl={center.image}
						/>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: "#EEEEEE",
	},
	myUbication: {
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
	centerList: {
		marginTop: 20,
	},
	centerInformation: {
		marginVertical: 10,
		paddingHorizontal: 20,
	},
	searchBox: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingVertical: 10,
	},
});

export default BookFieldScreen;
