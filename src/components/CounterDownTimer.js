import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CountDownTimer = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const now = Date.now(); // Utilizamos Date.now() para obtener la marca de tiempo actual en milisegundos
		const target = new Date(targetDate).getTime(); // Convertimos targetDate a milisegundos
		const difference = target - now;

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		} else {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		console.log("TimeLeft", timeLeft);

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	return (
		<View style={styles.container}>
			<View style={styles.timerBox}>
				<Text style={styles.timerText}>
					{String(timeLeft.days).padStart(2, "0")}
				</Text>
			</View>
			<Text style={styles.colon}>:</Text>
			<View style={styles.timerBox}>
				<Text style={styles.timerText}>
					{String(timeLeft.hours).padStart(2, "0")}
				</Text>
			</View>
			<Text style={styles.colon}>:</Text>
			<View style={styles.timerBox}>
				<Text style={styles.timerText}>
					{String(timeLeft.minutes).padStart(2, "0")}
				</Text>
			</View>
			<Text style={styles.colon}>:</Text>
			<View style={styles.timerBox}>
				<Text style={styles.timerText}>
					{String(timeLeft.seconds).padStart(2, "0")}
				</Text>
			</View>
		</View>
	);
};

export default CountDownTimer;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	timerBox: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: "#D3D3D3",
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
	},
	timerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
	},
	colon: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		marginHorizontal: 5,
	},
});
