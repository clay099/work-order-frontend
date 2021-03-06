import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../UserProfile/UserProfile";
import Register from "../Register/Register";
import NewProject from "../NewProject/NewProject";
import AdvancedProjectDetails from "../AdvancedProjectDetails/AdvancedProjectDetails";
import TradesmenDetails from "../TradesmenDetails/TradesmenDetails";

/** Application Routes
 *
 * - Contains routes to:
 *    - HomePage
 *    - User Dashboard
 *    - Tradesmen Dashboard
 *    - User Profile
 *    - Tradesmen Profile
 *    - Register
 *    - NewProject
 *    - AdvancedProjectDetails
 *    - TradesmenDetails
 *    - Redirect to homepage if no page was found
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
			<Route exact path="/user/profile">
				<UserProfile />
			</Route>
			<Route exact path="/tradesmen/profile">
				<UserProfile />
			</Route>
			<Route exact path="/register">
				<Register />
			</Route>
			<Route exact path="/user/newproject">
				<NewProject />
			</Route>
			<Route exact path="/project/:id">
				<AdvancedProjectDetails />
			</Route>
			<Route exact path="/tradesmen/:id">
				<TradesmenDetails />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
