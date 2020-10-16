import React from "react";
import HomeHeading from "./HomeHeading";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const initialState = {
	login: { email: "email" },
};

describe("HomeHeading Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<HomeHeading />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<HomeHeading />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<HomeHeading />, {
			initialState,
		});
		const value = getByText("Project Freelance");
		expect(value).toBeInTheDocument();
	});
});
