// testHelper.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// Import your own reducer
import reducer from "../reducers/rootReducer";

function render(
	ui,
	{
		initialState,
		store = createStore(reducer, initialState),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const tokenState = { token: "token" };
const userTypeUserState = { userType: "user" };
const userTypeTradesmenState = { userType: "user" };
const idState = { id: 1234 };
const userDetailsState = { userDetails: "userDetails" };
const handleSubmitState = { handleSubmit: jest.fn() };
const handleChangeState = { handleChange: jest.fn() };
const disabledState = { disabled: false };
const disabledEmailState = { disabledEmail: false };
const buttonTextState = { buttonText: "buttonText" };
const formDataState = {
	formData: {
		id: 1,
		firstName: "firstName",
		lastName: "lastName",
		email: "email",
		password: "password",
		newPassword: "newPassword",
		confirmNewPassword: "confirmNewPassword",
	},
};

// re-export everything
export * from "@testing-library/react";
// override render method
export {
	render,
	tokenState,
	userTypeUserState,
	userTypeTradesmenState,
	idState,
	userDetailsState,
	handleSubmitState,
	handleChangeState,
	disabledState,
	disabledEmailState,
	buttonTextState,
	formDataState,
};
