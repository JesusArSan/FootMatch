// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
	const Reanimated = require("react-native-reanimated/mock");

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mocking @react-native-async-storage/async-storage
jest.mock("@react-native-async-storage/async-storage", () => ({
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
}));

// Mocking react-native-vector-icons/FontAwesome
jest.mock("react-native-vector-icons/FontAwesome", () => "FontAwesome");
// Mocking react-native-vector-icons/Ionicons
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

// Mock the useNavigation hook
jest.mock("@react-navigation/native", () => {
	return {
		...jest.requireActual("@react-navigation/native"),
		useNavigation: () => ({
			navigate: jest.fn(),
			setOptions: jest.fn(),
		}),
	};
});
