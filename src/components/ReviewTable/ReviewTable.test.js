import React from "react";
import ReviewTable from "./ReviewTable";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	projectId: 1,
};
const reviews = { 1: { review_comment: "great", review_rating: 10 } };

describe("ReviewTable Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<ReviewTable {...params} />, {
			initialState: {
				reviews,
			},
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<ReviewTable {...params} />, {
			initialState: {
				reviews,
			},
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<ReviewTable {...params} />, {
			initialState: {
				reviews,
			},
		});
		const value = getByText("great");
		expect(value).toBeInTheDocument();
	});

	test("value not to be in the document when a review can't be found in state", () => {
		const { queryByText } = render(<ReviewTable {...params} />);
		const value = queryByText("great");
		expect(value).not.toBeInTheDocument();
	});
});
