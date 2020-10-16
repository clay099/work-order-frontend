import React from "react";
import BidTable from "./BidTable";
import { render, bidData } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	projectId: 1,
};

const initialState = {
	login: { token: "token" },
	bids: {
		1: { first_name: "first_name", last_name: "last_name", bid: 500 },
	},
};

describe("BidTable Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<BidTable {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<BidTable {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getAllByText } = render(<BidTable {...params} />, {
			initialState,
		});
		const value = getAllByText("Accept Bid");
		expect(value[0]).toBeInTheDocument();
	});
});
