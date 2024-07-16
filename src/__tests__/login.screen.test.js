import * as React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Auth/LoginScreen";

describe("Login Screen", () => {
	it("Should have a login button", async () => {
		// Render the LoginScreen wrapped in NavigationContainer
		const page = render(
			<NavigationContainer>
				<LoginScreen />
			</NavigationContainer>
		);

		// Attempt to retrieve the login button by testID
		const loginButton = page.getByTestId("loginButton");

		// Expected to be truthy
		expect(loginButton).toBeTruthy(); // Check that the login button is rendered
		// try?...
		// fireEvent.press(loginButton);
	});
});
