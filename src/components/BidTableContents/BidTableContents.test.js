import React from "react";
import BidTableContents from "./BidTableContents";
import { render, bidData } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	projectId: 1,
	bidData: {
		1: { first_name: "first_name", last_name: "last_name", bid: 500 },
	},
};

const initialState = {
	login: { token: "token" },
};

describe("BidTableContents Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<BidTableContents {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<BidTableContents {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<BidTableContents {...params} />, {
			initialState,
		});
		const value = getByText("first_name");
		expect(value).toBeInTheDocument();
	});
});
