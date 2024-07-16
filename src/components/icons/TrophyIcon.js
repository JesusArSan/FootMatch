// React Imports
import { StyleSheet } from "react-native";
import Svg, { Use, Pattern, Rect, Defs, Image } from "react-native-svg";

const TrophyIcon = () => {
	return (
		<Svg
			width="45"
			height="45"
			viewBox="0 0 45 45"
			fill="none"
			syles={styles.trophyIcon}
		>
			<Defs>
				<Pattern
					id="pattern0_130_93"
					patternContentUnits="objectBoundingBox"
					width={1}
					height={1}
				>
					<Use href="#image0_130_93" transform="scale(0.01)" />
				</Pattern>
				<Image
					id="image0_130_93"
					width="100"
					height="100"
					href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/0lEQVR4nO2dW4hNURzGvyMKHSlJSvNAlPsll3IZPEhNlBeZF4qaF7dMGck8yQs1SKTGM6Y0GJ54E4rQGAkPGkNGQiYjQ+bWX8sszZk1ZzvnrDlnr/9e6/+r7+ns2Xvt79uzzlmXvRYgCIIgCMljFoAWAMRI3QBuApiAALnMIACKUA0CpIGB8SSBDDITwFMA/cyqrBuhVln/qGYQBGmpsgTPYgZBkJYqS/CMAvCVQRgdwN+yCACaGATSJEnw+h6plkAGmQagx2EY6tplEshQjjkM5KiEkZ1dujulO4YQunU7aKeEIQiCHXMBXADQpquUOuPz3RZV017jHKf0udv0teZIWMNJAagF0GeYWWUcd8YikLPGOfYYn/cCOKLLIGhqI8xcYzh0yyKQ28Y5NkYcp0IRAMzWTyll0WTDobcWgaiqKZMZEcep/855kshAPW72KVUCSBvmjLXsqu/Xf5tJWl+jwzi2XgIZeIIzTamMMGX+CNocCyLOWWkc1yqBDG8EpmM0JZ2lsRg85tMc2vXZYRryGkDXCKqnfNWlryWBZDApBuOpQKkyBclqAB8YBECG2gGsQmCoxtkvBuZThH4C2IBAUH1H3xmYTjnUqRutXqMmETxkYDblqce+T3zYwcBkKlDb4THPGBhMBUqNKnrJQgbmkqW87HQ8zMBYstQheMhVBsaSpa7AQ14xMJYs9QIeYo49JElf4CFxzLWiEuk3PCRqmDYJ6oGHJKG7hP7TjeIdnxgYS5b6iADGzpOkVnjISwbGkqWew0OeMDCWLPUIHnKPgbFkqTvwkOsMjCVLNcJDTjMwlixlzsL3ggMMjCVL7YOHbGFgLFlqMzxkEQNjyVJqXrF3TGRgLFnK28Vo3jEwlwrUG3gM5zWyKEIX4TH7GRhMBUq9k+gtyxgYTAVqCTxmTEyvGlCR9APAaHjONQZGU8hdJibbGBhNeWorAmC8rgqSUF2NQyBwXrOXtC4hINYyMJxyqByBcZ+B6RShBwiQTQyMpwhVIEBS+g0lYjh+nkKgLM2yJBM5lFoXZQUC5zyDIEjrnGszuIyT2Cy7REVWmy6LAGC549nxvQBWShJDqXEYyEEJYzgpRwNYjSH/qsqnn6s5xjCaQ+qvsqUMwOcYwlBbZEx3fbNJYX2Jt0JS517n+iaTxokSBnLc9c0JgiAIQoj75VKRpTa0FCxpKEEgQY2VF5OqEv7sNfcUEfJYtbS3hIH0+foSTjGZCuBuzJsVB71/ei7qYgzCVJD7p+fipATCiym6yopzGSfZP10QhAIpd/hlTqHP581GPYMgSEs2BWO2/HiL66eTA50MgiCtb67N4EA7gyBI671rMzhQoY0gBmEE+RqCIAiCAC/4AwT07p//z9JJAAAAAElFTkSuQmCC"
				/>
			</Defs>
			<Rect width="45" height="45" fill="url(#pattern0_130_93)" />
		</Svg>
	);
};

export default TrophyIcon;

const styles = StyleSheet.create({
	trophyIcon: {},
});

// Name file: components/icons/BallMagnifyingGlassIcon.js
