import React from "react";
import { render } from "@testing-library/react";
import AdvancedDialog from "./AdvancedDialog";
console.error = jest.fn();

const AdvancedDialogParams = {
	handleClose: true,
	open: true,
	handleSubmit: true,
	titleText: "title",
	id: "test",
	buttonText: "button test",
	buttonColor: "primary",
	FormData: ["test"],
	maxWidth: "sm",
};

describe("AdvancedDialog Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<AdvancedDialog {...AdvancedDialogParams} />);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(
			<AdvancedDialog {...AdvancedDialogParams} />
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("should have button & formData in document", () => {
		const { getByText } = render(
			<AdvancedDialog {...AdvancedDialogParams} />
		);

		const button = getByText(AdvancedDialogParams.buttonText);
		expect(button).toBeInTheDocument();

		const formData = getByText(AdvancedDialogParams.FormData[0]);
		expect(formData).toBeInTheDocument();
	});
});
