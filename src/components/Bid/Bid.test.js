import React from "react";
import Bid from "./Bid";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	projectId: 1,
};

const initialState = {
	login: { id: 1 },
	bids: { 1: { 1: "500" } },
};

describe("Bid Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<Bid {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<Bid {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<Bid {...params} />, {
			initialState,
		});
		const value = getByText("Bid");
		expect(value).toBeInTheDocument();
	});
});
