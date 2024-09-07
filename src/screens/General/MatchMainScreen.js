// React imports
import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// My components
import CounterDownTimer from "../../components/CounterDownTimer";
import MatchCustom from "../../components/MatchCustom";
import PopUpModal from "../../components/PopUpModal";
import UpdateGameResult from "../../components/UpdateGameResult";
import FloatButton from "../../components/FloatButton";
// Center function
import { getCenterByPitch } from "../../utils/CentersFunctions";
import { getMatchDetails } from "../../utils/MatchesFunctions";

const MatchMainScreen = ({ route }) => {
	// User leader data
	const user = route.params.user || {};
	const reservationData = route.params.reservation || {};
	const [date, hour] = reservationData.matchDate.split(" ");
	const pitchId = route.params.reservation.pitchId || {};
	const matchId = route.params.matchId || {};

	// State to store data and loading state
	const [center, setCenter] = useState(null);
	const [matchDetails, setMatchDetails] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state

	// Declare states for teamA, teamB, and result
	const [teamA, setTeamA] = useState({
		name: "Team A",
		image: "https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100",
	});

	const [teamB, setTeamB] = useState({
		name: "Team B",
		image: "https://b.fssta.com/uploads/application/soccer/team-logos/Placeholder.vresize.250.250.medium.0.png",
	});

	const [result, setResult] = useState({
		teamA: 0,
		teamB: 0,
	});

	// Fetch center data on mount
	useEffect(() => {
		const fetchCenterData = async () => {
			try {
				await getCenterByPitch(pitchId, setCenter);

				setLoading(false); // Set loading to false once data is fetched
			} catch (error) {
				alert("Error loading data.");
				setLoading(false); // Set loading to false even on error
			}
		};

		fetchCenterData();
	}, [pitchId]);

	// useFocusEffect to get info from the match all data using the matchId
	useFocusEffect(
		useCallback(() => {
			const fetchMatchData = async () => {
				try {
					const matchData = await getMatchDetails(matchId);
					setMatchDetails(matchData); // Store match data in state

					// Update teamA and teamB state
					setTeamA({
						name: matchData.team_a_name || "Team A",
						image:
							matchData.team_a_logo ||
							"https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100",
					});

					setTeamB({
						name: matchData.team_b_name || "Team B",
						image:
							matchData.team_b_logo ||
							"https://b.fssta.com/uploads/application/soccer/team-logos/Placeholder.vresize.250.250.medium.0.png",
					});

					// Update result state
					setResult({
						teamA: matchData.team_a_score || 0,
						teamB: matchData.team_b_score || 0,
						status: matchData.status || "sheduled",
					});
				} catch (error) {
					console.error("Error fetching match data:", error);
				}
			};
			fetchMatchData();
		}, [matchId])
	);

	// console.log("matchDetails", matchDetails);

	// State for modal
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	// Render loading state if data is still being fetched
	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={styles.loadingText}>Loading match details...</Text>
			</View>
		);
	}

	// Render actual screen content once data is available
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
						<Text style={styles.detailText}>
							Location: {center?.address || "Unknown"}
						</Text>
						<Text style={styles.detailText}>Date: {date}</Text>
						<Text style={styles.detailText}>Hour: {hour}</Text>
						<Text style={styles.detailText}>Duration: 1 hour</Text>
						<Text style={styles.detailText}>
							Pitch Type: {center?.pitch?.type || "Unknown"}
						</Text>
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(250, 250, 250, 0.8)",
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
		color: "#353A50",
	},
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
