// React Imports
import React from "react";
import { View, StyleSheet, Pressable, Image, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Icon Components
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

// Header Community
const HeaderChat = ({ props = {}, userData = {}, chatInfo = {} }) => {
	// Navigation
	const navigation = useNavigation();

	const handleUserPress = () => {
		Alert.alert("User Pressed " + chatInfo.username);
	};
	const handleOptionsPress = () => {
		Alert.alert("Options Pressed");
	};
	const handlePhonePress = () => {
		Alert.alert("Phone Pressed");
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.infoUser} onPress={handleUserPress}>
				<Image source={{ uri: chatInfo.userPhoto }} style={styles.avatar} />
				<Text style={styles.username}>{chatInfo.username}</Text>
			</Pressable>
			<View style={styles.utilitiesContainer}>
				<TouchableOpacity onPress={handlePhonePress}>
					<Entypo
						name="phone"
						size={28}
						color="#fafafa"
						style={{ transform: [{ rotate: "95deg" }] }}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleOptionsPress}>
					<SimpleLineIcons
						name="options-vertical"
						size={22}
						color="#fafafa"
						style={{ marginLeft: 15 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HeaderChat;

const styles = StyleSheet.create({
	container: {
		// width: "100%",
		// height: "100%",
		flexDirection: "row",
		// alignItems: "center",
		// justifyContent: "space-between",
		flex: 0,
		margin: -20,
	},
	infoUser: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 45,
		height: 45,
		borderRadius: 25,
	},
	username: {
		fontSize: 22,
		fontFamily: "InriaSans-Bold",
		marginLeft: 15,
		color: "#fafafa",
	},
	utilitiesContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 70,
	},
});

// Name file: components/HeaderChat.js
