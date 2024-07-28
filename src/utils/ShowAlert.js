import { Alert } from "react-native";

const ShowAlert = (title = "title", msg = "msg alert") => {
	Alert.alert(
		title,
		msg,
		[
			{
				text: "Ok",
				style: "cancel",
			},
		],
		{ cancelable: false } // This is important to prevent user from dismissing the alert by pressing outside of it
	);
};

export default ShowAlert;
