import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";

import Routes from "../Routes/Routes";
import NavBar from "../NavBar/NavBar";
import Feedback from "../Feedback/Feedback";

/** Overall work-order application:
 *
 * - creates the Navbar, Routes and Feedback
 */
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Container>
					<Routes />
					<Feedback />
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
