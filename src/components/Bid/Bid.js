import React from "react";
import useFields from "../../hooks/useFields";
import { TextField, Button, TableCell } from "@material-ui/core";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Send } from "@material-ui/icons/";
import { submitNewBidToAPI, updateBidWithAPI } from "../../actions/bids";
import useToggle from "../../hooks/useToggle";

const Bid = ({ projectId }) => {
	const { token, bid } = useSelector((st) => {
		let bid;
		// to avoid typeError checks if the projectId has a bid attached
		if (!st.bids[projectId]) {
			// returns undefined if no bid for projectId
			bid = undefined;
		} else {
			// returns value if project does have a bid.
			// note the user might not have placed a bid yet and result can still be undefined
			bid = st.bids[projectId][st.login.id];
		}

		return {
			token: st.login.token,
			bid,
		};
	}, shallowEqual);

	const { toggle: disabled, setTrue, setFalse } = useToggle(Boolean(bid));

	const INITIALSTATE = { bid: bid || "" };
	const { formData, handleChange } = useFields(INITIALSTATE);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Add submit logic
		if (!bid) {
			await dispatch(
				submitNewBidToAPI({ token, projectId, bid: +formData.bid })
			);
		} else {
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
