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
} from "../../utils/NotificationService"; // Importa Message y NotificationManager
// React Icons
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MAX_DISTANCE_WALK = 1000; // 1000 meters

const FieldDetailsScreen = ({ route }) => {
	const center = route.params.centerInfo;
	const userLocation = route.params.userLocation;
	const { addMessage, messages, removeMessage } = useNotificationManager();

	// Navigation
	const navigation = useNavigation();

	// Get Direction to the Center via Google Maps
	handleGetDirections = () => {
		// Update the travel mode based on the distance between the user and the center
		let travelMode = "driving";
		if (center.distance !== null && center.distance !== undefined) {
			travelMode =
				center.distance < MAX_DISTANCE_WALK ? "walking" : "driving";
		}

		const data = {
			source: {
				latitude: userLocation.latitude,
				longitude: userLocation.longitude,
			},
			destination: {
				latitude: center.latitude,
				longitude: center.longitude,
			},
			params: [
				{
					key: "travelmode",
					value: travelMode, // "walking", "bicycling" or "transit", driving
				},
				// {
				// 	key: "dir_action",
				// 	value: "navigate", // this instantly initializes navigation using the given travel mode
				// },
			],
		};

		getDirections(data);
	};

	// Handle Pitch Press
	const handlePitchPress = (pitch) => {
		if (pitch.status === "closed") {
			addMessage(`Sorry, Pitch ${pitch.id} is unavailable at this time. 😅`);
		} else {
			// Navigate to the Pitch Details Screen
			console.log("Pitch " + pitch.id + " pressed");
			// Go to the FieldDetailsScreen
			navigation.navigate("PitchTimeScreen", {
				pitchInfo: pitch,
			});
		}
	};

	// Render the item for the ScrollView
	const renderPitch = (pitch) => (
		<View key={pitch.id} style={styles.pitchContainer}>
			<TouchableOpacity
				activeOpacity={0.5}
				style={
					pitch.status === "closed"
						? styles.pitchButtonClosed
						: styles.pitchButton
				}
				onPress={() => handlePitchPress(pitch)}
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

	if (!center) {
		return (
			<View
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Text>Field not found</Text>
			</View>
		);
	} else {
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
					<Image source={{ uri: center.image }} style={styles.image} />
				</View>

				<View style={styles.mainContainer}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						<Text style={styles.nameCenter}>{center.title}</Text>
						<TouchableOpacity
							style={styles.locationContainer}
							onPress={handleGetDirections}
						>
							<FontAwesome6
								name="location-dot"
								size={20}
								color="black"
							/>
							<Text style={styles.addressCenter}>{center.address}</Text>
						</TouchableOpacity>
						<View style={styles.detailsContainer}>
							<Text style={styles.titleContainer}>Details</Text>
							<Text style={styles.detailsText}>{center.details}</Text>
						</View>
						<View style={styles.availablePitchesContainer}>
							<Text style={styles.titleContainer}>
								Available Pitches
							</Text>
							{center.pitches.map(renderPitch)}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
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
		padding: 30,
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
		marginTop: 20,
	},
	pitchContainer: {
		marginTop: 8,
	},
	pitchButton: {
		backgroundColor: "white",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 15,
	},
	pitchButtonClosed: {
		backgroundColor: "#FFD2DC",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 15,
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

export default FieldDetailsScreen;
