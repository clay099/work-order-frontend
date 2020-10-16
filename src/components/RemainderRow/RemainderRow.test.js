import React from "react";
import RemainderRow from "./RemainderRow";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	project: {},
};

describe("RemainderRow Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<RemainderRow {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<RemainderRow {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<RemainderRow {...params} />);
		const value = getByText("no issues");
		expect(value).toBeInTheDocument();
	});
});
