import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTradesmenDetailsFromAPI } from "../../actions/tradesmen";
import Loading from "../Loading/Loading";
import TableHeadings from "../TableHeadings/TableHeadings";
import {
	Table,
	Typography,
	Paper,
	TableContainer,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core/";
import useStyles from "./styles";

/** TradesmenDetails Component
 *
 * Gets the Redux state for Token and tradesmen details
 *
 * Sends a request to the API to get latest tradesmen details
 *
 * Displays a loading page while API request occurs
 *
 * When Logged in and Loading has finished, renders two tables:
 *    - Table 1 contains
 *        - Tradesmen Details
 *        - Tradesmen Rating
 *
 *     - Table 2 contains
 *        - Tradesmen reviews for each project completed
 */
const TradesmenDetails = () => {
	const { id } = useParams();
	const { token, details } = useSelector(
		(st) => ({
			token: st.login.token,
			details: st.tradesmen.details,
		}),
		shallowEqual
	);

	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const classes = useStyles();

	useEffect(
		function () {
			async function getProjects() {
				await dispatch(
					getTradesmenDetailsFromAPI({ token, tradesmenId: id })
				);
				setIsLoading(false);
			}

			if (isLoading) {
				getProjects();
			}
		},
		[dispatch, isLoading, token, id]
	);

	// if user is not logged in token will evaluate to false and you will be redirected to the home page.
	if (!token) {
		return <Redirect to="/" />;
	}

	if (isLoading) return <Loading />;

	const headingList = [
		"ID",
		"First Name",
		"Last Name",
		"Email",
		"Phone",
		"Rating",
	];

	return (
		<>
			<TableContainer component={Paper} className={classes.table}>
				<Typography
					component="h2"
					variant="h6"
					color="primary"
					gutterBottom
				>
					{`${details.first_name} ${details.last_name} Details`}
				</Typography>
				<Table size="small" dense table>
					<TableHeadings headings={headingList} />
					<TableBody>
						<TableRow>
							<TableCell>{details.id}</TableCell>
							<TableCell>{details.first_name}</TableCell>
							<TableCell>{details.last_name}</TableCell>
							<TableCell>{details.email}</TableCell>
							<TableCell>{details.phone}</TableCell>
							<TableCell>
								{details.rating === null
									? "not yet rated"
									: `${Number(+details.rating).toFixed(
											2
									  )} / 10`}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			{details.review_comments[0] ? (
				<TableContainer component={Paper} className={classes.table}>
					<Typography
						component="h2"
						variant="h6"
						color="primary"
						gutterBottom
					>
						{`${details.first_name} ${details.last_name} Project Reviews`}
					</Typography>
					<Table size="small" dense table>
						<TableHeadings headings={["Reviews"]} />
						<TableBody>
							{details.review_comments.map((review) => (
								<TableRow>
									<TableCell>{review}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography
					component="h2"
					variant="h6"
					color="primary"
					gutterBottom
				>
					{`${details.first_name} ${details.last_name} does not have any project reviews`}
				</Typography>
			)}
		</>
	);
};

export default TradesmenDetails;
