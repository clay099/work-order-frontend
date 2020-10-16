import React from "react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const initialState = {
	login: { user_type: "user" },
};

describe("NavBar Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
			{
				initialState,
			}
		);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
			{
				initialState,
			}
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
			{
				initialState,
			}
		);
		const value = getByText("Project Freelance");
		expect(value).toBeInTheDocument();
	});
});
