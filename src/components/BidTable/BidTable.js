import React from "react";
import { useSelector } from "react-redux";
import TableHeadings from "../TableHeadings/TableHeadings";
import BidTableContents from "../BidTableContents/BidTableContents";
import { Table, Typography, Paper, TableContainer } from "@material-ui/core/";
import useStyles from "./styles";

const BidTable = ({ projectId }) => {
	const classes = useStyles();
	const { bids } = useSelector((st) => ({
		bids: st.bids[projectId],
	}));

	let headingList = ["Tradesmen First Name", "Tradesmen Last Name", "Bid"];
	return (
		<>
			{bids ? (
				<div>
					<TableContainer component={Paper} className={classes.table}>
						<Typography
							component="h2"
							variant="h6"
							color="primary"
							gutterBottom
						>
							Project Bids
						</Typography>
						<Table size="small" dense table>
							<TableHeadings headings={headingList} />
							<BidTableContents
								bidData={bids}
								projectId={projectId}
							/>
						</Table>
					</TableContainer>
				</div>
			) : null}
		</>
	);
};

export default BidTable;
