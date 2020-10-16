import React from "react";
import BasicProjectForm from "./BasicProjectForm";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	handleChange: jest.fn(),
	formData: { description: "description" },
};

describe("BasicProjectForm Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<BasicProjectForm {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<BasicProjectForm {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<BasicProjectForm {...params} />);
		const value = getByText("Project Description");
		expect(value).toBeInTheDocument();
	});
});
