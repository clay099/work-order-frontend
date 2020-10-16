import React from "react";
import { Dialog, DialogTitle, Button, DialogActions } from "@material-ui/core/";

/** SimpleDialog Component
 * @param  {function} handleClose - closes Dialog
 * @param  {boolean} open
 * @param  {function} handleSubmit - submit form logic
 * @param  {string} titleText
 * @param  {int} id
 * @param  {string} buttonText
 * @param  {string} buttonColor
 *
 * Returns a Dialog object which contains:
 *  - DialogTitle,
 *  - Cancel Button
 *  - Submit Button
 */
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
