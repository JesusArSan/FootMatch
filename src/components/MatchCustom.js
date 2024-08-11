// React Imports
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const NAME_LIMIT = 6;

const MatchCustom = ({ teamA = {}, teamB = {}, result = {} }) => (
	<View style={styles.matchContainer}>
		<View style={styles.teamContainer}>
			<Image
				source={{
					uri: teamA.image
						? teamA.image
						: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAWlBMVEX///8AAAD39/fY2NguLi6WlpYpKSnj4+MzMzPq6urb29uampqioqKFhYXm5uafn585OTmOjo6pqam7u7sjIyMPDw9iYmIdHR0+Pj5SUlJ/f3/x8fHQ0NAYGBggQFzxAAAFdUlEQVR4nM2c6YKrIAyFXbpJp47Tdea28/6veccuFpODLIImP63a9CNATqBkWSxbfkV7VTTb5/nn3D5Q+8r/bDe3F33b53cTxWqbP01QXO3zzsSwWuaaCYmrj7xn27n9aW2bExMQV5/Upzxfzu0T4ySA1QfyaWZWoO1m9wq23cwtaGi7WVkNcJqNlTGeZmRl4TQLKx5PqxW7NPGMs2QOHKvqyC5OOjvv2devyiwrOasJMxnOaVW11yvu1WSsOKdj+fik5C04EasvA6fW5mJl5tTaPKw4p0Wlf14t2A3/UvuE+51u0/dB3u82Nb2n3kwbV4CT4nepSVm5cGptSlZunFoDrBLNg4DT2nTvmrNKkjPwvGBh4NSa4iNDAlY8fzJzam0KVoAT8akk3NacVeRc1M5J5SdyJTUrno9TTrc/Lg0Z29Oy4j5tSFupU3v1SEYtxVlF84q33YpyeuYGG8qKj1eRWtA+Fqhfk7dgZIjCCnAirXTTeNC4qpOw8uGEPE4xiiIt1b/jRnLNBWEFlNdIVnwOpt/J5146gpWRWZm0lPaNv+wWlovGVROc0+aWFbrd+Pf9WaN6N2U3Pl4FZ30gV0EuuFi0rA/kdLdQpwDRIFZQS4U6FUl5Qc1ZhDpVRFGpWHNCp07n3UEV7UOFOuzOJ+wUYuUZVwaNAJy6bMtCf7Iotxfo1Gjlxfvd4j57MKd+Dujxww9yKqubMayMWoo69VHgFxR0xnzcB3JRZ1ZmLdV36gyV6MPqM3Aqq4JZDeQFPad216G3FDvgVLbmXjnNg0MaQXfKmqzpwLtmBqwccoZBjaA55ZBAal69Yw/UGayvGtZSb6ecQuHdglqHqL99WVk0Z+fUeTCeXnbtol3vpZUnK8Cpl/t2Tg30O91q5JQnKx5PRJ28nPpw8+lNvj+e+bDibcc05+Pyj2HM5FY8x3ZaZ+CsDF7ZtVT57M9wbsF2eDxBlReYnWEL2rX5S+9e3H3KsguMAzSKAlYOnF6R4KVFXu+liv7qUJMBY4GphnIq6cNDVr7yqwX5jfYZx6453zX7s3OYt1Z0YxVVXldL1mdfR9B+l2e++B7WG3tVTctkeDyZOXn1vdYO5l8KWHVxZefUm0UHasLIlPYoXQsAtb4nq6H1u4f1lYhXSJEc7Gjvg/foGF6/u/+efj/x8ynra0W3uLLXMBQRTaOcyk+k9Qs0Xs3uFEzbJTafzECXOSTIHDxlTjMyJ2SZqYvMJE9mOixTOMiUWDLFqEzZ7lHgcGrAOAUOmaWgqEUz7QeOK5q5lxetQ6j+opHlxViF2GvUQqzMkrXM4n6qZZDrqGWQNAtGQ7mvm8VfWhvLCbM6qjGLkGDbS8CCLWfVFOHLtUBzBm2UBRslFLvkaGBzSeAmAN4H+bTlaPzB4O0SnNW36m+WULxVcr5ZQnGfRmyRBeMVGS7B9mWmpYrRS9p946zsipJuwAmf70wGKkVkHqabfqhevCbY1sVzBsaq961UAcXn1BrPrxaUlfa9VEsN1zDCzYdVqOb0N5CL0urHM9qpNgcaIdqmWJ63U1b1vdZHN5+m42TwirJqgDZP6hNqwYZSOdENzWBrS+TN36DOQDd0knpBmJbyM87quxq6vwrQnP5mZ6Ub4JTkrxcgkzGymoZTa2Dbp+FvDkBLJfurpisrwCnhH59AhgxYjddSfsZZNayiEENL+Zk9rsZp8zADyqvHCnBK/qdDW1xNHU8v46w2HSvz+l1qM7Oai1NrQHndWdnXpVIa7oNz9DvdQAWyAIv5Ex+HA9REEi3lZxIPcZB53IXMg0FkHqEi87AZmcfyyDzASOZRTzIPxZJ5fJjMg9ZkHkkn8/A+mcccyjwQUubRmTIPGY16HOt/TO9Ib30g6AgAAAAASUVORK5CYII=",
				}}
				style={styles.teamLogo}
			/>

			<Text style={styles.teamName}>
				{teamA.name
					? teamA.name.substring(0, NAME_LIMIT) +
					  (teamA.name.length > NAME_LIMIT ? "." : "")
					: "Team A"}
			</Text>
		</View>
		<Text style={styles.vsText}>
			{result.A >= 0 && result.B >= 0 ? result.A + " - " + result.B : "VS"}
		</Text>
		<View style={styles.teamContainer}>
			<Image
				source={{
					uri: teamB.image
						? teamB.image
						: "https://static-00.iconduck.com/assets.00/team-bravo-icon-2048x2048-wyxo7j5s.png",
				}}
				style={styles.teamLogo}
			/>
			<Text style={styles.teamName}>
				{teamB.name
					? teamB.name.substring(0, NAME_LIMIT) +
					  (teamB.name.length > NAME_LIMIT ? "." : "")
					: "Team B"}
			</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	matchContainer: {
		flexDirection: "row",
		width: "77%",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fafafa",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 25,
		elevation: 5,
	},
	teamContainer: {
		alignItems: "center",
		height: 50,
	},
	teamLogo: {
		width: 35,
		height: 35,
		marginBottom: 4,
	},
	teamName: {
		fontSize: 14,
		fontFamily: "InriaSans-Bold",
		color: "#000",
	},
	vsText: {
		fontSize: 20,
		fontFamily: "InriaSans-Bold",
		marginHorizontal: 20,
		color: "#000",
	},
});

export default MatchCustom;
