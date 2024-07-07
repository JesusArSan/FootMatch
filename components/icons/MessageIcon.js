// React Imports
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const MessageIcon = () => {
	return (
		<TouchableOpacity style={styles.message}>
			<Svg
				fill="white"
				height="31"
				viewBox="0 0 22 22"
				width="31"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					clip-rule="evenodd"
					d="M19.9343 2.65149L3.11927 9.57533C2.71991 9.73977 2.47125 10.142 2.50267 10.5728C2.53409 11.0035 2.83849 11.3654 3.25748 11.4701L9.54401 13.0418L10.7929 11.7929L19.7929 2.7929L19.9343 2.65149ZM10.9582 14.456L12.5299 20.7425C12.6346 21.1615 12.9965 21.4659 13.4273 21.4974C13.858 21.5288 14.2603 21.2801 14.4247 20.8808L21.3486 4.06566L21.2071 4.20711L12.2071 13.2071L10.9582 14.456Z"
					fill="white"
					fill-rule="evenodd"
				/>
			</Svg>
		</TouchableOpacity>
	);
};

export default MessageIcon;

const styles = StyleSheet.create({
	message: {},
});

// Name file: components/icons/MessageIcon.js
