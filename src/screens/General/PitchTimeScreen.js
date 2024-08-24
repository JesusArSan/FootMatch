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

const PitchTimeScreen = ({ route }) => {
	const navigation = useNavigation();
	const pitchInfo = route.params.pitchInfo;
	const center = route.params.centerInfo;
	const { addMessage, messages, removeMessage } = useNotificationManager();

	const [selectedTime, setSelectedTime] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date
	const [timeSlots, setTimeSlots] = useState([]);
	const [occupancyData, setOccupancyData] = useState([]);

	// useEffect to fetch occupancy data
	useEffect(() => {
		const fetchOccupancyData = async () => {
			try {
				await getPitchOccupancy(pitchInfo.id, setOccupancyData);
			} catch (error) {
				addMessage("Error loading pitch occupancy.");
			}
		};

		// Ejecutar la función al cargar la pantalla
		fetchOccupancyData();
	}, [pitchInfo.id]);

	// useEffect to update timeSlots when occupancyData or selectedDate changes
	useEffect(() => {
		const getTimeSlotsForDate = (date) => {
			const dayOccupancies = occupancyData.filter((occupancy) =>
				isSameDay(new Date(occupancy.date_time), date)
			);

			const allSlots = [
				"07:30 AM",
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
				"09:30 PM",
			];

			return allSlots.map((slot) => {
				const occupied = dayOccupancies.some((occupancy) => {
					// Convert the occupancy time to the same format as the slots
					const occupancyTime = format(
						new Date(occupancy.date_time),
						"hh:mm a"
					).toUpperCase();
					return occupancyTime === slot.toUpperCase();
				});
				return { time: slot, occupied };
			});
		};

		// Update timeSlots only when there is occupancyData
		if (occupancyData.length > 0) {
			setTimeSlots(getTimeSlotsForDate(selectedDate));
		}
	}, [selectedDate, occupancyData]);

	const handleSelectTime = (time, occupied) => {
		if (occupied) {
			addMessage(`Time slot at ${time} is occupied.`);
		} else {
			setSelectedTime(time);
		}
	};

	const handleReserve = () => {
		if (!selectedDate || !selectedTime) {
			addMessage("Please select both a date and a time slot.");
		} else {
			// Split time and period (AM/PM)
			const [time, period] = selectedTime.split(" ");
			const [hours, minutes] = time.split(":").map(Number);

			// Adjust hours based on AM/PM
			const adjustedHours =
				period === "PM" && hours < 12 ? hours + 12 : hours;

			// Create a new Date object with the selected date and time
			const combinedDateTime = new Date(selectedDate);
			combinedDateTime.setHours(adjustedHours, minutes, 0, 0);

			// Convert combinedDateTime to UTC if needed
			const utcDate = new Date(
				combinedDateTime.getTime() -
					combinedDateTime.getTimezoneOffset() * 60000
			);

			// Logic to save the reservation match in BD

			const finalDate = utcDate.toISOString();
			navigation.navigate("MatchTabNavigator", {
				user: route.params.user,
				reservation: { pitch: pitchInfo, center: center, date: finalDate },
			});
		}
	};

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
