import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Typography, Paper, TableContainer } from "@material-ui/core/";
import TableHeadings from "../TableHeadings/TableHeadings";
import TableContents from "../TableContents/TableContents";

const DisplayTable = ({ projectData }) => {
	const headingList = [
		"Description",
		"Street Address",
		"City",
		"Date Created",
		"Price",
		"Status",
		"Completed Date",
		"Issues",
	];
	return (
		<div>
			<TableContainer component={Paper}>
				<Typography
					component="h2"
					variant="h6"
					color="primary"
					gutterBottom
				>
					Current & Completed Projects
				</Typography>
				<Table size="small" dense table>
					<TableHeadings headings={headingList} />
					<TableContents bodyData={projectData} />
				</Table>
			</TableContainer>
		</div>
	);
};

export default DisplayTable;
