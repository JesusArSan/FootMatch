import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	BackHandler,
	StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import MagnifyingGlassIcon from "../../components/icons/MagnifyingGlassIcon";
import { getUsers, getFriendsList } from "../../utils/UserFunctions";
import AddFriendComponent from "../../components/AddFriendComponent";
import PublicationContainer from "../../components/PublicationComponent";
import friends from "../../assets/data/friends";
import publications from "../../assets/data/publications";
import likes from "../../assets/data/likes";

const CommunityScreen = ({ route }) => {
	const userLogged = route.params.user || {};
	const [friendList, setFriendList] = useState([]);
	const [filteredFriendList, setFilteredFriendList] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [publicationsData, setPublicationsData] = useState([]);
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [searchText, setSearchText] = useState("");
	const navigation = useNavigation();
	const tabBarHeight = useBottomTabBarHeight();
	const headerHeight = useHeaderHeight();

	useEffect(() => {
		// Fetch friends list
		getFriendsList(userLogged.id, (friends) => {
			setFriendList(friends);
			setFilteredFriendList(friends);
		});
		// Fetch non-friend users
		getUsers(userLogged.id, (users) => {
			setUsersList(users);
			setFilteredUsers([]);
		});
		// Map publications with additional data
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
					id: user?.id,
					username: user?.username,
					photo: user?.photo,
				},
				isLiked: isLiked,
			};
		});
		setPublicationsData(mappedPublications);
	}, []);

	// Toggle search bar visibility
	const handleShowSearchBar = (show = null) => {
		if (show === false) {
			setShowSearchBar(false);
		} else {
			setShowSearchBar((prevShowSearchBar) => !prevShowSearchBar);
		}
	};

	// Handle back button press
	const handleBackPress = () => {
		if (showSearchBar) {
			setShowSearchBar(false);
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (showSearchBar) {
			BackHandler.addEventListener("hardwareBackPress", handleBackPress);
		} else {
			BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
		}
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
		};
	}, [showSearchBar]);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRightContainer}
					onPress={handleShowSearchBar}
				>
					<MagnifyingGlassIcon size={28} />
				</TouchableOpacity>
			),
		});
	}, [navigation, showSearchBar]);

	// Update the navigation options when `showSearchBar` changes
	useEffect(() => {
		if (showSearchBar) {
			navigation.setOptions({
				tabBarStyle: {
					height: 0,
					backgroundColor: "#3562A6",
					display: "none",
				},
				headerShown: false,
			});
		} else {
			navigation.setOptions({
				tabBarStyle: {
					backgroundColor: "#3562A6",
					height: "7.5%",
					display: "flex",
				},
				headerShown: true,
			});
		}
	}, [showSearchBar, navigation]);

	// Filter users based on search text
	const handleSearch = (text) => {
		setSearchText(text);
		if (text.trim() === "") {
			setFilteredUsers([]);
		} else {
			const filteredUsers = usersList.filter(
				(userFilter) =>
					userFilter.username &&
					userFilter.username.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredUsers(filteredUsers);
		}
	};

	// Update users data
	const updateUsersData = async () => {
		await getUsers(userLogged.id, setUsersList);
	};

	// Focus effect
	useFocusEffect(
		React.useCallback(() => {
			updateUsersData();
			handleShowSearchBar(false);
		}, [])
	);

	useEffect(() => {
		updateUsersData();
	}, []);

	return (
		<View
			style={[
				styles.container,
				showSearchBar && { paddingBottom: tabBarHeight },
			]}
		>
			{showSearchBar ? (
				<View
					style={[
						styles.searchBarContainer,
						{ top: StatusBar.currentHeight || 0 },
					]}
				>
					<TextInput
						style={styles.searchBar}
						placeholder="Search..."
						value={searchText}
						onChangeText={handleSearch}
					/>
					{searchText.trim() !== "" && (
						<FlatList
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							data={filteredUsers}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<AddFriendComponent
									userSearched={item}
									userLogged={userLogged}
									updateUsersData={updateUsersData}
								/>
							)}
							contentContainerStyle={{
								paddingBottom: 10,
								paddingHorizontal: 10,
							}}
							style={{ marginVertical: 10 }}
						/>
					)}
				</View>
			) : (
				<FlatList
					data={publicationsData}
					renderItem={({ item }) => (
						<PublicationContainer publication={item} />
					)}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	headerRightContainer: {
		paddingRight: 15,
	},
	container: {
		flex: 1,
	},
	searchBarContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		padding: 10,
		backgroundColor: "#f0f0f0",
		zIndex: 10,
	},
	searchBar: {
		height: 40,
		backgroundColor: "#fff",
		borderRadius: 20,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: "#ddd",
	},
});

export default CommunityScreen;
