// React Imports
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const MagnifyingGlassIcon = ({ size = 36 }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 33 33"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M13.86 1.97998C7.65705 1.97998 2.64001 6.99701 2.64001 13.2C2.64001 19.4029 7.65705 24.42 13.86 24.42C16.0746 24.42 18.1242 23.7703 19.8619 22.6669L27.9675 30.7725L30.7725 27.9675L22.77 19.9856C24.2086 18.0984 25.08 15.7601 25.08 13.2C25.08 6.99701 20.063 1.97998 13.86 1.97998ZM13.86 4.61998C18.6115 4.61998 22.44 8.4485 22.44 13.2C22.44 17.9515 18.6115 21.78 13.86 21.78C9.10853 21.78 5.28001 17.9515 5.28001 13.2C5.28001 8.4485 9.10853 4.61998 13.86 4.61998Z"
				fill="white"
			/>
		</Svg>
	);
};

export default MagnifyingGlassIcon;

const styles = StyleSheet.create({
	magnifyingGlass: {},
});

// Name file: components/icons/MagnifyingGlassIcon.js
