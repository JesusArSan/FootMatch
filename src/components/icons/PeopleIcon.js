// React Imports
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const PeopleIcon = () => {
	return (
		<Image
			source={require("../../assets/images/icons/equipo.png")}
			style={styles.peopleIcon}
		/>
	);
};

export default PeopleIcon;

const styles = StyleSheet.create({
	peopleIcon: {
		width: 61,
		height: 61,
	},
});

// Name file: components/icons/BallMagnifyingGlassIcon.js
