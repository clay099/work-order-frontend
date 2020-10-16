import React from "react";
import NewProject from "./NewProject";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const initialState = {
	login: { token: "token", user_type: "user" },
};

describe("NewProject Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<NewProject />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<NewProject />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<NewProject />, {
			initialState,
		});
		const value = getByText("Create New Project");
		expect(value).toBeInTheDocument();
	});
});
