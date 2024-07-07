// React Imports
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const MenuIcon = () => {
	return (
		<TouchableOpacity style={styles.menu}>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="32"
				height="32"
				viewBox="0 0 50 50"
			>
				<Path
					d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
					fill="white"
				></Path>
			</Svg>
		</TouchableOpacity>
	);
};

export default MenuIcon;

const styles = StyleSheet.create({
	menu: {},
});

// Name file: components/icons/MenuIcon.js
