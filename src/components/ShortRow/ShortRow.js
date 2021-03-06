import React from "react";
import { TableCell } from "@material-ui/core/";
import dateHelper from "../../helperFunctions/dateHelper";

/** ShortRow Component
 * @param  {object} project
 *
 * Returns cells for (displays project object or default value)
 *
 *    - Project Description
 *    - Project Street Address
 *    - Project City
 *    - Project Created At Date
 *    - Project Status
 */
const ShortRow = ({ project }) => {
	return (
		<>
			{project.description ? (
				<TableCell>{project.description}</TableCell>
			) : (
				<TableCell>not available</TableCell>
			)}
			{project.street_address ? (
				<TableCell>{project.street_address}</TableCell>
			) : (
				<TableCell>not available</TableCell>
			)}
			{project.address_city ? (
				<TableCell>{project.address_city}</TableCell>
			) : (
				<TableCell>not available</TableCell>
			)}
			{project.created_at ? (
				<TableCell>{dateHelper(project.created_at)}</TableCell>
			) : (
				<TableCell>not available</TableCell>
			)}
			{project.status ? (
				<TableCell>{project.status}</TableCell>
			) : (
				<TableCell>no data</TableCell>
			)}
		</>
	);
};

export default ShortRow;
