import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

const CustomCenter = ({
	name,
	address,
	distance,
	imgUrl = "https://economia3.com/wp-content/themes/economia3/inc/component/img/no-image.png",
	isSelected = 0,
}) => {
	const backgroundColorAnim = useRef(new Animated.Value(0)).current; // Controla la animación

	useEffect(() => {
		// Animation for background color
		Animated.timing(backgroundColorAnim, {
			// if isSelected is true, animate to 1, else animate to 0
			toValue: isSelected ? 1 : 0,
			// 1000 ms
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}, [isSelected]);

	const animatedStyle = {
		backgroundColor: backgroundColorAnim.interpolate({
			inputRange: [0, 1],
			outputRange: ["#FAFAFA", "#C7DDFF"], // Color de fondo cambia de gris claro a gris más oscuro cuando está seleccionado
		}),
	};

	return (
		<Animated.View style={[styles.centerContainer, animatedStyle]}>
			<View style={styles.infoCenter}>
				<Text style={styles.nameCenter}>{name}</Text>
				<Text style={styles.addressCenter}>{address}</Text>
				{distance ? (
					<Text style={styles.distance}>
						{(distance / 1000).toFixed(2)} km
					</Text>
				) : null}
			</View>
			<Image source={{ uri: imgUrl }} style={styles.image} />
		</Animated.View>
	);
};

export default CustomCenter;

// Estilos, incluyendo sombras
const shadowStyles = {
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 6,
};

const styles = StyleSheet.create({
	centerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 25,
		padding: 18,
		paddingVertical: 25,
		...shadowStyles,
	},
	infoCenter: {
		width: "50%",
	},
	nameCenter: {
		fontSize: 17,
		fontFamily: "InriaSans-Bold",
		marginBottom: 8,
	},
	addressCenter: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
	},
	image: {
		width: 148,
		height: 85,
		borderRadius: 20,
	},
	distance: {
		fontSize: 13,
		fontFamily: "InriaSans-Regular",
		marginTop: 5,
	},
});
