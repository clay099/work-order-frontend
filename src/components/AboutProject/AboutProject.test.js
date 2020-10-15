import React from "react";
import { render } from "@testing-library/react";
import AboutProject from "./AboutProject";
import { MemoryRouter } from "react-router-dom";

describe("AboutProject Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(
			<MemoryRouter>
				<AboutProject />
			</MemoryRouter>
		);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(
			<MemoryRouter>
				<AboutProject />
			</MemoryRouter>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have header in document", () => {
		const { getByText } = render(
			<MemoryRouter>
				<AboutProject />
			</MemoryRouter>
		);
		const header = getByText("About this project");
		expect(header).toBeInTheDocument();
	});
});
