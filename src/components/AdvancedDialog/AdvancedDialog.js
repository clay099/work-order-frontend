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
	TextFieldDataArray,
	handleChange,
}) => {
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle id={id}>{titleText}</DialogTitle>
			<form>
				<DialogActions>
					<DialogContent>
						{TextFieldDataArray.map((textFieldData) => {
							return (
								<TextField
									required
									id={textFieldData.id}
									label={textFieldData.label}
									type={textFieldData.type}
									name={textFieldData.name}
									value={textFieldData.value}
									onChange={handleChange}
								/>
							);
						})}
					</DialogContent>
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
			</form>
		</Dialog>
	);
};

export default AdvancedDialog;
