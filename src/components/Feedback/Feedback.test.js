import React from "react";
import Feedback from "./Feedback";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const initialState = {
	feedback: { error: "issue" },
};

describe("Feedback Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<Feedback />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<Feedback />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<Feedback />, {
			initialState,
		});
		const value = getByText("issue");
		expect(value).toBeInTheDocument();
	});
});
