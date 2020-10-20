import React from "react";
import CustomListItem from "./CustomListItem";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	listText: "test",
};

describe("CustomListItem Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<CustomListItem {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<CustomListItem {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<CustomListItem {...params} />);
		const value = getByText("test");
		expect(value).toBeInTheDocument();
	});
});
