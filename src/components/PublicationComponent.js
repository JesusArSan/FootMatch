// React Imports
import * as React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import LottieView from "lottie-react-native";
// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const PublicationContainer = ({ publication }) => {
	const [liked, setLiked] = React.useState(publication.isLiked);
	const animation = React.useRef(null);
	const isFirstRun = React.useRef(true);

	// Animation
	React.useEffect(() => {
		if (isFirstRun.current) {
			if (liked) {
				animation.current.play(100, 100);
			} else {
				animation.current.play(0, 0);
			}
			isFirstRun.current = false;
		} else {
			if (liked) {
				animation.current.play(0, 100);
			} else {
				animation.current.play(0, 0);
			}
		}
	}, [liked]);

	const handlePressUser = () => {
		console.log("User pressed: ", publication.user.id);
	};
	const handlePressLike = () => {
		setLiked(!liked);
		console.log("Like button unpressed for: ", publication.user.id);
	};
	const handlePressComments = () => {
		console.log("Comment button pressed for: ", publication.user.id);
	};
	const handlePressShare = () => {
		console.log("Share button pressed for: ", publication.user.id);
	};

	return (
		<Pressable style={styles.publicationContainer}>
			<Pressable style={styles.userPhoto} onPress={handlePressUser}>
				<Image
					style={styles.userPhotoImage}
					source={{ uri: publication.user.photo }}
				/>
			</Pressable>
			<View style={styles.contentContainer}>
				<Text
					style={[styles.textContent, { fontFamily: "InriaSans-Bold" }]}
				>
					{publication.user.username}
				</Text>
				<Text style={styles.textContent}>{publication.content}</Text>
				<View style={styles.buttonContainer}>
					<View style={styles.likeContainer}>
						<Pressable onPress={handlePressLike}>
							<LottieView
								ref={animation}
								source={require("../assets/animations/like.json")}
								autoPlay
								loop={false}
								style={styles.lottieStyle}
							/>
						</Pressable>
						<Text style={styles.likesCount}>
							{publication.likesCount}
						</Text>
					</View>
					<Pressable onPress={handlePressComments}>
						<FontAwesome
							name="commenting-o"
							size={22}
							color="#4F4F4F"
							style={styles.commentIcon}
						/>
					</Pressable>
					<Pressable onPress={handlePressShare}>
						<Ionicons
							name="share-social-outline"
							size={24}
							color="#4F4F4F"
							style={styles.shareIcon}
						/>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	publicationContainer: {
		paddingTop: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#CFCFCF",
	},
	userPhoto: {
		width: 50,
		height: 50,
		borderRadius: 25,
		resizeMode: "cover",
	},
	userPhotoImage: {
		width: "100%",
		height: "100%",
		borderRadius: 25,
	},
	contentContainer: {
		width: "80%",
		marginHorizontal: 15,
	},
	textContent: {
		fontSize: 16,
		textAlign: "justify",
		alignSelf: "flex-start",
		fontFamily: "InriaSans-Regular",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		width: "47%",
		marginVertical: 10,
	},
	likeContainer: {
		flexDirection: "row",
		width: "32%",
		height: 33,
	},
	lottieStyle: {
		width: 50,
		height: 50,
		position: "relative",
		left: "-25%",
		top: "-38%",
	},
	likesCount: {
		alignSelf: "center",
		marginLeft: "-50%",
		fontFamily: "InriaSans-Regular",
	},
	commentIcon: {
		marginLeft: 6,
	},
	shareIcon: {
		marginLeft: 15,
	},
});

export default PublicationContainer;

// Path: src/components/publicationComponent.js
