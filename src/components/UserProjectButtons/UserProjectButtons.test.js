import React from "react";
import UserProjectButtons from "./UserProjectButtons";
import { render } from "../../testHelper/testHelper";
console.error = jest.fn();

const UserProjectButtonsParams = {
	status: "auction",
	id: 1,
	token: "token",
};

describe("UserProjectButtons Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<UserProjectButtons {...UserProjectButtonsParams} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(
			<UserProjectButtons {...UserProjectButtonsParams} />
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have relevant buttons for auction stage", () => {
		const { getByText } = render(
			<UserProjectButtons {...UserProjectButtonsParams} />
		);

		const button = getByText("Delete Project");
		expect(button).toBeInTheDocument();
	});

	test("should have relevant buttons for progressing stage", () => {
		UserProjectButtonsParams.status = "progressing";
		const { getByText } = render(
			<UserProjectButtons {...UserProjectButtonsParams} />
		);

		const button = getByText("Mark Project As Completed");
		expect(button).toBeInTheDocument();
	});

	test("should have relevant buttons for completed stage", () => {
		UserProjectButtonsParams.status = "completed";
		const { getByText } = render(
			<UserProjectButtons {...UserProjectButtonsParams} />
		);

		const button = getByText("Review Project");
		expect(button).toBeInTheDocument();
	});
});
