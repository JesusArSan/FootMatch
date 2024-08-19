// FieldDetailScreen.js
import * as React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// Google Maps Directions
import getDirections from "react-native-google-maps-directions";
// My imports
import {
	Message,
	useNotificationManager,
} from "../../utils/NotificationService"; // Import Message y NotificationManager
import ImageGallery from "../../components/ImageGallery";
// React Icons
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MAX_DISTANCE_WALK = 1000; // 1000 meters

const CenterDetailsScreen = ({ route }) => {
	const center = route.params.centerInfo || [];
	const userLocation = route.params.userLocation;
	const { addMessage, messages, removeMessage } = useNotificationManager();

	// Navigation
	const navigation = useNavigation();

	// Get Direction to the Center via Google Maps
	const handleGetDirections = () => {
		if (
			!userLocation ||
			!center ||
			!userLocation.latitude ||
			!userLocation.longitude ||
			!center.latitude ||
			!center.longitude
		) {
			addMessage("Unable to get directions. Missing location data.");
			return;
		}

		// Configure the travel mode
		let travelMode = "driving";
		if (center.distance !== null && center.distance !== undefined) {
			travelMode =
				center.distance < MAX_DISTANCE_WALK ? "walking" : "driving";
		}

		// Data for the Google Maps Directions
		const data = {
			source: {
				latitude: parseFloat(userLocation.latitude), // Asegúrate de que sea float
				longitude: parseFloat(userLocation.longitude), // Asegúrate de que sea float
			},
			destination: {
				latitude: parseFloat(center.latitude), // Asegúrate de que sea float
				longitude: parseFloat(center.longitude), // Asegúrate de que sea float
			},
			params: [
				{
					key: "travelmode",
					value: travelMode, // "walking", "bicycling" or "transit", driving
				},
			],
		};

		// Get Directions
		getDirections(data);
	};

	// Handle Pitch Press
	const handlePitchPress = (center, pitch) => {
		if (pitch.status === "closed") {
			addMessage(`Sorry, Pitch ${pitch.id} is unavailable at this time. 😅`);
		} else {
			// Go to the CenterDetailsScreen
			navigation.navigate("PitchTimeScreen", {
				centerInfo: center,
				pitchInfo: pitch,
			});
		}
	};

	// Render the item for the ScrollView
	const renderPitch = ({ center, pitch }) => (
		<View key={pitch.id} style={styles.pitchContainer}>
			<TouchableOpacity
				activeOpacity={0.5}
				style={
					pitch.status === "closed"
						? styles.pitchButtonClosed
						: styles.pitchButton
				}
				onPress={() => handlePitchPress(center, pitch)}
			>
				<View style={styles.pitchRow}>
					<View>
						<Text
							style={[
								styles.pitchText,
								{ fontFamily: "InriaSans-Bold" },
							]}
						>
							Pitch N° {pitch.id}.
						</Text>
						<Text style={styles.pitchText}>{pitch.type}</Text>
					</View>
					<View style={styles.pitchInfoView}>
						{pitch.status === "closed" ? (
							<AntDesign name="close" size={30} color="#FF6464" />
						) : (
							<Ionicons name="chevron-forward" size={30} color="black" />
						)}
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.notificationContainer}>
				{messages.map((message) => (
					<Message
						key={message.id}
						message={message.text}
						onHide={() => removeMessage(message.id)}
						colorB={"#FF6464"}
						colorF={"white"}
					/>
				))}
			</View>

			<View style={styles.imageContainer}>
				<ImageGallery images={center.images || []} />
			</View>

			<View style={styles.mainContainer}>
				<Text style={styles.nameCenter}>{center.title}</Text>
				<TouchableOpacity
					style={styles.locationContainer}
					onPress={handleGetDirections}
				>
					<FontAwesome6 name="location-dot" size={20} color="black" />
					<Text style={styles.addressCenter}>{center.address}</Text>
				</TouchableOpacity>

				<ScrollView
					style={{ marginTop: 10 }}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<View style={styles.detailsContainer}>
						<Text style={styles.titleContainer}>Details</Text>
						<Text style={styles.detailsText}>{center.details}</Text>
					</View>

					<View style={styles.availablePitchesContainer}>
						<Text style={styles.titleContainer}>Available Pitches</Text>

						<View>
							{center.pitches && center.pitches.length > 0 ? (
								center.pitches.map((pitch) =>
									renderPitch({ center, pitch })
								)
							) : (
								<Text style={styles.noPitchesText}>
									No available pitches
								</Text>
							)}
						</View>
					</View>
				</ScrollView>
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
		height: "35%",
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
	locationContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 10,
	},
	addressCenter: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
		marginLeft: 7,
	},
	nameCenter: {
		fontSize: 22,
		fontFamily: "InriaSans-Bold",
	},
	detailsContainer: {
		marginTop: 20,
	},
	titleContainer: {
		fontFamily: "InriaSans-Bold",
		fontSize: 15,
	},
	detailsText: {
		fontFamily: "InriaSans-Regular",
		fontSize: 15,
		marginTop: 4,
		textAlign: "justify",
	},
	availablePitchesContainer: {
		flex: 1,
		marginTop: 20,
		marginBottom: 20,
	},
	pitchContainer: {
		marginTop: 8,
		paddingHorizontal: 1,
	},
	pitchButton: {
		backgroundColor: "white",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 15,
		elevation: 1,
	},
	pitchButtonClosed: {
		backgroundColor: "#FFD2DC",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 15,
		elevation: 1,
	},
	pitchText: {
		fontSize: 15,
		fontFamily: "InriaSans-Regular",
		alignItems: "center",
	},
	pitchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	pitchInfoView: {
		marginBottom: 3,
		justifyContent: "flex-end",
	},
});

export default CenterDetailsScreen;
