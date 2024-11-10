// React Imports
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// My components
import MyLastGame from "../../components/MyLastGame.js";
import CustomActionApp from "../../components/CustomActionApp.js";
import CustomCenter from "../../components/CustomCenter.js";
// My icons
import MessageIcon from "../../components/icons/MessageIcon.js";
// My Styles
import { ScrollView } from "react-native-gesture-handler";
// Centers Functions
import { getFavCenters } from "../../utils/CentersFunctions.js";
// User Location
import UserLocation from "../../utils/UserLocation.js";
// User Last game
import { fetchLastCompletedMatch } from "../../utils/UserFunctions.js";
import { useDrawerProgress } from "@react-navigation/drawer";

const MainHomeScreen = ({ route }) => {
	// State to store the fav centers
	const [favCenters, setCenters] = useState([]);

	// State to store the last completed match
	const [lastCompletedMatch, setLastCompletedMatch] = useState(null);

	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	let user = route.params.user || {};

	// Update the fav centers list
	const updateCentersList = async () => {
		await getFavCenters(user.id, setCenters);
	};
	// Update the fav centers list on component mount
	useFocusEffect(
		useCallback(() => {
			updateCentersList();
		}, [])
	);

	// If user.location do not exit, get it
	useEffect(() => {
		const fetchUserLocation = async () => {
			try {
				console.log("Getting user location from device....");

				// Get the user location
				const location = await UserLocation();
				const { latitude, longitude } = location;

				// Save the user location in asyncStorage
				await AsyncStorage.setItem(
					"@userLocation",
					JSON.stringify({ latitude, longitude })
				);

				// Update the user object with the location
				user = { ...user, location: { latitude, longitude } };
			} catch (error) {
				console.error("Error getting user location:", error);
			}
		};

		// If the user location is not defined, get it
		if (user.location === undefined) {
			fetchUserLocation();
		}
	}, [user]);

	useEffect(() => {
		const fetchLastGame = async () => {
			try {
				const matchData = await fetchLastCompletedMatch(user.id);

				setLastCompletedMatch(matchData);
			} catch (error) {
				console.error("Error fetching last completed match:", error);
			}
		};

		if (user.id) {
			fetchLastGame();
		}
	}, [user.id]);

	useFocusEffect(
		useCallback(() => {
			const fetchLastGame = async () => {
				try {
					const matchData = await fetchLastCompletedMatch(user.id);

					setLastCompletedMatch(matchData);
				} catch (error) {
					console.error("Error fetching last completed match:", error);
				}
			};

			if (user.id) {
				fetchLastGame();
			}
		}, [user.id])
	);

	const handleCenterPress = (center) => {
		navigation.navigate("BookingStackNavigator", {
			centerInfo: center,
			routeName: "CenterDetailsScreen",
			user: user,
			userLocation: user.location,
		});
	};

	const handleMessagePress = () => {
		navigation.navigate("ChatStackNavigator", {
			user: user,
		});
	};

	// Update navigation params to include the handler
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRightContainer}
					onPress={handleMessagePress}
				>
					<MessageIcon size={28} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.totalContainer}>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{/* MyLastGame */}
				<View style={styles.lastGameContainer}>
					<Text style={styles.sectionTitle}>Your Last Game</Text>
					<MyLastGame matchData={lastCompletedMatch} user={user} />
				</View>

				{/* ActionsApp */}
				<View style={styles.actionsAppContainer}>
					<Text style={styles.sectionTitle}>Time To Play!</Text>
					<View style={[styles.actionsSpace, { marginBottom: 25 }]}>
						<CustomActionApp actionType="1" user={user} />
						<CustomActionApp actionType="2" user={user} />
					</View>
					<View style={styles.actionsSpace}>
						<CustomActionApp actionType="3" user={user} />
						<CustomActionApp actionType="4" user={user} />
					</View>
				</View>

				{/* Some Favourite Centers */}
				<View style={styles.centersContainer}>
					<Text style={styles.sectionTitle}>Favourite Centers</Text>
					{favCenters.length > 0 ? (
						<View style={styles.centersSpace}>
							{favCenters.map((center) => (
								<TouchableOpacity
									key={center.id}
									activeOpacity={0.75}
									onPress={() => handleCenterPress(center)}
									style={styles.centerInformation}
								>
									<CustomCenter
										name={center.title}
										address={center.address}
										imgUrl={center.images[0].uri}
										distance={center.distance}
									/>
								</TouchableOpacity>
							))}
						</View>
					) : (
						<Text style={styles.noCentersText}>
							There are no centers in your favorite list.
						</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	// Header right styles
	headerRightContainer: {
		paddingRight: 15,
	},
	// Main Container
	totalContainer: {
		backgroundColor: "#EEEEEE",
		width: "100%",
		height: "100%",
	},
	// LastGame Styles
	sectionTitle: {
		fontSize: 24,
		fontFamily: "InriaSans-Bold",
		marginBottom: 10,
	},
	lastGameContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#EEEEEE",
	},
	// ActionsApp Styles
	actionsAppContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	actionsSpace: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	// Nearby Centers Styles
	centersContainer: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#EEEEEE",
	},
	centersSpace: {
		width: "100%",
		backgroundColor: "#EEEEEE",
	},
	centerInformation: {
		marginBottom: 20,
	},
	noCentersText: {
		color: "red",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 20,
		textAlign: "center",
	},
});

export default MainHomeScreen;
