import React from "react";
import TableHeadings from "./TableHeadings";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

describe("TableHeadings Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<TableHeadings headings={["test"]} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<TableHeadings headings={["test"]} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<TableHeadings headings={["test"]} />);
		const value = getByText("test");
		expect(value).toBeInTheDocument();
	});
});
