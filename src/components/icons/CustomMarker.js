// React Imports
import React from "react";
import { Image, StyleSheet } from "react-native";

const CustomMarker = ({ customHeight = 40, customWidth = 50 }) => {
	return (
		<Image
			source={require("../../assets/images/icons/marker.png")}
			style={[styles.icon, { height: customHeight, width: customWidth }]}
		/>
	);
};

export default CustomMarker;
// export default React.memo(CustomMarker);

const styles = StyleSheet.create({
	icon: {},
});

// Name file: components/icons/CustomMarker.js
