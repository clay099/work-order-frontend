import React from "react";
import useToggle from "../../hooks/useToggle";
import { Dialog, DialogTitle, Button, DialogActions } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import UpdateProject from "../UpdateProject/UpdateProject";
import { deleteProjectFromAPI } from "../../actions/projects";
import { useHistory } from "react-router-dom";

const UserProjectButtons = ({ status, id, token }) => {
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

	const dispatch = useDispatch();
	let history = useHistory();

	const handleDelete = () => {
		dispatch(
			deleteProjectFromAPI({
				token,
				projectId: id,
			})
		);
		history.push(`/user`);
	};

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
						<DialogActions>
							<Button
								variant="outlined"
								color="secondary"
								onClick={handleCloseDelete}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleDelete}
							>
								Delete Project
							</Button>
						</DialogActions>
					</Dialog>
				</>
			) : null}
		</>
	);
};

export default UserProjectButtons;
