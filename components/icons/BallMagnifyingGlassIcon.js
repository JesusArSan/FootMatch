// React Imports
import { StyleSheet } from "react-native";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

const BallMagnifyingGlassIcon = () => {
	return (
		<Svg
			width="52"
			height="52"
			viewBox="0 0 52 52"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			styles={styles.ballMagnifyingGlass}
		>
			<Path
				d="M21.84 3.12C12.0657 3.12 4.16003 11.0256 4.16003 20.8C4.16003 30.5744 12.0657 38.48 21.84 38.48C25.3297 38.48 28.5594 37.4562 31.2975 35.7175L44.07 48.49L48.49 44.07L35.88 31.4925C38.1469 28.5187 39.52 24.8341 39.52 20.8C39.52 11.0256 31.6144 3.12 21.84 3.12ZM21.84 7.27999C29.3272 7.27999 35.36 13.3128 35.36 20.8C35.36 28.2872 29.3272 34.32 21.84 34.32C14.3528 34.32 8.32003 28.2872 8.32003 20.8C8.32003 13.3128 14.3528 7.27999 21.84 7.27999Z"
				fill="black"
			/>
			<G clipPath="url(#clip0_129_57)">
				<Path
					d="M17.5156 19.75L22 16.5L26.4844 19.75L24.7812 25H19.2344L17.5156 19.75ZM22 7C23.8958 7 25.7083 7.36979 27.4375 8.10938C29.1667 8.84896 30.6562 9.84375 31.9062 11.0938C33.1562 12.3438 34.151 13.8333 34.8906 15.5625C35.6302 17.2917 36 19.1042 36 21C36 22.8958 35.6302 24.7083 34.8906 26.4375C34.151 28.1667 33.1562 29.6562 31.9062 30.9062C30.6562 32.1562 29.1667 33.151 27.4375 33.8906C25.7083 34.6302 23.8958 35 22 35C20.1042 35 18.2917 34.6302 16.5625 33.8906C14.8333 33.151 13.3438 32.1562 12.0938 30.9062C10.8438 29.6562 9.84896 28.1667 9.10938 26.4375C8.36979 24.7083 8 22.8958 8 21C8 19.1042 8.36979 17.2917 9.10938 15.5625C9.84896 13.8333 10.8438 12.3438 12.0938 11.0938C13.3438 9.84375 14.8333 8.84896 16.5625 8.10938C18.2917 7.36979 20.1042 7 22 7ZM31.6719 28.0938C33.224 25.9792 34 23.6146 34 21V20.9531L32.4062 22.3438L28.6562 18.8438L29.6406 13.7969L31.7344 13.9844C30.1719 11.8385 28.1458 10.3698 25.6562 9.57812L26.4844 11.5156L22 14L17.5156 11.5156L18.3438 9.57812C15.8542 10.3698 13.8281 11.8385 12.2656 13.9844L14.375 13.7969L15.3438 18.8438L11.5938 22.3438L10 20.9531V21C10 23.6146 10.776 25.9792 12.3281 28.0938L12.7969 26.0312L17.8906 26.6562L20.0625 31.3125L18.25 32.3906C19.4688 32.7969 20.7188 33 22 33C23.2812 33 24.5312 32.7969 25.75 32.3906L23.9375 31.3125L26.1094 26.6562L31.2031 26.0312L31.6719 28.0938Z"
					fill="black"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_129_57">
					<Rect
						width="28"
						height="28"
						fill="white"
						transform="translate(8 7)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default BallMagnifyingGlassIcon;

const styles = StyleSheet.create({
	ballMagnifyingGlass: {},
});

// Name file: components/icons/BallMagnifyingGlassIcon.js