import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const NewProjectButton = ({ justify }) => {
	const history = useHistory();

	const classes = useStyles();

	return (
		<Grid
			container
			spacing={2}
			justify={justify}
			className={classes.newProjectButton}
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
