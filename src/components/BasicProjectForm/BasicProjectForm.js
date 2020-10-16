import React from "react";
import FormAddressItems from "../FormAddressItems/FormAddressItems";
import { TextField, Grid } from "@material-ui/core";

/** BasicProjectForm
 * @param  {function} handleChange
 * @param  {object} formData
 *
 * Displays a Grid which renders:
 *    - TextField - for users to enter the new project description
 *    - FormAddressItems Component - renders the address items common in a number of forms
 *
 */
const BasicProjectForm = ({ handleChange, formData }) => {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						name="description"
						variant="outlined"
						required
						fullWidth
						id="description"
						label="Project Description"
						autoFocus
						onChange={handleChange}
						value={formData.description}
					/>
				</Grid>
				<FormAddressItems
					formData={formData}
					handleChange={handleChange}
				/>
			</Grid>
		</>
	);
};

export default BasicProjectForm;
