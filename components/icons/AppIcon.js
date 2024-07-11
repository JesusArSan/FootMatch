// React Imports
import { Image, StyleSheet } from "react-native";

const AppIcon = ({ customHeight = 39, customWidth = 24 }) => {
	return (
		<Image
			source={require("../../assets/images/logo.png")} // Asegúrate de actualizar esta ruta con la ubicación correcta del icono
			style={[styles.icon, { height: customHeight, width: customWidth }]}
		/>
	);
};

export default AppIcon;

const styles = StyleSheet.create({
	icon: {},
});

// Name file: components/icons/AppIcon.js
