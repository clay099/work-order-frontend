import React from "react";
import { TableHead, TableCell, TableRow } from "@material-ui/core/";
import useStyles from "./styles";

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
