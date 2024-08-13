import {
	Modal as RNModal,
	KeyboardAvoidingView,
	Platform,
	View,
} from "react-native";

const Modal = ({ isOpen, withInput, children, ...rest }) => {
	const content = withInput ? (
		<KeyboardAvoidingView
			style={{
				justifyContent: "center",
				flex: 1,
				paddingHorizontal: 16,
				backgroundColor: "rgba(0, 0, 0, 0.4)",
			}}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{children}
		</KeyboardAvoidingView>
	) : (
		<View
			style={{
				justifyContent: "center",
				flex: 1,
				paddingHorizontal: 10,
				backgroundColor: "rgba(0, 0, 0, 0.4)",
			}}
		>
			{children}
		</View>
	);

	return (
		<RNModal
			visible={isOpen}
			transparent
			animationType="fade"
			statusBarTranslucent
			{...rest}
		>
			{content}
		</RNModal>
	);
};

export default Modal;
