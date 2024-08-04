import React from "react";
import { View, Alert, StyleSheet, Text, Switch } from "react-native";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { useColorScheme } from "nativewind";
import AppIcon from "./icons/AppIcon";
import DrawerDivider from "./DrawerDivider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CustomDrawerContent = (props) => {
	// Get the color scheme
	const { colorScheme, toggleColorScheme } = useColorScheme();

	console.log(colorScheme);

	return (
		<DrawerContentScrollView {...props}>
			<View style={{ backgroundColor: "transparent" }}>
				<View style={styles.logoContainer}>
					<View style={styles.logoApp}>
						<AppIcon customHeight={45} customWidth={28} />
					</View>
					<Text style={styles.textTitle}>OOTMATCH</Text>
				</View>
				<DrawerDivider />
				<DrawerItemList {...props} />
				<DrawerDivider />
				<View style={styles.darkThemeContainer}>
					{colorScheme === "dark" ? (
						<MaterialIcons name="dark-mode" size={40} color="white" />
					) : (
						<MaterialIcons name="light-mode" size={40} color="white" />
					)}

					<Switch
						value={colorScheme === "dark"}
						onValueChange={toggleColorScheme}
						style={{ marginLeft: 10 }}
						trackColor={{ false: "#3562A6", true: "#fafafa" }}
						thumbColor={colorScheme === "dark" ? "#EEEEEE" : "#6594C0"}
						ios_backgroundColor="#3e3e3e"
					/>
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
	logoContainer: {
		flexDirection: "row",
		marginTop: 8,
		paddingLeft: 27,
		paddingBottom: 13,
		height: 60,
	},
	logoApp: {
		width: 28,
		height: 45,
	},
	textTitle: {
		fontSize: 30,
		fontFamily: "InriaSans-Bold",
		color: "#ffffff",
		alignSelf: "flex-end",
		height: 32,
	},
	darkThemeContainer: {
		flexDirection: "row",
		alignSelf: "flex-start",
		alignItems: "center",
		marginLeft: 12,
		marginTop: 5,
		paddingHorizontal: 10,
	},
});
