import React from "react";
import { TableBody, TableRow, TableCell, Button } from "@material-ui/core/";
import { Send } from "@material-ui/icons/";
import { acceptBidWithAPI } from "../../actions/bids";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BidTableContents = ({ bidData, projectId }) => {
	const { token } = useSelector((st) => ({ token: st.login.token }));
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async ({ tradesmenId, price }) => {
		let resp = await dispatch(
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
				console.log(bidData[tradesmenId]);
				return (
					<TableRow key={bidData[tradesmenId]}>
						<TableCell>{bidData[tradesmenId].first_name}</TableCell>
						<TableCell>{bidData[tradesmenId].last_name}</TableCell>
						<TableCell>
							{Number(bidData[tradesmenId].bid).toLocaleString(
								"en-US",
								{
									style: "currency",
									currency: "USD",
								}
							)}
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
