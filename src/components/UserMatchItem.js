import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const UserMatchItem = ({ user, onRemove }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: user.photo }} style={styles.avatar} />
			<Text style={styles.name}>{user.username}</Text>
			<Text
				style={[
					styles.status,
					{
						color:
							user.status === ("Confirmed" || "confirmed")
								? "#32CD32"
								: "#FFA500",
					},
				]}
			>
				{user.status}
			</Text>
			<TouchableOpacity
				onPress={() => onRemove(user.id)}
				style={styles.cancelContainer}
			>
				<Text style={styles.removeButton}>❌</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
		padding: 10,
		borderRadius: 30,
		marginVertical: 9,
		marginHorizontal: 10,
		elevation: 3,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	name: {
		flex: 1,
		fontSize: 14,
		fontFamily: "InriaSans-Bold",
		color: "#000",
	},
	status: {
		fontSize: 14,
		fontFamily: "InriaSans-Bold",
		marginRight: 10,
	},
	removeButton: {
		fontSize: 10,
		color: "#FF5A5F",
	},
	cancelContainer: {
		position: "absolute",
		right: 0,
		top: -10,
	},
});

export default UserMatchItem;
