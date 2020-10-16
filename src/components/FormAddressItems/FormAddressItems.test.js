import React from "react";
import FormAddressItems from "./FormAddressItems";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	formData: {
		city: "city",
		streetAddress: "streetAddress",
		zip: "zip",
		country: "country",
	},
	handleChange: jest.fn,
	disabled: true,
};

describe("FormAddressItems Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<FormAddressItems {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<FormAddressItems {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<FormAddressItems {...params} />);
		const value = getByText("Street Address");
		expect(value).toBeInTheDocument();
	});
});
