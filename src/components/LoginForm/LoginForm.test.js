import React from "react";
import LoginForm from "./LoginForm";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	userType: "user",
	handleClose: jest.fn(),
};

describe("LoginForm Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<LoginForm {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<LoginForm {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<LoginForm {...params} />);
		const value = getByText("Login");
		expect(value).toBeInTheDocument();
	});
});
