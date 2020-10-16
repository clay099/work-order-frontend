import React from "react";
import useFields from "../../hooks/useFields";
import { TextField, Button, TableCell } from "@material-ui/core";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Send } from "@material-ui/icons/";
import { submitNewBidToAPI, updateBidWithAPI } from "../../actions/bids";
import useToggle from "../../hooks/useToggle";

/** Bid Component
 *
 * @param {int} projectId
 *
 * Gets the Redux state for any bids the tradesmen has made on this project based on projectId (found in param) and tradesmen id (found in state)
 * Also gets the tradesmen token from Redux state
 *
 * Create the form Data & fills it with the current bid if applicable
 *
 * If a current bid has been found disables the form. Tradesmen will need to click a button to unlock the form, update their bid and submit it to the API
 *
 * Submit bid to API - If current bid updates the bid (ensures a tradesmen does not bid twice on one project). Otherwise creates a new bid in the API
 *
 *
 * Renders two cells:
 *    - first cell contains TextField for user to create/update their bid (if field is disabled displays the current bid the tradesmen has placed in the API)
 *    - second cell is for a button for user to submit their bid (if form is disabled button will first unlock form)
 */
const Bid = ({ projectId }) => {
	const { token, bid } = useSelector((st) => {
		let bid;
		// to avoid typeError checks if the projectId does not have a bid attached
		if (!st.bids[projectId]) {
			// returns undefined if no bid for projectId
			bid = undefined;
		} else {
			// returns value if project does have a bid.
			// note the user might not have placed a bid yet and result can still be undefined
			bid = st.bids[projectId][st.login.id].bid;
		}

		return {
			token: st.login.token,
			bid,
		};
	}, shallowEqual);

	// if disabled tradesmen needs to select to allow for them to enter the edit mode
	const { toggle: disabled, setTrue, setFalse } = useToggle(Boolean(bid));

	// loads the bid with tradesmen current bid or empty sting
	const INITIALSTATE = { bid: bid || "" };

	// creates formData object & handleChange function
	const { formData, handleChange } = useFields(INITIALSTATE);
	const dispatch = useDispatch();

	// function to submit/edit the bit to the API.
	const handleSubmit = async (e) => {
		e.preventDefault();
		// if no bid then submit a new bit to the API
		if (!bid) {
			await dispatch(
				submitNewBidToAPI({ token, projectId, bid: +formData.bid })
			);
		} else {
			// if there is a bit update the current bid in the API & don't create a second bid
			await dispatch(
				updateBidWithAPI({ token, projectId, bid: +formData.bid })
			);
		}
		setTrue();
	};

	return (
		<>
			<TableCell size="small">
				<TextField
					required
					autoFocus
					id="bid"
					label="Bid"
					type="number"
					name="bid"
					onChange={handleChange}
					value={formData.bid}
					size="small"
					disabled={disabled}
				></TextField>
			</TableCell>
			<TableCell>
				{!disabled ? (
					<Button
						type="submit"
						size="small"
						variant="contained"
						color="primary"
						endIcon={<Send />}
						onClick={handleSubmit}
					>
						{bid ? "Update " : "Place "}
						Bid
					</Button>
				) : (
					// if form is disabled provide button to allow for form to be edited
					<Button
						type="submit"
						size="small"
						variant="outlined"
						color="primary"
						endIcon={<Send />}
						onClick={setFalse}
					>
						Edit Bid
					</Button>
				)}
			</TableCell>
		</>
	);
};

export default Bid;
