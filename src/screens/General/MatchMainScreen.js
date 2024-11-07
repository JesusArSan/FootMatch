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
	Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// My components
import CounterDownTimer from "../../components/CounterDownTimer";
import MatchCustom from "../../components/MatchCustom";
import PopUpModal from "../../components/PopUpModal";
import UpdateGameResult from "../../components/UpdateGameResult";
import UpdateStatsParticipants from "../../components/UpdateStatsParticipants";
import FloatButton from "../../components/FloatButton";
// Center function
import { getCenterByPitch } from "../../utils/CentersFunctions";
import {
	getMatchDetails,
	setMatchCompleted,
	setNewLocalTeamToMatch,
	setNewVisitorTeamToMatch,
	removeAllPlayersFromMatch,
	addPlayersToMatchFromTeam,
	setMatchGoals,
	getMatchParticipants,
	getMatchDone,
} from "../../utils/MatchesFunctions";

const MatchMainScreen = ({ route }) => {
	// User leader data
	const user = route.params.user || {};
	const reservationData = route.params.reservation || {};
	const [date, hour] = reservationData.matchDate.split(" ");
	const pitchId = route.params.reservation.pitchId || {};
	const matchId = route.params.matchId || {};
	const [participants, setParticipants] = useState([]);
	// Bool userIsCreator
	const userIsCreator = route.params.userIsCreator || false;
	// No time left
	const [noTimeLeft, setNoTimeLeft] = useState(false);
	const [matchcompleted, setMatchcompleted] = useState(false);

	// State for the additional modal
	const [additionalModalOpen, setAdditionalModalOpen] = useState(false);

	// New state to track if results have been successfully saved
	const [resultsSaved, setResultsSaved] = useState(false);

	// State to store data and loading state
	const [center, setCenter] = useState(null);
	const [matchDetails, setMatchDetails] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state

	// Declare states for teamA, teamB, and result
	const [teamA, setTeamA] = useState({
		name: "Team A",
		image: "https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100",
		isCustom: false,
		idTeam: "",
	});

	const [teamB, setTeamB] = useState({
		name: "Team B",
		image: "https://b.fssta.com/uploads/application/soccer/team-logos/Placeholder.vresize.250.250.medium.0.png",
		isCustom: false,
		idTeam: "",
	});

	const [result, setResult] = useState({
		teamA: 0,
		teamB: 0,
		status: matchDetails?.status || "sheduled",
	});

	// Update match with custom teams when both are custom
	useEffect(() => {
		const updateMatchWithCustomTeams = async () => {
			if (teamA.isCustom && teamB.isCustom) {
				try {
					await removeAllPlayersFromMatch(matchId);
					await addPlayersToMatchFromTeam(matchId, teamA.idTeam);
					await addPlayersToMatchFromTeam(matchId, teamB.idTeam);

					// const updatedMatchData = await getMatchDetails(matchId);
					// setMatchDetails(updatedMatchData);
				} catch (error) {
					console.error("Error updating match with custom teams:", error);
					Alert.alert(
						"Error",
						"Failed to update match with custom teams."
					);
				}
			}
		};

		updateMatchWithCustomTeams();
	}, [teamA, teamB, matchId]);

	// useEffect for load participants when additionalModalOpen is true
	useEffect(() => {
		if (additionalModalOpen) {
			const fetchParticipants = async () => {
				try {
					await getMatchParticipants(matchId, setParticipants);
					console.log("Participants fetched:", participants); // Depuración
				} catch (error) {
					console.error("Error fetching participants:", error);
				}
			};
			fetchParticipants();
		}
	}, [additionalModalOpen, matchId]);

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
					setMatchDetails(matchData); // Update state with match data

					matchData.status === "completed"
						? setMatchcompleted(true)
						: setMatchcompleted(false);

					// Check if the match is done
					const matchDoneStatus = await getMatchDone(matchId);
					if (matchDoneStatus) {
						setResultsSaved(true); // Update state to indicate results are saved
					}

					// Update team states with match data
					setTeamA({
						name: matchData.team_a_name || "Team A",
						image:
							matchData.team_a_logo ||
							"https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100",
						isCustom: matchData.team_a_is_custom,
						idTeam: matchData.team_a_id,
					});

					setTeamB({
						name: matchData.team_b_name || "Team B",
						image:
							matchData.team_b_logo ||
							"https://b.fssta.com/uploads/application/soccer/team-logos/Placeholder.vresize.250.250.medium.0.png",
						isCustom: matchData.team_b_is_custom,
						idTeam: matchData.team_b_id,
					});

					// Update result state with match data
					setResult({
						teamA: matchData.team_a_score || 0,
						teamB: matchData.team_b_score || 0,
						status: matchData.status || "scheduled",
					});
				} catch (error) {
					console.error("Error fetching match data:", error);
				}
			};
			fetchMatchData();
		}, [matchId])
	);

	// State for modal
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleSaveScoreModal = async (scoreA, scoreB) => {
		try {
			await setMatchGoals(matchId, scoreA, scoreB);
			setResult({ teamA: scoreA, teamB: scoreB, status: "completed" });
			setResultsSaved(true); // Update state to indicate results are saved
			handleOpenAdditionalModal();
		} catch (error) {
			console.error("Failed to set match score:", error);
		}
		setModalOpen(false);
	};

	// Function to open the additional modal after saving the score
	const handleOpenAdditionalModal = () => {
		setAdditionalModalOpen(true);
	};

	// Function to close the additional modal
	const handleCloseAdditionalModal = () => {
		setAdditionalModalOpen(false);
	};

	// Handle no time left
	const handleNoTimeLeft = () => {
		setNoTimeLeft(true);
	};

	const handleMatchcompleted = async () => {
		setMatchcompleted(true);

		// Make the match "completed"
		await setMatchCompleted(matchId);
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

	const handleSetNewLocalTeam = async (match_id, team_id) => {
		if (!noTimeLeft && userIsCreator) {
			try {
				await setNewLocalTeamToMatch(match_id, team_id);
				// Fetch updated match data and update team state
				const updatedMatchData = await getMatchDetails(match_id);
				setTeamA({
					name: updatedMatchData.team_a_name || "Team A",
					image:
						updatedMatchData.team_a_logo ||
						"https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100",
					isCustom: updatedMatchData.team_a_is_custom,
					idTeam: updatedMatchData.team_a_id,
				});
			} catch (error) {
				console.error("Error setting local team:", error);
				Alert.alert("Error", "Failed to set local team.");
			}
		} else {
			Alert.alert(
				"Not Allowed",
				"Only the creator can set teams before the time expires."
			);
		}
	};

	const handleSetNewVisitorTeam = async (match_id, team_id) => {
		if (!noTimeLeft && userIsCreator) {
			try {
				await setNewVisitorTeamToMatch(match_id, team_id);
				// Fetch updated match data and update team state
				const updatedMatchData = await getMatchDetails(match_id);
				setTeamB({
					name: updatedMatchData.team_b_name || "Team B",
					image:
						updatedMatchData.team_b_logo ||
						"https://b.fssta.com/uploads/application/soccer/team-logos/Placeholder.vresize.250.250.medium.0.png",
					isCustom: updatedMatchData.team_b_is_custom,
					idTeam: updatedMatchData.team_b_id,
				});
			} catch (error) {
				console.error("Error setting visitor team:", error);
				Alert.alert("Error", "Failed to set visitor team.");
			}
		} else {
			Alert.alert(
				"Not Allowed",
				"Only the creator can set teams before the time expires."
			);
		}
	};

	// Render actual screen content once data is available
	return (
		<ImageBackground
			source={{
				uri: "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885911.jpg",
			}}
			style={{ flex: 1, resizeMode: "cover" }}
		>
			<PopUpModal isOpen={modalOpen} setIsOpen={setModalOpen}>
				<UpdateGameResult
					teamA={teamA}
					teamB={teamB}
					result={result}
					onPressClose={handleCloseModal}
					onPressSave={handleSaveScoreModal}
				/>
			</PopUpModal>
			<PopUpModal
				isOpen={additionalModalOpen}
				setIsOpen={setAdditionalModalOpen}
			>
				<UpdateStatsParticipants
					isOpen={additionalModalOpen}
					onClose={handleCloseAdditionalModal}
					matchId={matchId}
					result={result} // Passing result to track team scores
					teamAId={teamA.idTeam}
					teamBId={teamB.idTeam}
				/>
			</PopUpModal>
			<View style={styles.mainContainer}>
				<View style={styles.topGameInfo}>
					{/* Title */}
					{noTimeLeft ? (
						matchcompleted ? (
							<Text style={styles.title}>Finished</Text>
						) : (
							<Text style={styles.title}>It's the Time!</Text>
						)
					) : (
						<Text style={styles.title}>COMING SOON</Text>
					)}
					<MatchCustom
						matchId={matchId}
						teamA={teamA}
						teamB={teamB}
						result={result}
						isLeader={userIsCreator}
						noTimeLeft={noTimeLeft}
						onPressLocal={handleSetNewLocalTeam}
						onPressVisitor={handleSetNewVisitorTeam}
					/>
					<View style={{ marginTop: 30 }}>
						<CounterDownTimer
							targetDate={reservationData.matchDate}
							handleNoTimeLeft={handleNoTimeLeft}
						/>
					</View>
					{userIsCreator ? (
						noTimeLeft ? (
							<View style={styles.confirmResult}>
								{matchcompleted ? (
									resultsSaved ? (
										<Text style={styles.text}>
											Results successfully recorded.
										</Text>
									) : (
										<>
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
													Update now
												</Text>
											</TouchableOpacity>
										</>
									)
								) : (
									<>
										<Text style={styles.text}>
											Please update the match status to{" "}
										</Text>
										<TouchableOpacity onPress={handleMatchcompleted}>
											<Text
												style={[
													styles.text,
													{ color: "rgba(53, 98, 166, 0.6)" },
												]}
											>
												"Finished"
											</Text>
										</TouchableOpacity>
									</>
								)}
							</View>
						) : null
					) : null}
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
							{userIsCreator ? (
								<TouchableOpacity style={styles.doItNowButton}>
									<Text style={styles.doItNowButtonText}>
										Do it now!
									</Text>
								</TouchableOpacity>
							) : null}
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
	},
	divider: {
		marginTop: 20,
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
