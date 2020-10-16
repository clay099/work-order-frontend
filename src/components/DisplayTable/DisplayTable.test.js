import React from "react";
import DisplayTable from "./DisplayTable";
import { render, formDataState } from "../../testHelper/testHelper";
console.error = jest.fn();

const params = {
	projectData: [formDataState.formData],
	headingList: ["heading 1"],
	tableTitle: "title",
};

const initialState = {
	projects: { projectList: [formDataState.formData] },
};

describe("DisplayTable Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<DisplayTable {...params} />, {
			initialState,
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<DisplayTable {...params} />, {
			initialState,
		});
		expect(asFragment).toMatchSnapshot();
	});

	test("value to be in the document", () => {
		const { getByText } = render(<DisplayTable {...params} />, {
			initialState,
		});
		const value = getByText("title");
		expect(value).toBeInTheDocument();
	});
});
