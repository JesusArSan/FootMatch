// React Imports
import React from "react";
// Icons react
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const TabBarIconType = ({ name, color }) => {
	switch (name) {
		case "Home":
			return (
				<MaterialCommunityIcons
					name="home-variant"
					size={36}
					color={color}
				/>
			);
		case "Community":
			return <FontAwesome5 name="users" size={30} color={color} />;
		case "Notifications":
			return <Ionicons name="notifications" size={30} color={color} />;
		case "Profile":
			return (
				<MaterialCommunityIcons
					name="account-circle"
					size={36}
					color={color}
				/>
			);
		default:
			return <AntDesign name="minuscircle" size={28} color={color} />; // Generic return
	}
};

export default TabBarIconType;
