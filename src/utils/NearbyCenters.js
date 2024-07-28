import { getDistance } from "geolib";

// Filter the centers by the search input and distance from the user location
export const applyFilters = (centers, searchInput, location, maxDistance) => {
	const lowercasedInput = searchInput.toLowerCase();
	const filtered = centers
		.map((center) => ({
			...center,
			distance: getDistance(
				{ latitude: location.latitude, longitude: location.longitude },
				{ latitude: center.latitude, longitude: center.longitude }
			),
		}))
		.filter(
			(center) =>
				center.title.toLowerCase().includes(lowercasedInput) &&
				center.distance < maxDistance
		);

	return filtered;
};
