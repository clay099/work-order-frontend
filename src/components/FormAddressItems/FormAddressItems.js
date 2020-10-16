import React from "react";
import { TextField, Grid } from "@material-ui/core";

/** FormAddressItems Component
 * @param  {object} formData
 * @param  {function} handleChange
 * @param  {boolean} disabled
 *
 * Renders grid items for:
 *    - Street Address
 *    - Zip Code
 *    - City
 *    - Country
 *
 * Each grid item is a TextField and:
 *    - can be disabled by the param
 *    - changed via the handleChange function
 *    - displays a value via the formData object
 */
const FormAddressItems = ({ formData, handleChange, disabled }) => {
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
					disabled={disabled}
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
					disabled={disabled}
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
					disabled={disabled}
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
					disabled={disabled}
				/>
			</Grid>
		</>
	);
};

export default FormAddressItems;
