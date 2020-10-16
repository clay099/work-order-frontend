import React from "react";
import NewProjectButton from "./NewProjectButton";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	justify: "center",
};

describe("NewProjectButton Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<NewProjectButton {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<NewProjectButton {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<NewProjectButton {...params} />);
		const value = getByText("Create New Project");
		expect(value).toBeInTheDocument();
	});
});
