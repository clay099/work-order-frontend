import React from "react";
import useToggle from "../../hooks/useToggle";
import { Dialog, DialogTitle, Button } from "@material-ui/core/";
import { useSelector } from "react-redux";
import UpdateProject from "../UpdateProject/UpdateProject";

const UserProjectButtons = () => {
	const {
		setTrue: handleOpenUpdate,
		setFalse: handleCloseUpdate,
		toggle: openUpdate,
	} = useToggle(false);

	const {
		setTrue: handleOpenDelete,
		setFalse: handleCloseDelete,
		toggle: openDelete,
	} = useToggle(false);

	const { status, token } = useSelector((st) => ({
		status: st.projects.projectDetails.status,
		token: st.login.token,
	}));

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpenUpdate}
			>
				Update Project
			</Button>
			<UpdateProject handleClose={handleCloseUpdate} open={openUpdate} />

			{status === "auction" ? (
				<>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleOpenDelete}
					>
						Delete Project
					</Button>
					<Dialog onClose={handleCloseDelete} open={openDelete}>
						<DialogTitle id="delete-project">
							Are You Suer You Want To Delete This Project?
						</DialogTitle>
					</Dialog>
				</>
			) : null}
		</>
	);
};

export default UserProjectButtons;
