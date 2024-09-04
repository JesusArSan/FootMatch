// React Imports
import React from "react";
import { Bubble } from "react-native-gifted-chat";

const CustomBubbleChat = ( props ) => {
	return (
		<Bubble
			{...props}
			wrapperStyle={{
				right: {
					backgroundColor: "#0084ff",
				},
				left: {
					backgroundColor: "#3562A6",
				},
			}}
			textStyle={{
				right: {
					fontFamily: "InriaSans-Regular",
					color: "#fafafa",
				},
				left: {
					fontFamily: "InriaSans-Regular",
					color: "#fafafa",
				},
			}}
			timeTextStyle={{
				right: {
					fontFamily: "InriaSans-Regular",
					color: "#fafafa",
				},
				left: {
					fontFamily: "InriaSans-Regular",
					color: "#fafafa",
				},
			}}
		/>
	);
};

export default CustomBubbleChat;
