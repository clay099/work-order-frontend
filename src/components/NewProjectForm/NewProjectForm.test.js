import React from "react";
import NewProjectForm from "./NewProjectForm";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	token: "token",
};

describe("NewProjectForm Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<NewProjectForm {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<NewProjectForm {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<NewProjectForm {...params} />);
		const value = getByText("Create New Project");
		expect(value).toBeInTheDocument();
	});
});
