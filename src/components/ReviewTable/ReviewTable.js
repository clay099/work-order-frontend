import React from "react";
import { useSelector } from "react-redux";
import TableHeadings from "../TableHeadings/TableHeadings";
import {
	Table,
	Typography,
	Paper,
	TableContainer,
	TableBody,
	TableCell,
	TableRow,
} from "@material-ui/core/";
import useStyles from "./styles";

/** ReviewTable Component
 * @param  {int} projectId
 *
 * Gets projects review from Redux state
 *
 * If no review is obtains displays null otherwise renders:
 *
 *    - Title
 *    - TableHeadings Component
 *    - Table Row - with project review details
 *
 */
const ReviewTable = ({ projectId }) => {
	const classes = useStyles();

	const { review } = useSelector((st) => ({
		review: st.reviews[projectId],
	}));

	let headingList = ["Project Review", "Review Rating"];
	return (
		<>
			{review ? (
				<div>
					<TableContainer component={Paper} className={classes.table}>
						<Typography
							component="h2"
							variant="h6"
							color="primary"
							gutterBottom
						>
							Project Review
						</Typography>
						<Table size="small" dense table>
							<TableHeadings headings={headingList} />
							<TableBody>
								<TableRow>
									<TableCell>
										{review.review_comment}
									</TableCell>
									<TableCell>
										{review.review_rating}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			) : null}
		</>
	);
};

export default ReviewTable;
