import React from "react";
import ShortRow from "./ShortRow";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	project: {
		description: "description",
		street_address: "street_address",
		address_city: "address_city",
		created_at: "created_at",
		status: "status",
	},
};

describe("ShortRow Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<ShortRow {...params} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<ShortRow {...params} />);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<ShortRow {...params} />);
		const value = getByText(params.project.description);
		expect(value).toBeInTheDocument();
	});
});
