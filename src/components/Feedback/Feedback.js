import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import useToggle from "../../hooks/useToggle";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

/** Feedback Component
 *
 * Component is available on each page.
 *
 * Obtains from Redux the relevant state to provide useful feedback to the user
 *
 * Returns a Snackbar which appears for 6 seconds or until closed. Each snack bar contains a message and "severity" (effects the color and icon displayed)
 */
const Feedback = () => {
	let { message, severity } = useSelector((st) => {
		if (st.feedback.error) {
			return { message: st.feedback.error, severity: "error" };
		} else if (st.feedback.error) {
			return {
				message: st.feedback.error,
				severity: "error",
			};
		} else if (st.feedback.newProject) {
			return {
				message: `New Project '${st.feedback.newProject.description}' Created`,
				severity: "success",
			};
		} else if (st.feedback.email) {
			return {
				message: `Welcome ${st.feedback.email}`,
				severity: "success",
			};
		} else if (st.feedback.bid) {
			return {
				message: `Bid Saved Successfully`,
				severity: "success",
			};
		} else if (st.feedback.updatedEmail) {
			return {
				message: `Updated Profile Saved`,
				severity: "success",
			};
		} else if (st.feedback.updatedReview) {
			return {
				message: `Review Saved`,
				severity: "success",
			};
		}
		return { message: undefined, severity: undefined };
	}, shallowEqual());

	const {
		setTrue: handleOpenToggle,
		setFalse: handleCloseToggle,
		toggle: open,
	} = useToggle(false);

	useEffect(() => {
		if (message) {
			handleOpenToggle();
		}
	}, [message]);

	return !message ? null : (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleCloseToggle}
			>
				<Alert onClose={handleCloseToggle} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default React.memo(Feedback);
