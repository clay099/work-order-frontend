import React from "react";
import Loading from "./Loading";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

describe("Loading Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<Loading />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<Loading />);
		expect(asFragment).toMatchSnapshot();
	});
});
