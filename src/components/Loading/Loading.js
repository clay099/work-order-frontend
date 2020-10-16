import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

/** Loading Component
 *
 * Renders a CircularProgress bar and makes the rest of page grayed out (due to useStyles)
 */
const Loading = () => {
	const classes = useStyles();

	return (
		<div>
			<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default Loading;
