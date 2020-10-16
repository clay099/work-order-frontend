import React from "react";
import ReviewProjectButtons from "./ReviewProjectButtons";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	id: 1,
	reviewed: true,
};

const initialState = {
	login: { token: "token" },
};

describe("ReviewProjectButtons Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<ReviewProjectButtons {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<ReviewProjectButtons {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<ReviewProjectButtons {...params} />, {
			initialState,
		});
		const value = getByText("Update Project Review");
		expect(value).toBeInTheDocument();
	});
});
