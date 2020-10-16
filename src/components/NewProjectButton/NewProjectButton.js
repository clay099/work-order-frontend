import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

/** NewProjectButton Component
 * @param {string} justify - used to determine the position of the button on the page
 *
 * Renders:
 *    Button which links to "/user/newproject"
 */
const NewProjectButton = ({ justify }) => {
	const history = useHistory();

	const classes = useStyles();

	return (
		<Grid
			container
			spacing={2}
			justify={justify}
			className={classes.styledButton}
		>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push("/user/newproject")}
				>
					Create New Project
				</Button>
			</Grid>
		</Grid>
	);
};

export default NewProjectButton;
