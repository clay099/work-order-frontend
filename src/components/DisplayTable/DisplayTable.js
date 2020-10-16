import React from "react";
import { Table, Typography, Paper, TableContainer } from "@material-ui/core/";
import TableHeadings from "../TableHeadings/TableHeadings";
import TableContents from "../TableContents/TableContents";
import useStyles from "./styles";

/** DisplayTable Component
 * @param  {array} projectData
 * @param  {array} headingList
 * @param  {string} tableTitle
 *
 * Renders:
 *    - TableContainer - ensures all like tables are formatted correctly
 *    - Table Title
 *    - TableHeadings Component - fills the table with relevant headings
 *    - TableContents Component - fills table body with relevant rows
 */
const DisplayTable = ({
	projectData,
	headingList,
	tableTitle,
	tableType = "full",
}) => {
	const classes = useStyles();

	return (
		<div>
			<TableContainer component={Paper} className={classes.table}>
				<Typography
					component="h2"
					variant="h6"
					color="primary"
					gutterBottom
				>
					{tableTitle}
				</Typography>
				<Table size="small" dense table>
					<TableHeadings headings={headingList} />
					<TableContents
						bodyData={projectData}
						tableType={tableType}
					/>
				</Table>
			</TableContainer>
		</div>
	);
};

export default DisplayTable;
