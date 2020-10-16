import React from "react";
import { TableBody, TableRow, TableCell, Button } from "@material-ui/core/";
import { Send } from "@material-ui/icons/";
import { acceptBidWithAPI } from "../../actions/bids";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import currencyHelper from "../../helperFunctions/currencyHelper";

/** BidTableContents Component
 * @param  {array} bidData - containing all bids for the project
 * @param  {int} projectId
 *
 * Gets the token from Redux state
 *
 * Creates handleSubmit function which allows for the user to select a bid to proceed with. Submits this bid to the API and returns the user to their dashboard
 *
 * Renders a table body with one row for each bid found in the bidData array.
 *
 * Each row contains:
 *    - tradesmen first name
 *    - tradesmen last name
 *    - tradesmen bid for this project (formatted in a user friendly output)
 *    - button to select the winning bid
 *
 */
const BidTableContents = ({ bidData, projectId }) => {
	const { token } = useSelector((st) => ({ token: st.login.token }));
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async ({ tradesmenId, price }) => {
		await dispatch(
			acceptBidWithAPI({
				projectId,
				token,
				tradesmen_id: +tradesmenId,
				price,
			})
		);
		history.push("/user");
	};

	return (
		<TableBody>
			{Object.keys(bidData).map((tradesmenId) => {
				return (
					<TableRow key={bidData[tradesmenId]}>
						<TableCell>{bidData[tradesmenId].first_name}</TableCell>
						<TableCell>{bidData[tradesmenId].last_name}</TableCell>
						<TableCell>
							{currencyHelper(bidData[tradesmenId].bid)}
						</TableCell>
						<TableCell>
							<Button
								type="submit"
								size="small"
								variant="outlined"
								color="primary"
								endIcon={<Send />}
								onClick={() =>
									handleSubmit({
										tradesmenId,
										price: bidData[tradesmenId].bid,
									})
								}
							>
								Accept Bid
							</Button>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default BidTableContents;
