import React from "react";
import SimpleDialog from "./SimpleDialog";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	handleClose: jest.fn(),
	open: true,
	handleSubmit: jest.fn(),
	titleText: "title",
	id: 1,
	buttonText: "buttontext",
	buttonColor: "primary",
};

describe("SimpleDialog Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<SimpleDialog {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<SimpleDialog {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<SimpleDialog {...params} />);
		const value = getByText(params.buttonText);
		expect(value).toBeInTheDocument();
	});
});
