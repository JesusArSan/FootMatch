// React Imports
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// My components
import PublicationContainer from "../../components/PublicationComponent";
import DrawerDivider from "../../components/DrawerDivider";
// Dummy
import friends from "../../assets/data/friends";
import publications from "../../assets/data/publications";
import likes from "../../assets/data/likes";

const CommunityScreen = ({ route }) => {
	// Get the user data from the route params
	const userLogged = route.params.user || {};
	// Set the publications data
	const [publicationsData, setPublicationsData] = React.useState([]);

	React.useEffect(() => {
		const mappedPublications = publications.map((publication) => {
			const publicationLikes = likes.filter(
				(like) => like.post_id === publication.id
			);
			const user = friends.find(
				(friend) => friend.id === publication.idUser
			);
			const isLiked = likes.some(
				(like) =>
					like.post_id === publication.id && like.user_id === userLogged.id
			);

			return {
				...publication,
				likesCount: publicationLikes.length,
				user: {
					id: user.id,
					username: user.username,
					photo: user.photo,
				},
				isLiked: isLiked,
			};
		});
		setPublicationsData(mappedPublications);
	}, []);

	const renderItem = ({ item }) => {
		return <PublicationContainer publication={item} />;
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={publicationsData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 18,
		textAlign: "center",
	},
});

export default CommunityScreen;
