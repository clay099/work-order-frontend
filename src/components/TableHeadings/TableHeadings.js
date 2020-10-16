import React from "react";
import { TableHead, TableCell, TableRow } from "@material-ui/core/";
import useStyles from "./styles";

/** TableHeadings Component
 * @param  {array} headings - each index contains a string e.g. ['heading1', 'heading2', ...]
 *
 * Renders TableHead row containing one cell for each index in the array
 */
const TableHeadings = ({ headings }) => {
	const classes = useStyles();

	return (
		<TableHead>
			<TableRow>
				{headings.map((heading) => (
					<TableCell className={classes.tableHead} key={heading}>
						{heading}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default TableHeadings;
