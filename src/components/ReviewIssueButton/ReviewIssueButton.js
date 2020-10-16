import React from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core/";
import AdvancedDialog from "../AdvancedDialog/AdvancedDialog";
import useToggle from "../../hooks/useToggle";
import useFields from "../../hooks/useFields";
import { submitIssueWithAPI } from "../../actions/projects";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

/** ReviewIssueButton Component
 * @param  {int} id
 *
 * Gets token from Redux state
 *
 * Creates formData, handleChange, resetFormData from useFields custom hook to allow for form inputs and changes
 *
 * Creates a handleSubmit function to submit a completed issues form
 *
 * Renders:
 *    - Button - when clicked opens a Dialog with issues form
 *    - AdvancedDialog Component - displays issues form along with the function to submit the form
 */
const ReviewIssueButton = ({ id }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { token } = useSelector((st) => ({
		token: st.login.token,
	}));

	const {
		setTrue: handleOpen,
		setFalse: handleClose,
		toggle: open,
	} = useToggle(false);

	const { formData, handleChange, resetFormData } = useFields({
		issues: "",
	});

	let FormData = [
		<TextField
			required
			id="issues"
			label="Issues"
			name="issues"
			value={formData.issues}
			onChange={handleChange}
			autoFocus={true}
			fullWidth={true}
		/>,
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(
			submitIssueWithAPI({
				issues: formData.issues,
				token,
				projectId: id,
			})
		);

		resetFormData();
		handleClose();
	};

	return (
		<>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleOpen}
				className={classes.styledButton}
			>
				Add Project Issue
			</Button>
			<AdvancedDialog
				handleClose={handleClose}
				open={open}
				handleSubmit={handleSubmit}
				titleText="Add Project Issue"
				id="projectIssue"
				buttonText="Submit Issue"
				buttonColor="primary"
				FormData={FormData}
				handleChange={handleChange}
				maxWidth="sm"
			/>
		</>
	);
};

export default ReviewIssueButton;
