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
};
