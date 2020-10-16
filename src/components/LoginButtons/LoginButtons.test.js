import React from "react";
import LoginButtons from "./LoginButtons";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

describe("LoginButtons Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<LoginButtons />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<LoginButtons />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<LoginButtons />);
		const value = getByText("Tradesmen Login");
		expect(value).toBeInTheDocument();
	});
});
