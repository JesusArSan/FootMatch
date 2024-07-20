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

const LOCATION_KEY = "@userLocation";
const MAX_DISTANCE = 20000; // 20 km
const HEIGHT_OF_EACH_ITEM = 172; // Item height

const BookFieldScreen = ({ route }) => {
	// Refs
	const mapRef = React.useRef(null);
	const scrollRef = React.useRef(null);

	// Get the user data from the route params
	const userData = route.params.user || {};

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

	// Check if the user has a location set and animate the map to that location
	React.useEffect(() => {
		if (userData.location) {
			const userLatitude = userData.location.latitude;
			const userLongitude = userData.location.longitude;
			if (
				location.latitude !== userLatitude ||
				location.longitude !== userLongitude
			) {
				updateLocation(userData.location);
			}
		} else {
			fetchLocation();
		}
	}, [userData.location]);

	React.useEffect(
		() => {
			// Filter centers
			applyFilters("");

			// Move the map to the user location
			if (mapRef.current) {
				moveMapToUserLocation(mapRef, location, 1000);
			}
		},
		[location],
		[mapRef]
	);

	// Update the location of the user
	const updateLocation = (newCoords) => {
		setLocation({
			latitude: newCoords.latitude,
			longitude: newCoords.longitude,
			latitudeDelta: 0.03,
			longitudeDelta: 0.03,
		});
	};

	// Move the map to the user location
	const moveMapToUserLocation = (mapRef, location, timeAnimation) => {
		mapRef.current?.animateToRegion({ ...location }, timeAnimation);
	};

	// Filter the centers by the search input and distance from the user location
	const applyFilters = (searchInput) => {
		const lowercasedInput = searchInput.toLowerCase();
		const filtered = centers
			.map((center) => ({
				...center,
				distance: getDistance(
					{ latitude: location.latitude, longitude: location.longitude },
					{ latitude: center.latitude, longitude: center.longitude }
				),
			}))
			.filter(
				(center) =>
					center.title.toLowerCase().includes(lowercasedInput) &&
					center.distance < MAX_DISTANCE
			);
		setFilteredCenters(filtered);
	};

	// Fetch the user location and set iteam in AsyncStorage
	const fetchLocation = async () => {
		const coords = await UserLocation();
		if (coords) {
			// Update the location
			updateLocation(coords);

			// Store the location in AsyncStorage
			const { latitude, longitude } = coords;
			try {
				await AsyncStorage.setItem(
					LOCATION_KEY,
					JSON.stringify({ latitude, longitude })
				);
			} catch (error) {
				console.error("Error storing coordinates: ", error);
			}
		}
	};

	// Handle the search input
	const handleSearchInput = (input) => {
		applyFilters(input);
	};

	// Scroll to the selected center
	const handleMarkerPress = (centerId) => {
		const index = filteredCenters.findIndex(
			(center) => center.id === centerId
		);
		if (index !== -1) {
			const yOffset = index * HEIGHT_OF_EACH_ITEM;
			scrollRef.current?.scrollTo({ y: yOffset, animated: true });
		}
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
					onPress={() => moveMapToUserLocation(mapRef, location, 1000)}
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
