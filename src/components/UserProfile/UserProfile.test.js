import React from "react";
import UserProfile from "./UserProfile";
import {
	render,
	tokenState,
	userTypeUserState,
	idState,
	userDetailsState,
} from "../../testHelper/testHelper";
console.error = jest.fn();

describe("UserProfile Component", () => {
	// smoke test
	test("renders without crashing", () => {
		render(<UserProfile />, {
			initialState: {
				tokenState,
				userTypeUserState,
				idState,
				userDetailsState,
			},
		});
	});

	// snapshot test
	test("matches snapshot", () => {
		const { asFragment } = render(<UserProfile />, {
			initialState: {
				tokenState,
				userTypeUserState,
				idState,
				userDetailsState,
			},
		});
		expect(asFragment).toMatchSnapshot();
	});
});
