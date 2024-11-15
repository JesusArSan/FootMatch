import React, { useEffect, useState, useRef } from "react";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	MaterialCommunityIcons,
	FontAwesome6,
	MaterialIcons,
	Ionicons,
} from "@expo/vector-icons";
// My utils
import UserLocation from "../../utils/UserLocation";
import { applyFilters } from "../../utils/NearbyCenters";
// My components
import CustomCenter from "../../components/CustomCenter";
import StatusBar from "../../components/StatusBar";
import BottomSheetContent from "../../components/BottomSheetContent";
// Centers Functions
import { getCenters } from "../../utils/CentersFunctions";

const LOCATION_KEY = "@userLocation";

const BookFieldScreen = ({ route }) => {
	// Refs
	const mapRef = useRef(null);
	const flatListRef = useRef(null);
	const bottomSheetModalRef = useRef(null);

	// Navigation
	const navigation = useNavigation();

	// Get the user data from the route params
	const userData = route.params.user || {};

	// Centers
	const [centers, setCenters] = useState([]);
	const [filteredCenters, setFilteredCenters] = useState([]);

	// Initialize the location of Spain
	const [location, setLocation] = useState({
		latitude: 40.4168,
		longitude: -3.7038,
		latitudeDelta: 8,
		longitudeDelta: 8,
	});
	const [selectedCenterId, setSelectedCenterId] = useState(null);
	const [maxDistance, setMaxDistance] = useState(20000); // Initial distance state 20km

	// Fetch and set centers data
	const updateCentersList = async () => {
		await getCenters(setCenters); // Fetch centers
	};

	// Effect to fetch centers and update state
	useEffect(() => {
		const fetchCenters = async () => {
			await updateCentersList();
		};

		fetchCenters();
	}, []);

	// Effect to update filtered centers and move the map
	useEffect(() => {
		if (centers.length > 0) {
			// Filter centers based on location and distance
			const filtered = applyFilters(centers, "", location, maxDistance);
			setFilteredCenters(filtered);

			// Move the map to the user location
			if (mapRef.current) {
				moveMapToUserLocation(mapRef, location, 1000);
			}
		}
	}, [centers, location, maxDistance]);

	const fetchLocation = async () => {
		try {
			// Obtain the user location
			const location = await UserLocation();
			const { latitude, longitude } = location;

			// Save the location in AsyncStorage
			await AsyncStorage.setItem(
				"@userLocation",
				JSON.stringify({ latitude, longitude })
			);

			// Update the location of the user
			updateLocation(location);
		} catch (error) {
			console.error("Error getting user location:", error);
		}
	};

	// Update the location of the user
	useEffect(() => {
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

	// UseEffect to update the location of the user
	useEffect(() => {
		if (userData.location) {
			const userLatitude = userData.location.latitude;
			const userLongitude = userData.location.longitude;

			if (
				location.latitude !== userLatitude ||
				location.longitude !== userLongitude
			) {
				updateLocation(userData.location);
			}
		}
	}, [userData.location]);

	// Handle the search input
	const handleSearchInput = (input) => {
		const filtered = applyFilters(centers, input, location, maxDistance);
		setFilteredCenters(filtered);
	};

	// Scroll to the selected center
	const handleMarkerPress = (centerId) => {
		const index = filteredCenters.findIndex(
			(center) => center.id === centerId
		);
		if (index !== -1) {
			flatListRef.current?.scrollToIndex({ index, animated: true });
		}
	};

	// BOTTON SHEET MODAL
	const snapPoints = ["35%"];
	const handlePresentModal = () => {
		bottomSheetModalRef.current?.present();
	};
	const handleFinalDistanceSelect = (distance) => {
		setMaxDistance(distance);
	};
	useEffect(() => {
		const filtered = applyFilters(centers, "", location, maxDistance);
		setFilteredCenters(filtered);
	}, [maxDistance, location, centers]);

	// Render the item of the FlatList
	const renderItem = ({ item: center }) => (
		<View key={center.id} style={styles.centerInformation}>
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => handleCenterPress(center)}
			>
				<CustomCenter
					name={center.title}
					address={center.address}
					distance={center.distance}
					imgUrl={center.images[0]?.uri || ""}
					isSelected={selectedCenterId === center.id}
				/>
			</TouchableOpacity>
		</View>
	);

	// Handle when center is pressed
	const handleCenterPress = (center) => {
		navigation.navigate("CenterDetailsScreen", {
			centerInfo: center,
			userData: userData,
			userLocation: location,
		});
	};

	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<View style={styles.myUbication}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text style={styles.title}>My Ubication</Text>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								style={{ marginRight: 20 }}
								onPress={() => fetchLocation()}
							>
								<FontAwesome6
									name="location-crosshairs"
									size={30}
									color="black"
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={handlePresentModal}>
								<Ionicons
									name="options-sharp"
									size={30}
									color="black"
								/>
							</TouchableOpacity>
						</View>
					</View>
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
										latitude: parseFloat(center.latitude),
										longitude: parseFloat(center.longitude),
									}}
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

				<FlatList
					ref={flatListRef}
					data={filteredCenters}
					renderItem={renderItem}
					keyExtractor={(center) => center.id.toString()}
					ListEmptyComponent={() => (
						<Text style={styles.noCentersText}>
							No hay centros cerca de usted.
						</Text>
					)}
					style={styles.centerList}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				/>

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={snapPoints}
					style={{ borderRadius: 50 }}
					enableContentPanningGesture={false}
				>
					<BottomSheetContent
						onFinalDistanceSelect={handleFinalDistanceSelect}
						onClose={() => bottomSheetModalRef.current?.dismiss()}
						maxDistance={maxDistance}
					/>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
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
	noCentersText: {
		color: "red",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 20,
		textAlign: "center",
	},
	searchBox: {
		alignItems: "center",
		marginLeft: 20,
		marginRight: 20,
	},
	bottomSheet: {
		borderRadius: 50,
	},
	sheetContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default BookFieldScreen;
