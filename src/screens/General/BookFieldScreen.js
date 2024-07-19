// React Imports
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// GeoLib
import { getDistance } from "geolib";
// My utils
import UserLocation from "../../utils/UserLocation";
// My components
import CustomCenter from "../../components/CustomCenter";
import StatusBar from "../../components/StatusBar";
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
const MAX_DISTANCE = 20000; // 20 km
const HEIGHT_OF_EACH_ITEM = 172; // Item height

const BookFieldScreen = ({ route }) => {
	// Refs
	const mapRef = React.useRef(null);
	const scrollRef = React.useRef(null);

	// Initialize the location of Spain
	const [location, setLocation] = React.useState({
		latitude: 40.4168,
		longitude: -3.7038,
		latitudeDelta: 8,
		longitudeDelta: 8,
	});
	// Initialize the selected center
	const [selectedCenterId, setSelectedCenterId] = React.useState(null);
	// Initialize the filtered centers
	const [filteredCenters, setFilteredCenters] = React.useState(centers);

	// Get the user data from the route params
	const userData = route.params.user || {};

	// Check if the user has a location set and animate the map to that location
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
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			});
			mapRef.current?.animateToRegion({ ...location }, 1000);
		}
	}

	// Fetch the user location and set iteam in AsyncStorage
	React.useEffect(() => {
		const fetchLocation = async () => {
			const coords = await UserLocation();
			if (coords) {
				const { latitude, longitude } = coords;
				setLocation({
					latitude,
					longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03,
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
			console.log("No location found", "Fetching location...");
			fetchLocation();
		}

		filterNearbyCenters();
	}, [userData.location]); // Dependencia del useEffect

	// If location is set, animate the map to the location
	React.useEffect(() => {
		if (location && mapRef.current) {
			mapRef.current.animateToRegion(
				{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03,
				},
				1000
			);
			filterNearbyCenters();
		}
	}, [location]); // Añadir location a las dependencias para reaccionar a sus cambios

	// Scroll to the selected center
	const handleMarkerPress = (centerId) => {
		// Asegúrate de usar filteredCenters para buscar el índice, ya que estos son los elementos que realmente se muestran
		const index = filteredCenters.findIndex(
			(center) => center.id === centerId
		);
		if (index === -1) return; // Si no encuentra el centro, no hace nada

		const yOffset = index * HEIGHT_OF_EACH_ITEM; // Todos los items tienen la misma altura
		scrollRef.current?.scrollTo({ y: yOffset, animated: true });
	};

	// Using the search input to filter the centers
	const handleSearchInput = (input) => {
		const filtered = centers.filter((center) =>
			center.title.toLowerCase().includes(input.toLowerCase())
		);
		setFilteredCenters(filtered); // Centers to show
	};

	// Filter the centers by the user location
	const filterNearbyCenters = () => {
		// First, calculate the distance between the user location and the centers
		const centersWithDistance = centers.map((center) => {
			const distance = getDistance(
				{ latitude: location.latitude, longitude: location.longitude },
				{ latitude: center.latitude, longitude: center.longitude }
			);
			// Return the center with the distance
			return { ...center, distance };
		});

		// Filter the centers by distance
		const filtered = centersWithDistance.filter(
			(center) => center.distance < MAX_DISTANCE
		);

		setFilteredCenters(filtered);
	};

	return (
		<View style={styles.container}>
			<View style={styles.myUbication}>
				<Text style={styles.title}>My Ubication</Text>
				<View style={styles.locationContainer}>
					<MapView
						ref={mapRef}
						provider={PROVIDER_GOOGLE}
						style={styles.mapDimensions}
						initialRegion={{ ...location }}
					>
						<Marker
							coordinate={{
								latitude: location.latitude,
								longitude: location.longitude,
							}}
						>
							<MaterialIcons
								name="location-history"
								size={30}
								color="#1772FB"
							/>
						</Marker>
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
									setSelectedCenterId(center.id);
									handleMarkerPress(center.id);
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
				<TouchableOpacity
					style={styles.reloadUbication}
					onPress={() =>
						mapRef.current?.animateToRegion({ ...location }, 1000)
					}
				>
					<MaterialCommunityIcons
						name="map-marker-right"
						size={30}
						color="black"
						style={{ marginRight: 7 }}
					/>
					<Text>Where Am I?</Text>
				</TouchableOpacity>
				<StatusBar onSearchInputChange={handleSearchInput} />
			</View>

			<View style={styles.divider} />

			<ScrollView
				ref={scrollRef}
				style={styles.centerList}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{filteredCenters.map((center) => (
					<View key={center.id} style={styles.centerInformation}>
						<CustomCenter
							name={center.title}
							address={center.address}
							distance={center.distance}
							imgUrl={center.image}
							isSelected={selectedCenterId === center.id}
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
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		marginBottom: 10,
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
	reloadUbication: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	divider: {
		height: 1,
		width: "100%",
		marginTop: 20,
		borderBottomColor: "#000",
		borderBottomWidth: 0.1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0,
		shadowRadius: 5,
		elevation: 3,
	},
	centerList: {},
	centerInformation: {
		marginVertical: 10,
		paddingHorizontal: 20,
	},
	searchBox: {
		alignItems: "center",
		marginLeft: 20,
		marginRight: 20,
	},
});

export default BookFieldScreen;
