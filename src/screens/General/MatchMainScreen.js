// React Imports
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Pressable,
	TouchableOpacity,
	Image,
} from "react-native";
// My components
import CounterDownTimer from "../../components/CounterDownTimer";
import MatchCustom from "../../components/MatchCustom";

const MatchMainScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};
	const centerInfo = route.params.reservation.center || {};
	const pitchInfo = route.params.reservation.pitch || {};
	const dateReservation = route.params.reservation.date || {};

	console.log("UserData en MatchMainScreen", user.id);
	// console.log(centerInfo);
	// console.log(pitchInfo);
	console.log("Fecha Reserva:", dateReservation);

	const handleUpdateResult = () => {
		console.log("Update Result");
	};

	const teamA = {
		name: "Team A",
		image: "https://img2.freepnges.com/20180525/qt/avqo99htm.webp",
	};
	const teamB = {
		name: "Team B",
		image: "https://img2.freepnges.com/20181015/pav/kisspng-real-madrid-c-f-uefa-champions-league-2-1718-l-logo-512x512-dream-league-soccer-imagui-1713927693192.webp",
	};
	const result = {
		A: 0,
		B: 0,
	};

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<View style={styles.mainContainer}>
				<View style={styles.topGameInfo}>
					<Text style={styles.title}>COMING SOON</Text>
					<MatchCustom teamA={teamA} teamB={teamB} result={result} />
					<View style={{ marginTop: 30 }}>
						<CounterDownTimer targetDate={dateReservation} />
					</View>
					<View style={styles.confirmResult}>
						<Text style={styles.text}>
							Make sure to confirm the match score!{" "}
						</Text>
						<TouchableOpacity onPress={handleUpdateResult}>
							<Text
								style={[
									styles.text,
									{ color: "rgba(53, 98, 166, 0.6)" },
								]}
							>
								Update now{" "}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.divider} />
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingVertical: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "rgba(250, 250, 250, 0.8)",
		marginTop: 30,
		marginHorizontal: 20,
	},
	topGameInfo: {
		marginTop: "24%",
		alignItems: "center",
		width: "100%",
	},
	confirmResult: {
		flexDirection: "row",
		marginTop: 30,
	},
	title: {
		fontSize: 26,
		fontFamily: "InriaSans-Bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 12,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
		marginBottom: 20,
	},
	divider: {
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		width: "100%",
	},
});

export default MatchMainScreen;
