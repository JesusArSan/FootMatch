// React Imports
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { format, isSameDay } from "date-fns";
import { useNavigation } from "@react-navigation/native";
// My components
import Subscription from "../../components/SubscriptionCard";
import DaySelector from "../../components/DaySelector";
import TimeSlot from "../../components/TimeSlot";
import {
	Message,
	useNotificationManager,
} from "../../utils/NotificationService"; // Import Message and NotificationManager
import FloatButton from "../../components/FloatButton";
// Centers functions
import { getPitchOccupancy } from "../../utils/CentersFunctions";
import { createMatch } from "../../utils/MatchesFunctions";

const PitchTimeScreen = ({ route }) => {
	const user = route.params.user || {};
	const navigation = useNavigation();
	const pitchInfo = route.params.pitchInfo;
	const center = route.params.centerInfo;
	const { addMessage, messages, removeMessage } = useNotificationManager();

	const [selectedTime, setSelectedTime] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date
	const [timeSlots, setTimeSlots] = useState([]);
	const [occupancyData, setOccupancyData] = useState([]);
	const [reservationData, setReservationData] = useState({});
	const [matchId, setMatchId] = useState(null);

	// useEffect to fetch occupancy data
	useEffect(() => {
		const fetchOccupancyData = async () => {
			try {
				await getPitchOccupancy(pitchInfo.id, setOccupancyData);
			} catch (error) {
				addMessage("Error loading pitch occupancy.");
			}
		};

		fetchOccupancyData();
	}, [pitchInfo.id]);

	// Update the time slots whenever selectedDate or occupancyData changes
	useEffect(() => {
		const getTimeSlotsForDate = (date) => {
			// Ensure occupancyData is an array before using filter
			const dayOccupancies = Array.isArray(occupancyData)
				? occupancyData.filter((occupancy) =>
						isSameDay(new Date(occupancy.date_time), date)
					)
				: []; // If not an array, initialize dayOccupancies as an empty array.

			// Define all available time slots
			const allSlots = [
				"08:30 AM",
				"09:30 AM",
				"10:30 AM",
				"11:30 AM",
				"12:30 PM",
				"01:30 PM",
				"02:30 PM",
				"03:30 PM",
				"04:30 PM",
				"05:30 PM",
				"06:30 PM",
				"07:30 PM",
				"08:30 PM",
			];

			// Get the current local time
			const now = new Date();
			const localTime = now;

			// Check if the selected date is today
			const isToday = isSameDay(localTime, date);

			// Filter only slots after the current time if it's today
			const filteredSlots = allSlots.filter((slot) => {
				if (!isToday) {
					return true; // If not today, show all slots
				}

				// Parse the slot time into a Date object for comparison
				const [time, period] = slot.split(" ");
				const [hours, minutes] = time.split(":").map(Number);
				let slotDate = new Date(date);
				let slotHours = period === "PM" && hours < 12 ? hours + 12 : hours;
				slotHours = period === "AM" && hours === 12 ? 0 : slotHours;

				slotDate.setHours(slotHours, minutes, 0, 0);

				// Only return slots later than the current local time
				return slotDate.getTime() > localTime.getTime();
			});

			// Mark slots as occupied or not
			return filteredSlots.map((slot) => {
				const occupied = dayOccupancies.some((occupancy) => {
					const occupancyTime = format(
						new Date(occupancy.date_time),
						"hh:mm a"
					).toUpperCase();
					return occupancyTime === slot.toUpperCase();
				});
				return { time: slot, occupied };
			});
		};

		// Always update timeSlots, even if occupancyData is empty
		setTimeSlots(getTimeSlotsForDate(selectedDate));
	}, [selectedDate, occupancyData]);

	const handleSelectTime = (time, occupied) => {
		if (occupied) {
			addMessage(`Time slot at ${time} is occupied.`);
		} else {
			setSelectedTime(time);
		}
	};

	const handleReserve = async () => {
		if (!selectedDate || !selectedTime) {
			addMessage("Please select both a date and a time slot.");
			return;
		}

		const [time, period] = selectedTime.split(" ");
		const [hours, minutes] = time.split(":").map(Number);

		const adjustedHours = period === "PM" && hours < 12 ? hours + 12 : hours;
		const finalHours = period === "AM" && hours === 12 ? 0 : adjustedHours;

		const combinedDateTime = new Date(selectedDate);
		combinedDateTime.setHours(finalHours, minutes, 0, 0);

		const utcDate = new Date(
			combinedDateTime.getTime() -
				combinedDateTime.getTimezoneOffset() * 60000
		);

		const formattedDate = format(combinedDateTime, "yyyy-MM-dd HH:mm");

		const dataReserve = {
			userId: route.params.user.id,
			pitchId: pitchInfo.id,
			matchDate: formattedDate,
		};
		setReservationData(dataReserve);

		try {
			// Create the match and get the match ID
			await createMatch(dataReserve, setMatchId);
		} catch (error) {
			addMessage(`Error creating match: ${error.message}`);
		}
	};

	useEffect(() => {
		if (matchId) {
			// Navigate to the MatchTabNavigator only if the match is created successfully
			navigation.navigate("MatchTabNavigator", {
				user,
				reservation: {
					matchDate: reservationData.matchDate,
					pitchId: reservationData.pitchId,
					user_id: user.id,
				},
				matchId: matchId,
			});
		}
	}, [matchId]);

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

			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Choose the best time</Text>
					<Feather name="calendar" size={30} color="black" />
				</View>
				<View style={styles.daySelector}>
					<DaySelector
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
					/>
				</View>
				<View style={styles.subCard}>
					<Subscription />
				</View>
				<View style={styles.flatListContainer}>
					<Text style={styles.hoursText}>Available Hours</Text>
					<FlatList
						data={timeSlots}
						renderItem={({ item }) => (
							<TimeSlot
								time={item.time}
								occupied={item.occupied}
								selected={item.time === selectedTime}
								onSelect={() =>
									handleSelectTime(item.time, item.occupied)
								}
							/>
						)}
						keyExtractor={(item) => item.time}
						contentContainerStyle={{ paddingBottom: "35%" }} // Increase padding to avoid overlapping
						showsVerticalScrollIndicator={false}
					/>
				</View>
				<FloatButton title="Proceed to Reserve" onPress={handleReserve} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EEEEEE",
	},
	notificationContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
	},
	mainContainer: {
		flex: 1,
		marginTop: 10,
		marginHorizontal: 20,
		paddingHorizontal: 30,
		paddingTop: 30,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#fafafa",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 22,
		fontFamily: "InriaSans-Bold",
	},
	daySelector: {
		marginTop: 20,
	},
	subCard: {
		marginTop: 20,
		height: "11%",
	},
	flatListContainer: {
		flex: 1,
		marginTop: 30,
	},
	hoursText: {
		fontFamily: "InriaSans-Bold",
		fontSize: 15,
		marginBottom: 10,
	},
});

export default PitchTimeScreen;
