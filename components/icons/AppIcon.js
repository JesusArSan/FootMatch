// React Imports
import { Image, StyleSheet } from "react-native";

const AppIcon = () => {
	return (
		<Image
			source={require("../../assets/images/logo.png")} // Asegúrate de actualizar esta ruta con la ubicación correcta del icono
			style={styles.icon}
		/>
	);
};

export default AppIcon;

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 39,
	},
});

// Name file: components/icons/AppIcon.js
