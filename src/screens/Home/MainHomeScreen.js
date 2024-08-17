// React Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
// Dummy Data
import centers from "../../assets/data/sportCenters.json";

const MainHomeScreen = ({ route }) => {
	// State to store the fav centers
	const [favCenters, setCenters] = useState([]);

	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	const user = route.params.user || {};

	// Update the fav centers list
	const updateCentersList = async () => {
		await getFavCenters(user.id, setCenters);
	};
	// Update the fav centers list on component mount
	useEffect(() => {
		updateCentersList();
	}, []);

	const handleCenterPress = (center) => {
		console.log("Center " + center.id + " pressed");
		navigation.navigate("FieldDetailsScreen", {
			centerInfo: center,
		});
	};

	const handleMessagePress = () => {
		navigation.navigate("ChatStackNavigator", {
			user: user,
		});
	};

	// Update navigation params to include the handler
	React.useEffect(() => {
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
					<MyLastGame />
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

				{/* Some Nearby Centers */}
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
