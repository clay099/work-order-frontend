import React from "react";
import { useSelector } from "react-redux";
import { Typography, Button, TextField, Slider } from "@material-ui/core/";
import AdvancedDialog from "../AdvancedDialog/AdvancedDialog";
import useToggle from "../../hooks/useToggle";
import useFields from "../../hooks/useFields";
import {
	submitReviewWithAPI,
	updateReviewWithAPI,
} from "../../actions/projects";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

/** ReviewProjectButtons Component
 * @param  {int} id
 * @param  {boolean} reviewed
 *
 * Gets token form Redux State
 *
 * Creates formData, handleChange, resetFormData, setFormData from useFields custom hook
 *
 * Creates FormData with filds to submit for a proejct review. Fields include:
 *    - "Review" - TextField
 *    - "Review Rating" - Slider
 *
 * Creates custom handleSliderChange function as slider does not work with the standard handleChange function.
 *
 * Creates handleSubmit function which submits the form data to the API as a new review or an updated review.
 *
 * Renders:
 *    - Button - when clicked opens a dialog with review project form
 *    - AdvancedDialog Component - displays form data and ability for user to submit to API
 */
const ReviewProjectButtons = ({ id, reviewed }) => {
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

	const { formData, handleChange, resetFormData, setFormData } = useFields({
		review: "",
		reviewRating: "",
	});

	// custom handleChange function for slider. Slider does not process the standard handleChange function correctly
	const handleSliderChange = (event, newValue) => {
		setFormData((formData) => ({
			...formData,
			reviewRating: newValue,
		}));
	};

	let FormData = [
		<TextField
			required
			id="review"
			label="Review"
			name="review"
			value={formData.review}
			onChange={handleChange}
			autoFocus={true}
			fullWidth={true}
		/>,
		<>
			<div className={classes.sliderTitle}>
				<Typography id="reviewRating" gutterBottom>
					Review Rating
				</Typography>
				<Slider
					defaultValue={5}
					step={1}
					marks={[
						{
							value: 0,
							label: "0",
						},
						{
							value: 5,
							label: "5",
						},
						{
							value: 10,
							label: "10",
						},
					]}
					value={formData.reviewRating}
					// standard handleChange needs a workaround
					onChange={handleSliderChange}
					fullWidth={false}
					min={0}
					max={10}
				/>
			</div>
		</>,
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!reviewed) {
			await dispatch(
				submitReviewWithAPI({
					review_comment: formData.review,
					review_rating: formData.reviewRating,
					token,
					project_id: id,
				})
			);
		} else {
			await dispatch(
				updateReviewWithAPI({
					review_comment: formData.review,
					review_rating: formData.reviewRating,
					token,
					project_id: id,
				})
			);
		}

		resetFormData();
		handleClose();
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpen}
				className={classes.styledButton}
			>
				{!reviewed ? "Review Project" : "Update Project Review"}
			</Button>
			<AdvancedDialog
				handleClose={handleClose}
				open={open}
				handleSubmit={handleSubmit}
				titleText="Review Project"
				id="projectReview"
				buttonText="Submit Review"
				buttonColor="primary"
				FormData={FormData}
				maxWidth="md"
			/>
		</>
	);
};

export default ReviewProjectButtons;
