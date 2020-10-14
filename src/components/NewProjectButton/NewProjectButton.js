import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const NewProjectButton = ({ justify }) => {
	const history = useHistory();

	const useStyles = makeStyles((theme) => ({
		newProjectButton: {
			marginTop: theme.spacing(2),
		},
	}));

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
