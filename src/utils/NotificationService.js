import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";

// Message component
export const Message = ({ message, onHide, colorB, colorF }) => {
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.delay(2000),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start(() => onHide());
	}, [onHide, opacity]);

	return (
		<Animated.View
			style={{
				opacity,
				transform: [
					{
						translateY: opacity.interpolate({
							inputRange: [0, 1],
							outputRange: [-20, 0],
						}),
					},
				],
				margin: 10,
				marginBottom: 5,
				backgroundColor: colorB,
				padding: 10,
				borderRadius: 4,
				shadowColor: "black",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.15,
				shadowRadius: 5,
				elevation: 6,
				position: "absolute",
				top: 8,
				left: 0,
				right: 0,
				zIndex: 1000,
			}}
		>
			<Text
				style={{
					fontFamily: "InriaSans-Bold",
					fontSize: 18,
					color: colorF,
				}}
			>
				{message}
			</Text>
		</Animated.View>
	);
};

// Notification manager
export const useNotificationManager = () => {
	const [messages, setMessages] = useState([]);
	const [canAddMessage, setCanAddMessage] = useState(true);

	const addMessage = (message) => {
		if (canAddMessage) {
			setMessages((currentMessages) => [
				...currentMessages,
				{ id: Date.now(), text: message },
			]);
			setCanAddMessage(false);
			setTimeout(() => {
				setCanAddMessage(true);
			}, 3500);
		}
	};

	const removeMessage = (messageId) => {
		setMessages((currentMessages) =>
			currentMessages.filter((message) => message.id !== messageId)
		);
	};

	return { addMessage, removeMessage, messages };
};
