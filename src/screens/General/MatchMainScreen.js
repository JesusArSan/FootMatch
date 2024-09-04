// React Imports
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Pressable,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
// My components
import CounterDownTimer from "../../components/CounterDownTimer";
import MatchCustom from "../../components/MatchCustom";
import PopUpModal from "../../components/PopUpModal";
import UpdateGameResult from "../../components/UpdateGameResult";
import FloatButton from "../../components/FloatButton";

let teamA = {
	name: "Team A",
	image: "https://img2.freepnges.com/20180525/qt/avqo99htm.webp",
};
let teamB = {
	name: "Team B",
	image: "https://img2.freepnges.com/20181015/pav/kisspng-real-madrid-c-f-uefa-champions-league-2-1718-l-logo-512x512-dream-league-soccer-imagui-1713927693192.webp",
};
let result = {
	A: 0,
	B: 0,
};

const MatchMainScreen = ({ route }) => {
	// User lider data
	const user = route.params.user || {};
	const reservationData = route.params.reservation || {};
	const matchId = route.params.matchId || {};

	console.log("UserData en MatchMainScreen", user.id);
	console.log("ReservationData en MatchMainScreen", reservationData);
	console.log("MatchId en MatchMainScreen:", matchId);

	// useState
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg?t=st=1723396538~exp=1723400138~hmac=d82321aa904617abebebaa6436b2f76b72acbfafaee89164349a45ba8908920e&w=740",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<PopUpModal isOpen={modalOpen} setIsOpen={setModalOpen}>
				<UpdateGameResult
					teamA={teamA}
					teamB={teamB}
					result={result}
					onPress={handleCloseModal}
				/>
			</PopUpModal>
			<View style={styles.mainContainer}>
				<View style={styles.topGameInfo}>
					<Text style={styles.title}>COMING SOON</Text>
					<MatchCustom teamA={teamA} teamB={teamB} result={result} />
					<View style={{ marginTop: 30 }}>
						<CounterDownTimer targetDate={reservationData.matchDate} />
					</View>
					<View style={styles.confirmResult}>
						<Text style={styles.text}>
							Make sure to confirm the match score!{" "}
						</Text>
						<TouchableOpacity onPress={handleOpenModal}>
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
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: "30%" }} // Increase padding to avoid overlapping
				>
					{/* Game Details Section */}
					<View style={styles.gameDetailsContainer}>
						<Text style={styles.sectionTitle}>Game Details</Text>
						<Text style={styles.detailText}>Date: 10/08/2024</Text>
						<Text style={styles.detailText}>Hour: 19:30</Text>
						<Text style={styles.detailText}>
							Location: Calle Granada, S/N, Chana, 18015 Granada
						</Text>
						<Text style={styles.detailText}>Duration: 1 hour</Text>
						<Text style={styles.detailText}>Players: 5 vs 5</Text>
						<Text style={styles.detailText}>Colour Kit - T.A: 🔴</Text>
						<Text style={styles.detailText}>Colour Kit - T.B: 🟡</Text>
						<Text style={styles.detailText}>League: NaN</Text>
						<Text style={styles.detailText}>Championship: NaN</Text>
						<Text style={styles.detailText}>Price per Person: 2$</Text>
					</View>

					{/* Teams Distribution Section */}
					<View style={styles.teamsContainer}>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.sectionTitle}>
								Automatic teams distribution
							</Text>
							<TouchableOpacity style={styles.doItNowButton}>
								<Text style={styles.doItNowButtonText}>Do it now!</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.detailText}>
							Team A: Juan, Antonino, Roberto, Eustaquio, Paloma.
						</Text>
						<Text style={styles.detailText}>
							Team B: Rocio, Manual, Talia, Ruben, Manuel.
						</Text>
					</View>

					{/* Stats Section */}
					<View style={styles.statsContainer}>
						<Text style={styles.sectionTitle}>Stats</Text>
						<Text style={styles.detailText}>
							Goals: Antonio, Roberto, Rocio
						</Text>
						<Text style={styles.detailText}>
							Assists: Juan, Talia, Paloma
						</Text>
					</View>
				</ScrollView>
				<FloatButton title="Match Ended" customOpacity={0.5} />
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
	gameDetailsContainer: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	sectionTitle: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		color: "#353A50",
		marginBottom: 10,
	},
	detailText: {
		fontSize: 14,
		fontFamily: "InriaSans-Regular",
		color: "#353A50",
		marginBottom: 5,
	},
	teamsContainer: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	doItNowButton: {
		backgroundColor: "#091442",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		marginVertical: 10,
		alignSelf: "center",
		position: "absolute",
		right: -9,
		top: -10,
	},
	doItNowButtonText: {
		color: "white",
		fontSize: 10,
		fontFamily: "InriaSans-Bold",
		textAlign: "center",
	},
	statsContainer: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	scrollView: {
		marginBottom: 0,
		paddingHorizontal: 30,
	},
});

export default MatchMainScreen;
