import * as dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

export default ({ config }) => ({
	...config,
	slug: "footmatch",
	name: "FootMatch",
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.jesusarsan.footmatch",
		config: {
			googleMapsApiKey: process.env.GOOGLE_CLOUD_API_KEY,
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./src/assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF",
		},
		package: "com.jesusarsan.footmatch",
		config: {
			googleMaps: {
				apiKey: process.env.GOOGLE_CLOUD_API_KEY,
			},
		},
	},
});
