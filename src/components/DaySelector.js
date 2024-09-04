import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";
import { format, addDays } from "date-fns";

// Function to generate the days of the current week starting from today
const getDaysOfWeek = (startDate) => {
	const days = [];
	for (let i = 0; i < 7; i++) {
		const date = addDays(startDate, i);
		days.push({
			day: format(date, "EEE"), // 'EEE' returns abbreviated day name
			date: format(date, "d"),
			fullDate: date,
		});
	}
	return days;
};

const DayItem = ({ item, onPress, isSelected }) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}
	>
		<Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
			{item.day}
		</Text>
		<Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
			{item.date}
		</Text>
	</TouchableOpacity>
);

const DaySelector = ({ selectedDate, onSelectDate }) => {
	const [daysOfWeek, setDaysOfWeek] = useState([]);

	useEffect(() => {
		const today = new Date();
		const weekDays = getDaysOfWeek(today);
		setDaysOfWeek(weekDays);
	}, []);

	return (
		<FlatList
			data={daysOfWeek}
			renderItem={({ item }) => (
				<DayItem
					item={item}
					onPress={() => onSelectDate(item.fullDate)}
					isSelected={
						selectedDate &&
						format(item.fullDate, "yyyy-MM-dd") ===
							format(selectedDate, "yyyy-MM-dd")
					}
				/>
			)}
			keyExtractor={(item) => item.fullDate.toString()}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	dayContainer: {
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
		width: 56,
		marginHorizontal: 5,
	},
	selectedDayContainer: {
		backgroundColor: "#5C8AD1",
	},
	dayText: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	dateText: {
		fontSize: 16,
		fontFamily: "InriaSans-Bold",
	},
	selectedDayText: {
		color: "#fafafa",
	},
	selectedDateText: {
		color: "#fafafa",
	},
});

export default DaySelector;
