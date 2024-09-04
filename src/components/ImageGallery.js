import React, { useState, useRef } from "react";
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ImageGallery = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const flatListRef = useRef(null);

	const onViewRef = useRef((viewableItems) => {
		if (viewableItems.viewableItems.length > 0) {
			setActiveIndex(viewableItems.viewableItems[0].index);
		}
	});

	const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

	const renderItem = ({ item }) => (
		<View style={styles.imageContainer}>
			<Image source={{ uri: item.uri }} style={styles.image} />
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewRef.current}
				viewabilityConfig={viewConfigRef.current}
				ref={flatListRef}
			/>
			<View style={styles.pagination}>
				{images.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							index === activeIndex
								? styles.activeDot
								: styles.inactiveDot,
						]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 300,
	},
	pagination: {
		flexDirection: "row",
		position: "absolute",
		bottom: 50,
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	activeDot: {
		backgroundColor: "#3562A6",
	},
	inactiveDot: {
		backgroundColor: "#fafafa",
	},
});

export default ImageGallery;
