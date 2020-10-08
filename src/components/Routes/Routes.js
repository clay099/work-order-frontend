import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../Register/Register";
import NewProject from "../NewProject/NewProject";

/** Application Routes
 *
 * - Contains routes to:
 *    - HomePage
 *    - User Dashboard
 *    - Tradesmen Dashboard
 *    - Register
 *    - NewProject
 */

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<HomePage />
			</Route>
			<Route exact path="/user">
				<Dashboard />
			</Route>
			<Route exact path="/tradesmen">
				<Dashboard />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
			<Route exact path="/user/newproject">
				<NewProject />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
