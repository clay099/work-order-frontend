import React from "react";
import TableContents from "./TableContents";
import { render, formDataState } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = { bodyData: [formDataState.formData], tableType: "fake" };

describe("TableContents Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<TableContents {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<TableContents {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getAllByText } = render(<TableContents {...params} />);
		const value = getAllByText("not available");
		expect(value[0]).toBeInTheDocument();
	});
});
