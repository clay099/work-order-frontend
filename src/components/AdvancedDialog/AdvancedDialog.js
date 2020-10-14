import React from "react";
import {
	Dialog,
	DialogTitle,
	Button,
	DialogActions,
	DialogContent,
	TextField,
} from "@material-ui/core/";

const AdvancedDialog = ({
	handleClose,
	open,
	handleSubmit,
	titleText,
	id,
	buttonText,
	buttonColor,
	FormData,
	handleChange,
	maxWidth = "sm",
}) => {
	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullWidth={true}
			maxWidth={maxWidth}
		>
			<DialogTitle id={id}>{titleText}</DialogTitle>

			<DialogContent>{FormData.map((Field) => Field)}</DialogContent>
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

export default AdvancedDialog;
