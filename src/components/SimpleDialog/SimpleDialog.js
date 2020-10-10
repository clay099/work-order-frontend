import React from "react";
import {
	Dialog,
	DialogTitle,
	Button,
	DialogActions,
	Grid,
	makeStyles,
} from "@material-ui/core/";

const SimpleDialog = ({
	handleClose,
	open,
	handleSubmit,
	titleText,
	id,
	buttonText,
	buttonColor,
}) => {
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle id={id}>{titleText}</DialogTitle>
			<DialogActions>
				<Button
					variant="outlined"
					color={buttonColor}
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color={buttonColor}
					onClick={handleSubmit}
				>
					{buttonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SimpleDialog;
