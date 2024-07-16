// React Imports
import { StyleSheet } from "react-native";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";

const ShirtTeam = ({
	customWidth = 53,
	customHeight = 53,
	color = "black",
}) => {
	return (
		<Svg
			width={customWidth}
			height={customHeight}
			viewBox="0 0 53 53"
			fill="white"
			syles={styles.shirtTeam}
		>
			<Rect width="53" height="53" fill="url(#pattern0_130_94)" />
			<Defs>
				<Pattern
					id="pattern0_130_94"
					patternContentUnits="objectBoundingBox"
					width="1"
					height="1"
				>
					<Use href="#image0_130_94" transform="scale(0.01)" />
				</Pattern>
				<Image
					id="image0_130_94"
					width="100"
					height="100"
					href="data:image/png;base64,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"
				/>
			</Defs>
		</Svg>
	);
};

export default ShirtTeam;

const styles = StyleSheet.create({
	shirtTeam: {},
});

// Name file: components/icons/BallMagnifyingGlassIcon.js
