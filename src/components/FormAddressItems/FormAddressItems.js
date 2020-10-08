import React from "react";
import { TextField, Grid } from "@material-ui/core";

const FormAddressItems = ({ formData, handleChange }) => {
	return (
		<>
			<Grid item xs={12} sm={6}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="streetAddress"
					label="Street Address"
					name="streetAddress"
					onChange={handleChange}
					value={formData.streetAddress}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="zip"
					name="zip"
					label="Zip Code"
					onChange={handleChange}
					value={formData.zip}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="city"
					name="city"
					label="City"
					onChange={handleChange}
					value={formData.city}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="country"
					name="country"
					label="Country"
					onChange={handleChange}
					value={formData.country}
				/>
			</Grid>
		</>
	);
};

export default FormAddressItems;
