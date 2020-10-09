import React from "react";
import useFields from "../../hooks/useFields";
import { TextField, Button, TableCell } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Send } from "@material-ui/icons/";

const Bid = () => {
	const INITIALSTATE = { bid: "" };
	const { formData, handleChange, resetFormData } = useFields(INITIALSTATE);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Add submit logic
		// need to add route to backend
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
				></TextField>
			</TableCell>
			<TableCell>
				<Button
					type="submit"
					size="small"
					variant="contained"
					color="primary"
					endIcon={<Send />}
					onClick={handleSubmit}
				>
					Place Bid
				</Button>
			</TableCell>
		</>
	);
};

export default Bid;
