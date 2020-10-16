import React from "react";
import useToggle from "../../hooks/useToggle";
import { Button, Grid } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProjectFromAPI,
	markProjectAsCompleteWithAPI,
} from "../../actions/projects";
import { useHistory } from "react-router-dom";
import SimpleDialog from "../SimpleDialog/SimpleDialog";
import ReviewProjectButtons from "../ReviewProjectButtons/ReviewProjectButtons";
import ReviewIssueButton from "../ReviewIssueButton/ReviewIssueButton";
import useStyles from "./styles";

/** UserProjectButtons Component
 * @param  {string} status
 * @param  {int} id
 * @param  {string} token
 *
 * Gets project Reviews from Redux State
 *
 * Creates handleDelete function which deletes a project from the API
 *
 * Creates handleMarkAsComplete which updates the project to be completed in the API from todays date
 *
 * Renders:
 *    - If status is "auction"
 *        - Button to delete project - when clicked will pop up a dialog to confirm you wish to proceed
 *    - If status is "progressing"
 *        - Button to Mark Project as complete - when clicked will pop up a dialog to confirm you wish to proceed
 *    - If status is "completed"
 *        - ReviewIssuesButton Component - allows for user to add / update issues to the project
 *        - ReviewProjectButtons Component - allows for user to add / update a project review - checks is project has previously been reviewed and changes the component params accordingly
 */
const UserProjectButtons = ({ status, id, token }) => {
	const classes = useStyles();
	const { review } = useSelector((st) => ({ review: st.reviews[id] }));
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

	const handleMarkAsComplete = () => {
		dispatch(
			markProjectAsCompleteWithAPI({
				token,
				projectId: id,
			})
		);
		handleCloseUpdate();
	};

	return (
		<>
			<Grid container spacing={2} className={classes.styledButton}>
				{status === "auction" ? (
					<>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleOpenDelete}
							>
								Delete Project
							</Button>
						</Grid>
						<SimpleDialog
							handleClose={handleCloseDelete}
							open={openDelete}
							handleSubmit={handleDelete}
							titleText="Are You Sure You Want To Delete This Project?"
							id="delete-project"
							buttonText="Delete Project"
							buttonColor="secondary"
						/>
					</>
				) : null}
				{status === "progressing" ? (
					<>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={handleOpenUpdate}
							>
								Mark Project As Completed
							</Button>
							<SimpleDialog
								handleClose={handleCloseUpdate}
								open={openUpdate}
								handleSubmit={handleMarkAsComplete}
								titleText="Mark Project As Completed?"
								id="update-project"
								buttonText="Mark Complete"
								buttonColor="primary"
							/>
						</Grid>
					</>
				) : null}
				{status === "completed" ? (
					<>
						<Grid item>
							<ReviewIssueButton id={id} />
						</Grid>
						<Grid item>
							{!review ? (
								<ReviewProjectButtons
									id={id}
									reviewed={false}
								/>
							) : (
								<ReviewProjectButtons id={id} reviewed={true} />
							)}
						</Grid>
					</>
				) : null}
			</Grid>
		</>
	);
};

export default UserProjectButtons;
