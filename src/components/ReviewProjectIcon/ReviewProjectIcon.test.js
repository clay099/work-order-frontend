import React from "react";
import ReviewProjectIcon from "./ReviewProjectIcon";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	id: 1,
};
const initialState = {
	projects: { projectList: [{ id: 1, status: "auction" }] },
	bids: { 1: 1 },
	login: { user_type: "user" },
	review: { 1: 1 },
};

describe("ReviewProjectIcon Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<ReviewProjectIcon {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<ReviewProjectIcon {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});
});
