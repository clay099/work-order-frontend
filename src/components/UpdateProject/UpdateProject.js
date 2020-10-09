import React from "react";
import { Dialog, DialogTitle, Button } from "@material-ui/core/";

const UpdateProject = ({ handleClose, open }) => {
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle id="update-project">Update Project</DialogTitle>
		</Dialog>
	);
};

export default UpdateProject;
