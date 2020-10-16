import React from "react";
import Register from "./Register";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

describe("Register Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<Register />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<Register />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<Register />);
		const value = getByText("Sign up");
		expect(value).toBeInTheDocument();
	});
});
