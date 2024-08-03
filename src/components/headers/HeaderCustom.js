// React Imports
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Icon Components
import MenuIcon from "../icons/MenuIcon";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";
import MessageIcon from "../icons/MessageIcon";
import AppIcon from "../icons/AppIcon";
import Settings from "../icons/SettingsIcon";

// Header Community
const HeaderCustom = ({ props = {}, type, screenRedirectedTo }) => {
	// Navigation
	const navigation = useNavigation();

	const handlePress = () => {
		if (screenRedirectedTo) {
			navigation.navigate(screenRedirectedTo);
		}
	};

	switch (type) {
		case "community":
			return (
				<View style={styles.container}>
					<MenuIcon />
					<AppIcon />
					<TouchableOpacity onPress={handlePress}>
						<MagnifyingGlassIcon size={28} />
					</TouchableOpacity>
				</View>
			);
		case "profile":
		case "notifications":
			return (
				<View style={styles.container}>
					<MenuIcon />
					<AppIcon />
					<TouchableOpacity onPress={handlePress}>
						<Settings size={28} />
					</TouchableOpacity>
				</View>
			);
		default:
			return (
				<View style={styles.container}>
					<MenuIcon />
					<AppIcon />
					<TouchableOpacity onPress={handlePress}>
						<MessageIcon size={28} />
					</TouchableOpacity>
				</View>
			);
	}
};

export default HeaderCustom;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

// Name file: components/HeaderCustom.js
