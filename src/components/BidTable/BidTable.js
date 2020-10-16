import React from "react";
import { useSelector } from "react-redux";
import TableHeadings from "../TableHeadings/TableHeadings";
import BidTableContents from "../BidTableContents/BidTableContents";
import { Table, Typography, Paper, TableContainer } from "@material-ui/core/";
import useStyles from "./styles";

/** BidTable Component
 * @param  {int} {projectId}
 *
 * Gets te Redux state for bids on the project.
 *
 * If there is no bids for this project returns null - no table is rendered
 *
 * If there is one or more bids displays a table which contains all the current bids on the project and the ability for the user to select a bid
 */
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
