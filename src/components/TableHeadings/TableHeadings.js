import React from "react";
import { TableHead, TableCell, TableRow } from "@material-ui/core/";

const TableHeadings = ({ headings }) => {
	return (
		<TableHead>
			<TableRow>
				{headings.map((heading) => (
					<TableCell key={heading}>{heading}</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default TableHeadings;
