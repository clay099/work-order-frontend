import React from "react";
import {
	Dialog,
	DialogTitle,
	Button,
	DialogActions,
	DialogContent,
} from "@material-ui/core/";

/** AdvancedDialog Component
 * @param  {function} handleClose - closes Dialog
 * @param  {boolean} open
 * @param  {function} handleSubmit - submit form logic
 * @param  {string} titleText
 * @param  {int} id
 * @param  {string} buttonText
 * @param  {string} buttonColor
 * @param  {object} FormData - array of jsx form fields (textField, slider etc) to be placed in dialog
 * @param  {string} maxWidth - changes size of dialog -  default sm
 *
 * Returns a Dialog object which contains:
 *  - DialogTitle,
 *  - DialogContent (taken from FormData and often used for form contents but might also be text fields)
 *  - Cancel Button
 *  - Submit Button
 */
const AdvancedDialog = ({
	handleClose,
	open,
	handleSubmit,
	titleText,
	id,
	buttonText,
	buttonColor,
	FormData,
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
