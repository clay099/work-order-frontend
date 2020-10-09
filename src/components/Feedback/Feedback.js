import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import useToggle from "../../hooks/useToggle";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
