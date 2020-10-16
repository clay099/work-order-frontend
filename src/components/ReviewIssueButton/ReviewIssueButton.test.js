import React from "react";
import ReviewIssueButton from "./ReviewIssueButton";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	id: 1,
};

const initialState = {
	login: { token: "token" },
};

describe("ReviewIssueButton Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<ReviewIssueButton {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<ReviewIssueButton {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<ReviewIssueButton {...params} />, {
			initialState,
		});
		const value = getByText("Add Project Issue");
		expect(value).toBeInTheDocument();
	});
});
