import React from "react";
import { TableBody, TableRow } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import ShortRow from "../ShortRow/ShortRow";
import RemainderRow from "../RemainderRow/RemainderRow";
import ReviewProjectIcon from "../ReviewProjectIcon/ReviewProjectIcon";
import Bid from "../Bid/Bid";

/** TableContents Component
 * @param  {array} bodyData
 * @param  {string} tableType
 *
 * Renders:
 *    - Table row for each index in the bodyData arry. Each row contains:
 *        - ShortRow Component
 *        if tableType is "full":
 *            - RemainderRow Component
 *            - ReviewProjectIcon Component
 *        if tableType is "auction":
 *            - Bid Component
 */
const TableContents = ({ bodyData, tableType }) => {
	const history = useHistory();
	const advancedProjectDetails = (id) => {
		if (tableType !== "auction") {
			history.push(`/project/${id}`);
		}
	};

	return (
		<TableBody>
			{bodyData.map((project) => (
				<TableRow
					key={project.id}
					onClick={() => advancedProjectDetails(project.id)}
				>
					<ShortRow project={project} />
					{tableType === "full" ? (
						<>
							<RemainderRow project={project} />
							<ReviewProjectIcon id={project.id} />
						</>
					) : null}
					{tableType === "auction" ? (
						<Bid projectId={project.id} />
					) : null}
				</TableRow>
			))}
		</TableBody>
	);
};

export default TableContents;
