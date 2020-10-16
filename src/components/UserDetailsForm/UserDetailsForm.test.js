import React from "react";
import UserDetailsForm from "./UserDetailsForm";
import {
	render,
	userTypeUserState,
	handleSubmitState,
	handleChangeState,
	disabledState,
	disabledEmailState,
	buttonTextState,
	formDataState,
} from "../../testHelper/testHelper";
console.error = jest.fn();

describe("UserDetailsForm Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(
			<UserDetailsForm
				userType={userTypeUserState}
				handleSubmit={handleSubmitState}
				handleChange={handleChangeState}
				disabled={disabledState}
				disabledEmail={disabledEmailState}
				buttonText={buttonTextState}
				formData={formDataState}
			/>
		);
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(
			<UserDetailsForm
				userType={userTypeUserState}
				handleSubmit={handleSubmitState}
				handleChange={handleChangeState}
				disabled={disabledState}
				disabledEmail={disabledEmailState}
				buttonText={buttonTextState}
				formData={formDataState}
			/>
		);
		expect(asFragment).toMatchSnapshot();
	});

	test("last name to be in the document", () => {
		const { getByText } = render(
			<UserDetailsForm
				userType={userTypeUserState}
				handleSubmit={handleSubmitState}
				handleChange={handleChangeState}
				disabled={disabledState}
				disabledEmail={disabledEmailState}
				buttonText={buttonTextState}
				formData={formDataState}
			/>
		);
		const value = getByText("Last Name");
		expect(value).toBeInTheDocument();
	});
});
