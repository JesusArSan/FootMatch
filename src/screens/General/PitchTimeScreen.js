// Reacct Imports
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { format, isSameDay } from "date-fns";
// My components
import Subscription from "../../components/SubscriptionCard";
import DaySelector from "../../components/DaySelector";
import TimeSlot from "../../components/TimeSlot";
import {
	Message,
	useNotificationManager,
} from "../../utils/NotificationService"; // Import Message and NotificationManager
import FloatButton from "../../components/FloatButton";

const PitchTimeScreen = ({ route }) => {
	const pitchInfo = route.params.pitchInfo;
	const center = route.params.centerInfo;
	const { addMessage, messages, removeMessage } = useNotificationManager();

	const [selectedTime, setSelectedTime] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date
	const [timeSlots, setTimeSlots] = useState([]);

	useEffect(() => {
		const getTimeSlotsForDate = (date) => {
			const dayOccupancy = pitchInfo.occupancy.find((day) =>
				isSameDay(new Date(day.date), date)
			);

			// Available time slots
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

			if (dayOccupancy) {
				return allSlots.map((slot) => {
					const occupied = dayOccupancy.hours.some(
						(hour) => hour.time === slot && hour.status === "occupied"
					);
					return { time: slot, occupied };
				});
			} else {
				return allSlots.map((slot) => ({ time: slot, occupied: false }));
			}
		};

		setTimeSlots(getTimeSlotsForDate(selectedDate));
	}, [selectedDate, pitchInfo]);

	const handleSelectTime = (time, occupied) => {
		if (occupied) {
			addMessage(`Time slot at ${time} is occupied.`);
		} else {
			setSelectedTime(time);
		}
	};

	const handleCheckout = () => {
		if (!selectedDate || !selectedTime) {
			addMessage("Please select both a date and a time slot.");
		} else {
			console.log(
				`Proceed to Checkout with: Date: ${format(
					selectedDate,
					"yyyy-MM-dd"
				)}, Time: ${selectedTime}`
			);
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
						contentContainerStyle={{ paddingBottom: 100 }} // Increase padding to avoid overlapping
						showsVerticalScrollIndicator={false}
					/>
				</View>
				<FloatButton title="Proceed to Reserve" onPress={handleCheckout} />
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
