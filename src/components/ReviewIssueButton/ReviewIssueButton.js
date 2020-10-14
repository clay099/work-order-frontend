import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, Slider } from "@material-ui/core/";
import AdvancedDialog from "../AdvancedDialog/AdvancedDialog";
import useToggle from "../../hooks/useToggle";
import useFields from "../../hooks/useFields";
import { submitIssueWithAPI } from "../../actions/projects";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: theme.spacing(2),
	},
}));

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
				className={classes.button}
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