// React Imports
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// My components
import MyLastGame from "../../components/MyLastGame.js";
import CustomActionApp from "../../components/CustomActionApp.js";
import CustomCenter from "../../components/CustomCenter.js";
// My Styles
import { ScrollView } from "react-native-gesture-handler";

const MainHomeScreen = ({ route }) => {
	// Navigation between screens
	const navigation = useNavigation();

	// Get the user data from the route params
	const user = route.params.user || {};

	// DESIGN NOTE: The following code is a mockup of the data that will be displayed in the app.
	const center1 = {
		id: 1,
		latitude: 37.18817,
		longitude: -3.60667,
		price: 30,
		title: "Granada Sports Arena",
		numberOfStars: 4,
		rating: 4.5,
		image: "https://almazan.es/wp-content/uploads/2021/04/POLIDEPORTIVO-EL-FERIAL-Almazan-2.jpg",
		address: "C. Estrellas, S/N, Chana, 18015 Granada",
		distance: 515,
	};
	const center2 = {
		id: 2,
		latitude: 37.17463,
		longitude: -3.59855,
		price: 25,
		title: "Albaicín Fitness Center",
		numberOfStars: 5,
		rating: 4.8,
		image: "https://elcirculo.es/wp-content/uploads/2022/03/Colegio-Circulo-ESO-BACH-CICLOS-COMEDOR-Y-POLIDEPORTIVO-08282020_081434.jpg",
		address: "C. Luna, S/N, Albaicín, 18010 Granada",
		distance: 1781,
	};

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
						<CustomActionApp actionType="1" />
						<CustomActionApp actionType="2" />
					</View>
					<View style={styles.actionsSpace}>
						<CustomActionApp actionType="3" />
						<CustomActionApp actionType="4" />
					</View>
				</View>

				{/* Some Nearby Centers */}
				<View style={styles.centersContainer}>
					<Text style={styles.sectionTitle}>Nearby Centers</Text>
					<View style={[styles.centersSpace, { marginBottom: 20 }]}>
						<TouchableOpacity
							activeOpacity={0.75}
							onPress={() =>
								navigation.navigate("FieldDetailsScreen", {
									centerInfo: center1,
								})
							}
						>
							<CustomCenter
								name={center1.title}
								address={center1.address}
								imgUrl={center1.image}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.centersSpace}>
						<TouchableOpacity
							activeOpacity={0.75}
							onPress={() =>
								navigation.navigate("FieldDetailsScreen", {
									centerInfo: center2,
								})
							}
						>
							<CustomCenter
								name={center2.title}
								address={center2.address}
								imgUrl={center2.image}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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

	// borrar
	others: {
		alignItems: "center",
		backgroundColor: "yellow",
	},
	footer: {
		fontSize: 16,
		color: "gray",
		textAlign: "center",
	},
});

export default MainHomeScreen;
