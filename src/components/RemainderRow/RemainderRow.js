import React from "react";
import { TableCell } from "@material-ui/core/";
import dateHelper from "../../helperFunctions/dateHelper";
import currencyHelper from "../../helperFunctions/currencyHelper";

/** ShortRow Component
 * @param  {object} project
 *
 * Renders cell for (either data form params object or default text):
 *    - price
 *    - completed date
 *    - project issues
 */
const ShortRow = ({ project }) => {
	return (
		<>
			{project.price ? (
				<TableCell>{currencyHelper(project.price)}</TableCell>
			) : (
				<TableCell>auction stage</TableCell>
			)}
			{project.completed_at ? (
				<TableCell>{dateHelper(project.completed_at)}</TableCell>
			) : (
				<TableCell>not completed</TableCell>
			)}
			{project.issues ? (
				<TableCell>{project.issues}</TableCell>
			) : (
				<TableCell>no issues</TableCell>
			)}
		</>
	);
};

export default ShortRow;
